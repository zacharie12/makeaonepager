import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const PRICE_MAP: Record<string, string> = {
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  team: process.env.STRIPE_TEAM_PRICE_ID!,
};

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();
    const priceId = PRICE_MAP[planId];

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"}/create?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"}/create?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
