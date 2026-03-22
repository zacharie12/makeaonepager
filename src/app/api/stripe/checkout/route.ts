import { NextRequest, NextResponse } from "next/server";
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

const VARIANT_MAP: Record<string, string> = {
  pro: process.env.LEMONSQUEEZY_PRO_VARIANT_ID!,
  team: process.env.LEMONSQUEEZY_TEAM_VARIANT_ID!,
};

export async function POST(request: NextRequest) {
  try {
    lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY! });

    const { planId } = await request.json();
    const variantId = VARIANT_MAP[planId];

    if (!variantId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Get store ID from the API key's associated store
    const storeId = process.env.LEMONSQUEEZY_STORE_ID!;

    const checkout = await createCheckout(storeId, variantId, {
      checkoutData: {
        custom: {
          plan_id: planId,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"}/create?upgraded=true`,
      },
    });

    const url = checkout.data?.data?.attributes?.url;

    if (!url) {
      return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("LemonSqueezy checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
