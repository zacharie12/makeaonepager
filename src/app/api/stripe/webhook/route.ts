import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase";

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-signature") || "";

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

  if (!verifyWebhookSignature(body, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  const eventName = event.meta?.event_name;
  const supabase = createServiceClient();

  switch (eventName) {
    case "subscription_created":
    case "subscription_updated": {
      const customerEmail = event.data?.attributes?.user_email;
      const status = event.data?.attributes?.status;

      if (customerEmail && status === "active") {
        await supabase
          .from("profiles")
          .update({ plan: "pro" })
          .eq("email", customerEmail);
      }
      break;
    }

    case "subscription_cancelled":
    case "subscription_expired": {
      const customerEmail = event.data?.attributes?.user_email;

      if (customerEmail) {
        await supabase
          .from("profiles")
          .update({ plan: "free" })
          .eq("email", customerEmail);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
