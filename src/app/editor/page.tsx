"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  FileText,
  Palette,
  RotateCcw,
  Loader2,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import OnePagerRenderer from "@/components/OnePagerRenderer";
import { TEMPLATES, TemplateStyle } from "@/templates";
import type { OnePagerContent } from "@/lib/openai";

export default function EditorPage() {
  const router = useRouter();
  const exportRef = useRef<HTMLDivElement>(null);

  const [content, setContent] = useState<OnePagerContent | null>(null);
  const [template, setTemplate] = useState<TemplateStyle>(TEMPLATES[0]);
  const [companyName, setCompanyName] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [originalContent, setOriginalContent] = useState<OnePagerContent | null>(null);

  useEffect(() => {
    const storedContent = sessionStorage.getItem("onepager-content");
    const storedTemplate = sessionStorage.getItem("onepager-template");
    const storedCompany = sessionStorage.getItem("onepager-company");

    if (!storedContent) {
      router.push("/create");
      return;
    }

    const parsed = JSON.parse(storedContent);
    setContent(parsed);
    setOriginalContent(parsed);
    setCompanyName(storedCompany || "Company");

    if (storedTemplate) {
      const tmpl = TEMPLATES.find((t) => t.id === storedTemplate);
      if (tmpl) setTemplate(tmpl);
    }
  }, [router]);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("onepager-export");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${companyName.replace(/\s+/g, "-").toLowerCase()}-onepager.pdf`);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleExportPNG = async () => {
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;

      const element = document.getElementById("onepager-export");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `${companyName.replace(/\s+/g, "-").toLowerCase()}-onepager.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleReset = () => {
    if (originalContent) {
      setContent({ ...originalContent });
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/create")}
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                <FileText size={12} className="text-white" />
              </div>
              <span className="font-semibold text-sm">{companyName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                showTemplates
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Palette size={16} />
              Templates
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <div className="h-5 w-px bg-gray-200 mx-1" />
            <button
              onClick={handleExportPNG}
              disabled={exporting}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              <ImageIcon size={16} />
              PNG
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              {exporting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : exportSuccess ? (
                <Check size={16} />
              ) : (
                <Download size={16} />
              )}
              {exporting ? "Exporting..." : exportSuccess ? "Done!" : "Export PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* Template sidebar */}
      {showTemplates && (
        <div className="fixed right-0 top-[57px] bottom-0 w-72 bg-white border-l border-gray-200 z-40 overflow-y-auto p-4">
          <h3 className="font-bold text-sm mb-3">Change Template</h3>
          <div className="space-y-3">
            {TEMPLATES.map((tmpl) => {
              const isSelected = template.id === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setTemplate(tmpl);
                    setShowTemplates(false);
                  }}
                  className={`w-full text-left rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-500"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                >
                  <div
                    className="h-16"
                    style={{
                      background:
                        tmpl.layout === "gradient-glass"
                          ? `linear-gradient(135deg, ${tmpl.colors.primary}, ${tmpl.colors.secondary})`
                          : tmpl.colors.background === "#ffffff" || tmpl.colors.background.startsWith("#f") || tmpl.colors.background.startsWith("#F")
                          ? `linear-gradient(135deg, ${tmpl.colors.primary}, ${tmpl.colors.primary}dd)`
                          : tmpl.colors.background,
                    }}
                  />
                  <div className="p-2.5">
                    <div className="font-medium text-xs">{tmpl.name}</div>
                    <div className="text-xs text-gray-500">{tmpl.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Canvas area */}
      <div className="flex justify-center py-8 px-4">
        <div
          ref={exportRef}
          className="shadow-2xl rounded-lg overflow-hidden"
          style={{ width: "794px" }}
        >
          <OnePagerRenderer
            content={content}
            template={template}
            editable={true}
            onContentChange={setContent}
            companyName={companyName}
          />
        </div>
      </div>

      {/* Hint */}
      <div className="text-center pb-8 text-sm text-gray-400">
        Click any text on the one-pager to edit it directly
      </div>
    </div>
  );
}
