"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  ArrowLeft,
  Loader2,
  FileText,
  Sparkles,
} from "lucide-react";
import { ONE_PAGER_TYPES, TEMPLATES } from "@/templates";

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

function CreatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedType = searchParams.get("type") || "";

  const [step, setStep] = useState(preselectedType ? 2 : 1);
  const [selectedType, setSelectedType] = useState(preselectedType);
  const [selectedTemplate, setSelectedTemplate] = useState("yc-classic");
  const [isGenerating, setIsGenerating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    tagline: "",
    description: "",
    industry: "",
    targetAudience: "",
    keyMetrics: "",
    teamInfo: "",
    contactInfo: "",
    additionalInfo: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.companyName || !formData.description) return;

    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: selectedType,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setIsGenerating(false);
        return;
      }

      // Store in sessionStorage and navigate to editor
      sessionStorage.setItem("onepager-content", JSON.stringify(data.content));
      sessionStorage.setItem("onepager-template", selectedTemplate);
      sessionStorage.setItem("onepager-company", formData.companyName);
      router.push("/editor");
    } catch (err) {
      alert("Failed to generate. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft size={18} />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <FileText size={14} className="text-white" />
              </div>
              <span className="font-bold">MakeAOnePager</span>
            </div>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className={step >= 1 ? "text-blue-600 font-medium" : ""}>
              Type
            </span>
            <span>→</span>
            <span className={step >= 2 ? "text-blue-600 font-medium" : ""}>
              Details
            </span>
            <span>→</span>
            <span className={step >= 3 ? "text-blue-600 font-medium" : ""}>
              Template
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Step 1: Choose Type */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2">
              What kind of one-pager do you need?
            </h1>
            <p className="text-gray-500 mb-8">
              Pick the type that matches your goal. We&apos;ll tailor everything to it.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {ONE_PAGER_TYPES.map((type) => {
                const Icon = ICON_MAP[type.icon] || Zap;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type.id);
                      setStep(2);
                    }}
                    className={`text-left p-5 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-blue-200" : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={isSelected ? "text-blue-700" : "text-gray-600"}
                        />
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
        )}

        {/* Step 2: Details Form */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} /> Change type
            </button>
            <h1 className="text-3xl font-bold mb-2">
              Tell us about your{" "}
              {ONE_PAGER_TYPES.find((t) => t.id === selectedType)?.name?.toLowerCase() || "business"}
            </h1>
            <p className="text-gray-500 mb-8">
              The more you share, the better the AI can write for you. Only
              company name and description are required.
            </p>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              {/* Required */}
              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Company / Person Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g. Acme Inc."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Tagline (optional)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="e.g. Making the world's best widgets"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="What does your company do? What problem do you solve? Tell us everything relevant..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Optional fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    placeholder="e.g. FinTech, HealthCare, SaaS"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => updateField("targetAudience", e.target.value)}
                    placeholder="e.g. Series A investors, Enterprise CTOs"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Key Metrics / Numbers
                </label>
                <input
                  type="text"
                  value={formData.keyMetrics}
                  onChange={(e) => updateField("keyMetrics", e.target.value)}
                  placeholder="e.g. $2M ARR, 10K users, 300% YoY growth"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Team Info
                </label>
                <input
                  type="text"
                  value={formData.teamInfo}
                  onChange={(e) => updateField("teamInfo", e.target.value)}
                  placeholder="e.g. Founded by ex-Google engineers, team of 15"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Contact Info
                </label>
                <input
                  type="text"
                  value={formData.contactInfo}
                  onChange={(e) => updateField("contactInfo", e.target.value)}
                  placeholder="e.g. john@acme.com | acme.com | @acme"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Anything Else?
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => updateField("additionalInfo", e.target.value)}
                  placeholder="Awards, partnerships, unique advantages, specific things you want highlighted..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(3)}
                disabled={!formData.companyName || !formData.description}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Choose Template
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Template */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <button
              onClick={() => setStep(2)}
              className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to details
            </button>
            <h1 className="text-3xl font-bold mb-2">Choose a template</h1>
            <p className="text-gray-500 mb-8">
              Pick a design style. You can always edit everything after
              generating.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`text-left rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500 shadow-lg scale-[1.02]"
                        : "border-gray-200 hover:border-blue-200 hover:shadow-md"
                    }`}
                  >
                    {/* Color preview */}
                    <div
                      className="h-24 relative"
                      style={{
                        background:
                          tmpl.layout === "gradient-glass"
                            ? `linear-gradient(135deg, ${tmpl.colors.primary}, ${tmpl.colors.secondary})`
                            : tmpl.colors.background === "#ffffff" || tmpl.colors.background.startsWith("#f") || tmpl.colors.background.startsWith("#F")
                            ? `linear-gradient(135deg, ${tmpl.colors.primary}, ${tmpl.colors.primary}dd)`
                            : tmpl.colors.background,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-3xl">
                        {tmpl.thumbnail}
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-white">
                      <div className="font-semibold text-sm">{tmpl.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {tmpl.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Generating your one-pager...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate One-Pager
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      }
    >
      <CreatePageContent />
    </Suspense>
  );
}
