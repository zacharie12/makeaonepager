"use client";

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
} from "lucide-react";
import { ONE_PAGER_TYPES } from "@/templates";

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

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg">MakeAOnePager</span>
          </div>
          <button
            onClick={() => router.push("/create")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Get Started Free
          </button>
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
              onClick={() => router.push("/create")}
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
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-Pager Types */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            One-Pagers for Every Need
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Whether you&apos;re pitching investors, selling a product, or building your
            personal brand — we have the perfect template.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ONE_PAGER_TYPES.map((type) => {
              const Icon = ICON_MAP[type.icon] || Zap;
              return (
                <button
                  key={type.id}
                  onClick={() => router.push(`/create?type=${type.id}`)}
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
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {type.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "AI-Written Content", desc: "Professional copy tailored to your business" },
              { icon: Palette, title: "Beautiful Templates", desc: "8+ professionally designed layouts" },
              { icon: FileText, title: "Edit Everything", desc: "Click any text to customize it" },
              { icon: Download, title: "Export Anywhere", desc: "Download as PDF or share a link" },
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

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make Your One-Pager?
          </h2>
          <p className="text-gray-500 mb-8">
            Free to start. No credit card required.
          </p>
          <button
            onClick={() => router.push("/create")}
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
    </div>
  );
}
