"use client";

import { useState } from "react";
import { X, Check, Loader2, Sparkles, Crown, Users } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
}

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Sparkles,
    color: "#6B7280",
    features: [
      "3 one-pagers per month",
      "All 10 one-pager types",
      "5 templates",
      "PDF export",
      "MakeAOnePager watermark",
    ],
    cta: "Current Plan",
    disabled: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$5",
    period: "/month",
    icon: Crown,
    color: "#2563EB",
    popular: true,
    features: [
      "Unlimited one-pagers",
      "All 10 one-pager types",
      "All 8 premium templates",
      "PDF & PNG export",
      "No watermark",
      "Custom brand colors",
      "Priority AI generation",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
  },
  {
    id: "team",
    name: "Team",
    price: "$12",
    period: "/month per seat",
    icon: Users,
    color: "#7C3AED",
    features: [
      "Everything in Pro",
      "Shared team workspace",
      "Brand kit (logos, colors, fonts)",
      "Template lock & share",
      "Analytics & tracking",
      "Priority support",
      "Custom templates (coming soon)",
    ],
    cta: "Start Team Plan",
    disabled: false,
  },
];

export default function PricingModal({ isOpen, onClose, currentPlan = "free" }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpgrade = async (planId: string) => {
    if (planId === "free") return;

    setLoading(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch {
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <div>
            <h2 className="text-xl font-bold">Choose Your Plan</h2>
            <p className="text-sm text-gray-500 mt-1">
              Upgrade to unlock unlimited one-pagers and premium features
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Plans */}
        <div className="px-6 pb-6">
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const isCurrent = currentPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`rounded-xl border-2 p-5 relative ${
                    plan.popular
                      ? "border-blue-500 shadow-lg shadow-blue-100"
                      : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${plan.color}15` }}
                  >
                    <Icon size={20} style={{ color: plan.color }} />
                  </div>

                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1 mb-4">
                    <span className="text-3xl font-extrabold">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check size={15} className="text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={plan.disabled || isCurrent || loading !== null}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {loading === plan.id ? (
                      <Loader2 size={16} className="animate-spin mx-auto" />
                    ) : isCurrent ? (
                      "Current Plan"
                    ) : (
                      plan.cta
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-xs text-gray-400 text-center">
          Secure payments. Cancel anytime.
        </div>
      </div>
    </div>
  );
}
