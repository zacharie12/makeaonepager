"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Rocket,
  Briefcase,
  Zap,
  Users,
  Award,
  Globe,
  Target,
  Heart,
  Shield,
  BarChart3,
  ArrowRight,
  Sparkles,
  FileText,
  Palette,
  Download,
  Check,
  Crown,
  LogOut,
} from "lucide-react";
import { ONE_PAGER_TYPES } from "@/templates";
import AuthModal from "@/components/AuthModal";
import PricingModal from "@/components/PricingModal";
import { getUser, signOut } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  rocket: Rocket,
  briefcase: Briefcase,
  zap: Zap,
  users: Users,
  award: Award,
  globe: Globe,
  target: Target,
  heart: Heart,
  shield: Shield,
  chart: BarChart3,
};

export default function HomePage() {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser().then(({ user: u }) => setUser(u));
  }, []);

  const handleGetStarted = () => {
    if (user) {
      router.push("/create");
    } else {
      setShowAuth(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg">MakeAOnePager</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPricing(true)}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
            >
              Pricing
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <LogOut size={16} />
                </button>
                <button
                  onClick={() => router.push("/create")}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAuth(true)}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Get Started Free
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles size={14} />
            AI-Powered One-Pager Generator
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Create Stunning
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              One-Pagers
            </span>{" "}
            in Seconds
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            From investor pitches to product sheets — generate professional,
            beautiful one-pagers with AI. Just describe your company and pick a
            template.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              Create Your One-Pager
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Three Steps. That&apos;s It.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "1. Pick Your Type",
                desc: "Choose from 10 one-pager types — investor pitch, product sheet, company overview, and more.",
              },
              {
                icon: Sparkles,
                title: "2. Add Your Info",
                desc: "Tell us about your company. Our AI writes compelling content tailored to your audience.",
              },
              {
                icon: Palette,
                title: "3. Pick a Template",
                desc: "Choose from beautiful, professional templates. Edit anything. Export as PDF.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-Pager Types */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">One-Pagers for Every Need</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Whether you&apos;re pitching investors, selling a product, or building your personal brand — we have the perfect template.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ONE_PAGER_TYPES.map((type) => {
              const Icon = ICON_MAP[type.icon] || Zap;
              return (
                <button
                  key={type.id}
                  onClick={handleGetStarted}
                  className="text-left p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        {type.name}
                        {type.popular && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Popular</span>
                        )}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">{type.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-gray-50" id="pricing">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Honest Pricing</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Start for free. Upgrade when you need more.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                <Sparkles size={20} className="text-gray-500" />
              </div>
              <h3 className="font-bold text-lg">Free</h3>
              <div className="flex items-baseline gap-1 mt-1 mb-5">
                <span className="text-3xl font-extrabold">$0</span>
                <span className="text-sm text-gray-500">forever</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {["3 one-pagers/month", "All 10 types", "5 templates", "PDF export", "Watermark"].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check size={15} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-7 shadow-lg shadow-blue-100 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <Crown size={20} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Pro</h3>
              <div className="flex items-baseline gap-1 mt-1 mb-5">
                <span className="text-3xl font-extrabold">$5</span>
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {["Unlimited one-pagers", "All 8 premium templates", "PDF & PNG export", "No watermark", "Custom brand colors", "Priority AI"].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check size={15} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowPricing(true)}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Team */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                <Users size={20} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-lg">Team</h3>
              <div className="flex items-baseline gap-1 mt-1 mb-5">
                <span className="text-3xl font-extrabold">$12</span>
                <span className="text-sm text-gray-500">/seat/month</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {["Everything in Pro", "Shared workspace", "Brand kit", "Analytics", "Priority support", "Custom templates"].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check size={15} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowPricing(true)}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Start Team Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "AI-Written Content", desc: "Professional copy tailored to your business" },
              { icon: Palette, title: "Beautiful Templates", desc: "8 professionally designed layouts" },
              { icon: FileText, title: "Edit Everything", desc: "Click any text to customize it" },
              { icon: Download, title: "Export Anywhere", desc: "Download as PDF or PNG" },
            ].map((f, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <f.icon size={22} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-bold text-lg mb-4">Enterprise-Grade Security</h3>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              Secure Authentication
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              Encrypted Data Storage
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              Secure Payments
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your One-Pager?</h2>
          <p className="text-gray-500 mb-8">Free to start. No credit card required.</p>
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <FileText size={16} />
            MakeAOnePager
          </div>
          <div>&copy; 2026 MakeAOnePager. All rights reserved.</div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={() => {
          setShowAuth(false);
          getUser().then(({ user: u }) => setUser(u));
          router.push("/create");
        }}
      />
      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
      />
    </div>
  );
}
