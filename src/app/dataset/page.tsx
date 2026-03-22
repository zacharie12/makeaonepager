"use client";

import { useState } from "react";
import { Check, ArrowLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface TemplateOption {
  id: string;
  name: string;
  stage: "pre-seed" | "seed" | "series-a";
  inspiration: string;
  description: string;
  sections: string[];
  layoutStyle: string;
  colorScheme: { primary: string; secondary: string; bg: string; accent: string };
  visualPreview: React.ReactNode;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  // ═══ PRE-SEED ═══
  {
    id: "ps-team-first",
    name: "Team-First Pitch",
    stage: "pre-seed",
    inspiration: "YC Application Style",
    description: "Leads with founder credentials and team strength — perfect when you have no traction yet. Clean, text-forward layout that lets your story shine.",
    sections: ["Company & Vision", "The Problem", "Our Solution", "Why Us (Team)", "Market Opportunity", "The Ask"],
    layoutStyle: "Single column, editorial. Large serif headline. Team section prominent with bios. Minimal color, maximum whitespace.",
    colorScheme: { primary: "#1a1a2e", secondary: "#e94560", bg: "#ffffff", accent: "#e94560" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", background: "#fff", borderRadius: "8px", padding: "16px", fontFamily: "Georgia, serif", fontSize: "9px", color: "#1a1a2e", overflow: "hidden" }}>
        <div style={{ borderBottom: "2px solid #e94560", paddingBottom: "8px", marginBottom: "10px" }}>
          <div style={{ fontSize: "7px", color: "#e94560", fontFamily: "Inter, sans-serif", letterSpacing: "1px", marginBottom: "4px" }}>COMPANY NAME</div>
          <div style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.2 }}>Reimagining How Teams Collaborate Across Borders</div>
          <div style={{ fontSize: "8px", color: "#666", marginTop: "4px" }}>A one-line description of what you do</div>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "7px", color: "#e94560", fontWeight: 700, marginBottom: "2px", fontFamily: "Inter, sans-serif" }}>THE PROBLEM</div>
          <div style={{ fontSize: "8px", color: "#444", lineHeight: 1.4 }}>Two sentences describing the pain point you solve...</div>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "7px", color: "#e94560", fontWeight: 700, marginBottom: "2px", fontFamily: "Inter, sans-serif" }}>OUR SOLUTION</div>
          <div style={{ fontSize: "8px", color: "#444", lineHeight: 1.4 }}>Two sentences on your approach...</div>
        </div>
        <div style={{ marginBottom: "8px", background: "#f8f8f6", padding: "8px", borderRadius: "4px" }}>
          <div style={{ fontSize: "7px", color: "#e94560", fontWeight: 700, marginBottom: "4px", fontFamily: "Inter, sans-serif" }}>WHY US</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ flex: 1, fontSize: "7px", color: "#444" }}>
              <div style={{ fontWeight: 700, fontSize: "8px", color: "#1a1a2e" }}>Jane D.</div>
              Ex-Google, 10yr ML
            </div>
            <div style={{ flex: 1, fontSize: "7px", color: "#444" }}>
              <div style={{ fontWeight: 700, fontSize: "8px", color: "#1a1a2e" }}>John S.</div>
              Ex-Stripe, payments
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "7px", color: "#e94560", fontWeight: 700, marginBottom: "2px", fontFamily: "Inter, sans-serif" }}>MARKET</div>
            <div style={{ fontSize: "8px", color: "#444" }}>$12B TAM, 15% CAGR</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "7px", color: "#e94560", fontWeight: 700, marginBottom: "2px", fontFamily: "Inter, sans-serif" }}>THE ASK</div>
            <div style={{ fontSize: "8px", color: "#444" }}>$500K pre-seed</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ps-vision-bold",
    name: "Vision Bold",
    stage: "pre-seed",
    inspiration: "Underscore VC Template",
    description: "Big bold headline with your vision. Dark header that commands attention. Best for founders with a strong narrative and unique insight.",
    sections: ["Vision Statement", "Problem & Insight", "Solution", "Founding Team", "Early Validation", "Raise"],
    layoutStyle: "Dark hero header (40% of page). White content area below with 2-column grid. Bold typography. Accent color pops.",
    colorScheme: { primary: "#0F172A", secondary: "#3B82F6", bg: "#ffffff", accent: "#3B82F6" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", borderRadius: "8px", overflow: "hidden", fontSize: "9px" }}>
        <div style={{ background: "#0F172A", color: "#fff", padding: "16px", height: "90px" }}>
          <div style={{ fontSize: "6px", color: "#3B82F6", fontWeight: 600, letterSpacing: "1px", marginBottom: "6px" }}>COMPANY NAME</div>
          <div style={{ fontSize: "13px", fontWeight: 800, lineHeight: 1.2, marginBottom: "4px" }}>The future of how businesses handle X</div>
          <div style={{ fontSize: "7px", opacity: 0.7 }}>One line about your unique insight</div>
        </div>
        <div style={{ background: "#fff", padding: "12px", color: "#1a1a2e" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
            <div style={{ background: "#F0F4FF", padding: "8px", borderRadius: "4px", borderLeft: "2px solid #3B82F6" }}>
              <div style={{ fontSize: "7px", fontWeight: 700, color: "#3B82F6", marginBottom: "2px" }}>PROBLEM</div>
              <div style={{ fontSize: "7px", color: "#444" }}>Pain point described here...</div>
            </div>
            <div style={{ background: "#F0F4FF", padding: "8px", borderRadius: "4px", borderLeft: "2px solid #3B82F6" }}>
              <div style={{ fontSize: "7px", fontWeight: 700, color: "#3B82F6", marginBottom: "2px" }}>SOLUTION</div>
              <div style={{ fontSize: "7px", color: "#444" }}>Your approach here...</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
            <div style={{ background: "#F0F4FF", padding: "8px", borderRadius: "4px", borderLeft: "2px solid #3B82F6" }}>
              <div style={{ fontSize: "7px", fontWeight: 700, color: "#3B82F6", marginBottom: "2px" }}>TEAM</div>
              <div style={{ fontSize: "7px", color: "#444" }}>Founder bios...</div>
            </div>
            <div style={{ background: "#F0F4FF", padding: "8px", borderRadius: "4px", borderLeft: "2px solid #3B82F6" }}>
              <div style={{ fontSize: "7px", fontWeight: 700, color: "#3B82F6", marginBottom: "2px" }}>VALIDATION</div>
              <div style={{ fontSize: "7px", color: "#444" }}>Early signals...</div>
            </div>
          </div>
          <div style={{ background: "#0F172A", color: "#fff", padding: "8px", borderRadius: "4px", textAlign: "center", fontSize: "8px", fontWeight: 700 }}>
            Raising $500K Pre-Seed →
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ps-minimal-story",
    name: "Minimal Storyteller",
    stage: "pre-seed",
    inspiration: "Notion/Linear Style",
    description: "Ultra-clean, no-nonsense design. Let your writing do the talking. Perfect for technical founders who want to look polished without being flashy.",
    sections: ["What We Do", "The Problem", "Our Approach", "Team", "Market Size", "What We Need"],
    layoutStyle: "Full single column. Thin accent line separator between sections. No icons, no boxes. Pure typography and whitespace.",
    colorScheme: { primary: "#37352F", secondary: "#37352F", bg: "#ffffff", accent: "#EB5757" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", background: "#fff", borderRadius: "8px", padding: "20px", fontSize: "9px", color: "#37352F", overflow: "hidden" }}>
        <div style={{ fontSize: "7px", color: "#9B9A97", letterSpacing: "2px", marginBottom: "12px" }}>COMPANY NAME</div>
        <div style={{ fontSize: "16px", fontWeight: 300, fontFamily: "Georgia, serif", lineHeight: 1.3, marginBottom: "8px" }}>A clear, compelling headline about your vision</div>
        <div style={{ fontSize: "8px", color: "#9B9A97", marginBottom: "16px" }}>Supporting context line</div>
        <div style={{ width: "20px", height: "2px", background: "#EB5757", marginBottom: "16px" }} />
        <div style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "7px", color: "#EB5757", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "3px" }}>THE PROBLEM</div>
          <div style={{ fontSize: "8px", lineHeight: 1.6, color: "#37352F" }}>A clear description of what&apos;s broken in the world today and why it matters now...</div>
        </div>
        <div style={{ marginBottom: "12px", borderTop: "1px solid #E9E9E7", paddingTop: "12px" }}>
          <div style={{ fontSize: "7px", color: "#EB5757", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "3px" }}>OUR APPROACH</div>
          <div style={{ fontSize: "8px", lineHeight: 1.6, color: "#37352F" }}>How you solve it differently...</div>
        </div>
        <div style={{ borderTop: "1px solid #E9E9E7", paddingTop: "12px" }}>
          <div style={{ fontSize: "7px", color: "#EB5757", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "3px" }}>TEAM</div>
          <div style={{ fontSize: "8px", lineHeight: 1.6, color: "#37352F" }}>Founder credentials...</div>
        </div>
      </div>
    ),
  },

  // ═══ SEED ═══
  {
    id: "seed-traction-led",
    name: "Traction-Led",
    stage: "seed",
    inspiration: "NFX / Top VC Format",
    description: "Leads with your best metric in huge type. Shows growth trajectory. Best when you have real numbers that tell a compelling story.",
    sections: ["Hero Metric", "Problem", "Solution", "Key Metrics (3-4)", "Market", "Team", "The Ask"],
    layoutStyle: "Large metric banner at top. 2-column grid for sections. Metrics strip with 3-4 KPIs in colored boxes. Clean CTA bar.",
    colorScheme: { primary: "#059669", secondary: "#064E3B", bg: "#ffffff", accent: "#10B981" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", background: "#fff", borderRadius: "8px", overflow: "hidden", fontSize: "9px" }}>
        <div style={{ background: "#059669", color: "#fff", padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontSize: "6px", letterSpacing: "1px", opacity: 0.8, marginBottom: "4px" }}>COMPANY NAME</div>
          <div style={{ fontSize: "20px", fontWeight: 800 }}>$2.1M ARR</div>
          <div style={{ fontSize: "7px", opacity: 0.8 }}>340% YoY Growth • 28K Users • NPS 72</div>
        </div>
        <div style={{ padding: "10px 14px", color: "#1a1a2e" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px", marginBottom: "10px" }}>
            {["$2.1M ARR", "28K Users", "340% YoY", "NPS 72"].map((m, i) => (
              <div key={i} style={{ background: "#F0FDF4", padding: "6px", borderRadius: "4px", textAlign: "center" }}>
                <div style={{ fontSize: "9px", fontWeight: 800, color: "#059669" }}>{m.split(" ")[0]}</div>
                <div style={{ fontSize: "6px", color: "#666" }}>{m.split(" ").slice(1).join(" ")}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "8px" }}>
            {["Problem", "Solution", "Market", "Team"].map((s, i) => (
              <div key={i} style={{ padding: "6px 8px", borderLeft: "2px solid #10B981", background: "#FAFAFA", borderRadius: "0 4px 4px 0" }}>
                <div style={{ fontSize: "6px", fontWeight: 700, color: "#059669", marginBottom: "1px" }}>{s.toUpperCase()}</div>
                <div style={{ fontSize: "7px", color: "#444" }}>Key details here...</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#059669", color: "#fff", padding: "6px", borderRadius: "4px", textAlign: "center", fontSize: "8px", fontWeight: 700 }}>
            Raising $3M Seed Round →
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "seed-stripe-clean",
    name: "Stripe Clean",
    stage: "seed",
    inspiration: "Stripe / Linear Design Language",
    description: "Polished, modern SaaS aesthetic with subtle gradients. Header with gradient orbs. Professional and trustworthy feel.",
    sections: ["Company & Tagline", "Problem", "Solution", "Traction", "Market", "Team", "Ask"],
    layoutStyle: "Dark navy header with gradient accents. White card grid below. Rounded corners everywhere. Gradient CTA button.",
    colorScheme: { primary: "#635BFF", secondary: "#0A2540", bg: "#ffffff", accent: "#80E9FF" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", borderRadius: "8px", overflow: "hidden", fontSize: "9px" }}>
        <div style={{ background: "#0A2540", color: "#fff", padding: "14px 16px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20px", right: "-10px", width: "60px", height: "60px", borderRadius: "50%", background: "radial-gradient(circle, #635BFF40, transparent)" }} />
          <div style={{ fontSize: "7px", color: "#635BFF", fontWeight: 600, marginBottom: "6px" }}>COMPANY NAME</div>
          <div style={{ fontSize: "13px", fontWeight: 800, lineHeight: 1.2, marginBottom: "4px", position: "relative" }}>Headline capturing your value proposition</div>
          <div style={{ fontSize: "7px", opacity: 0.7 }}>Supporting subheadline</div>
        </div>
        <div style={{ background: "#F6F9FC", padding: "10px 14px", color: "#0A2540" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "8px" }}>
            {["Problem", "Solution", "Traction", "Market"].map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E3E8EE", borderRadius: "8px", padding: "8px" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "linear-gradient(135deg, #635BFF, #80E9FF)", marginBottom: "4px" }} />
                <div style={{ fontSize: "7px", fontWeight: 700, marginBottom: "2px" }}>{s}</div>
                <div style={{ fontSize: "7px", color: "#425466" }}>Details here...</div>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg, #635BFF, #0A2540)", color: "#fff", padding: "8px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "8px", fontWeight: 700 }}>Let&apos;s Talk →</span>
            <span style={{ fontSize: "7px", opacity: 0.8 }}>contact@company.com</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "seed-sidebar-data",
    name: "Sidebar Data",
    stage: "seed",
    inspiration: "VC LP One-Pager Format",
    description: "Left sidebar with branding and key stats. Right side with detailed sections. Great for data-heavy pitches with lots of metrics.",
    sections: ["Brand & Summary (sidebar)", "Key Stats (sidebar)", "Problem & Solution", "Traction Details", "Market Analysis", "Team", "Ask & Contact (sidebar)"],
    layoutStyle: "30% left sidebar (dark bg, white text, key metrics). 70% right content area with stacked sections. Professional, corporate feel.",
    colorScheme: { primary: "#1E40AF", secondary: "#1E3A5F", bg: "#ffffff", accent: "#3B82F6" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", borderRadius: "8px", overflow: "hidden", fontSize: "9px", display: "flex" }}>
        <div style={{ width: "35%", background: "#1E3A5F", color: "#fff", padding: "14px 10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#1E40AF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, marginBottom: "8px" }}>C</div>
            <div style={{ fontSize: "9px", fontWeight: 700, marginBottom: "2px" }}>Company</div>
            <div style={{ fontSize: "6px", opacity: 0.7, lineHeight: 1.5, marginBottom: "10px" }}>One-line desc</div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "8px" }}>
              {["$2M ARR", "10K Users", "30% MoM"].map((m, i) => (
                <div key={i} style={{ marginBottom: "6px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 800 }}>{m.split(" ")[0]}</div>
                  <div style={{ fontSize: "6px", opacity: 0.6 }}>{m.split(" ").slice(1).join(" ")}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: "6px", opacity: 0.5, lineHeight: 1.6 }}>contact@co.com<br />co.com</div>
        </div>
        <div style={{ flex: 1, background: "#fff", padding: "14px 12px", color: "#1a1a2e" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "10px", lineHeight: 1.2 }}>Headline here</div>
          {["Problem", "Solution", "Market", "Team"].map((s, i) => (
            <div key={i} style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: i < 3 ? "1px solid #DBEAFE" : "none" }}>
              <div style={{ fontSize: "7px", fontWeight: 700, color: "#1E40AF", marginBottom: "2px" }}>{s}</div>
              <div style={{ fontSize: "7px", color: "#64748B" }}>Section content...</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ═══ SERIES A ═══
  {
    id: "sa-metrics-hero",
    name: "Metrics Hero",
    stage: "series-a",
    inspiration: "Top Series A Decks",
    description: "Full metrics dashboard feel. Multiple KPI cards, growth chart area, and strong data visualization. For when your numbers speak louder than words.",
    sections: ["Company & Position", "Metrics Dashboard (4-6 KPIs)", "The Opportunity", "Growth Story", "Competitive Advantage", "Team & Advisors", "Use of Funds"],
    layoutStyle: "Top brand bar. Metrics grid (2x3 or 1x4). Content sections below. Professional, data-forward design.",
    colorScheme: { primary: "#7C3AED", secondary: "#4F46E5", bg: "#FAF5FF", accent: "#A78BFA" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", background: "#FAF5FF", borderRadius: "8px", overflow: "hidden", fontSize: "9px", padding: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "linear-gradient(135deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: 800 }}>C</div>
            <span style={{ fontWeight: 700, fontSize: "10px", color: "#1E1B4B" }}>Company</span>
          </div>
          <span style={{ fontSize: "6px", color: "#6D6B7F" }}>contact@co.com</span>
        </div>
        <div style={{ fontSize: "12px", fontWeight: 800, color: "#1E1B4B", marginBottom: "4px", background: "linear-gradient(135deg, #7C3AED, #4F46E5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } as React.CSSProperties}>Series A — $15M Round</div>
        <div style={{ fontSize: "7px", color: "#6D6B7F", marginBottom: "10px" }}>Category-defining platform for X</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", marginBottom: "10px" }}>
          {["$8M ARR", "120K Users", "95% Retention", "40% MoM", "$2M MRR", "NPS 78"].map((m, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", border: "1px solid #E9D5FF", borderRadius: "8px", padding: "6px", textAlign: "center" }}>
              <div style={{ fontSize: "9px", fontWeight: 800, color: "#7C3AED" }}>{m.split(" ")[0]}</div>
              <div style={{ fontSize: "5px", color: "#6D6B7F" }}>{m.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {["Growth Story", "Competitive Moat"].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #E9D5FF", borderRadius: "8px", padding: "6px" }}>
              <div style={{ fontSize: "6px", fontWeight: 700, color: "#7C3AED", marginBottom: "2px" }}>{s}</div>
              <div style={{ fontSize: "6px", color: "#6D6B7F" }}>Details...</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "sa-executive",
    name: "Executive Brief",
    stage: "series-a",
    inspiration: "McKinsey / Goldman Style",
    description: "Serious, buttoned-up executive format. Dark top, structured grid. Communicates 'we're a real business' to institutional investors.",
    sections: ["Company Overview", "Market Position", "Financial Highlights", "Growth Strategy", "Leadership Team", "Investment Terms"],
    layoutStyle: "Black header band. Structured 2-column grid with thin borders. Accent color only on headings. Serif headlines. Very corporate.",
    colorScheme: { primary: "#000000", secondary: "#111827", bg: "#ffffff", accent: "#1D4ED8" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", borderRadius: "8px", overflow: "hidden", fontSize: "9px" }}>
        <div style={{ background: "#000", color: "#fff", padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, fontFamily: "Georgia, serif" }}>Company Name</div>
              <div style={{ fontSize: "7px", opacity: 0.6, marginTop: "2px" }}>Series A Investment Memorandum</div>
            </div>
            <div style={{ fontSize: "6px", opacity: 0.5, textAlign: "right" }}>Q1 2026<br />Confidential</div>
          </div>
        </div>
        <div style={{ height: "3px", background: "#1D4ED8" }} />
        <div style={{ background: "#fff", padding: "10px 14px", color: "#111827" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#E5E7EB", marginBottom: "8px" }}>
            {["Market Position", "Financial Highlights", "Growth Strategy", "Leadership"].map((s, i) => (
              <div key={i} style={{ background: "#fff", padding: "8px" }}>
                <div style={{ fontSize: "7px", fontWeight: 700, color: "#1D4ED8", marginBottom: "2px", fontFamily: "Georgia, serif" }}>{s}</div>
                <div style={{ fontSize: "7px", color: "#6B7280", lineHeight: 1.5 }}>Structured content here with specific data points...</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", padding: "8px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "8px", fontWeight: 700 }}>Investment: $15M Series A</div>
              <div style={{ fontSize: "6px", color: "#6B7280" }}>Pre-money valuation: $60M</div>
            </div>
            <div style={{ fontSize: "6px", color: "#6B7280", textAlign: "right" }}>contact@company.com<br />company.com</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "sa-growth-story",
    name: "Growth Narrative",
    stage: "series-a",
    inspiration: "a16z Portfolio Style",
    description: "Tells a growth story with a visual timeline. Shows where you've been and where you're going. Great for showing momentum.",
    sections: ["Company & Headline", "The Journey So Far", "Where We Are Now (Metrics)", "Where We're Going", "Why Now", "Team", "The Raise"],
    layoutStyle: "Clean white with green accent. Top headline area. Horizontal metrics strip. Growth timeline visual. 2-column details. Green CTA.",
    colorScheme: { primary: "#059669", secondary: "#064E3B", bg: "#ffffff", accent: "#10B981" },
    visualPreview: (
      <div style={{ width: "100%", height: "220px", background: "#fff", borderRadius: "8px", overflow: "hidden", fontSize: "9px", padding: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#059669", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: 800 }}>C</div>
            <span style={{ fontWeight: 700 }}>Company</span>
          </div>
          <span style={{ fontSize: "6px", color: "#64748B" }}>Series A</span>
        </div>
        <div style={{ fontSize: "12px", fontWeight: 800, color: "#1E293B", marginBottom: "10px" }}>From 0 to $5M ARR in 18 months</div>
        {/* Timeline */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px", padding: "8px", background: "#F0FDF4", borderRadius: "6px" }}>
          {["Launch", "$100K", "$1M", "$5M", "$20M?"].map((m, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: i < 4 ? "#059669" : "#D1FAE5", margin: "0 auto 3px", border: i === 3 ? "2px solid #059669" : "none" }} />
              <div style={{ fontSize: "6px", fontWeight: i === 3 ? 800 : 400, color: i < 4 ? "#059669" : "#94A3B8" }}>{m}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "8px" }}>
          {["Where We Are", "Where We're Going"].map((s, i) => (
            <div key={i} style={{ border: "1px solid #D1FAE5", borderRadius: "6px", padding: "8px" }}>
              <div style={{ fontSize: "7px", fontWeight: 700, color: "#059669", marginBottom: "2px" }}>{s}</div>
              <div style={{ fontSize: "7px", color: "#64748B" }}>Key details and metrics...</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#059669", color: "#fff", padding: "6px", borderRadius: "4px", textAlign: "center", fontSize: "8px", fontWeight: 700 }}>
          Raising $12M to scale globally →
        </div>
      </div>
    ),
  },
];

const STAGES = [
  { id: "pre-seed", label: "Pre-Seed", color: "#e94560" },
  { id: "seed", label: "Seed", color: "#059669" },
  { id: "series-a", label: "Series A", color: "#7C3AED" },
];

export default function DatasetPage() {
  const router = useRouter();
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = selectedStage === "all"
    ? TEMPLATE_OPTIONS
    : TEMPLATE_OPTIONS.filter((t) => t.stage === selectedStage);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer">
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <FileText size={14} className="text-white" />
              </div>
              <span className="font-bold">Template Dataset</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {selected.size} selected
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">One-Pager Template Dataset</h1>
        <p className="text-gray-500 mb-6">
          Review each template below. Click to select the ones you want to build. Each one is based on real best-performing investor one-pagers.
        </p>

        {/* Stage filter */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setSelectedStage("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              selectedStage === "all" ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            All ({TEMPLATE_OPTIONS.length})
          </button>
          {STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStage(s.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                selectedStage === s.id ? "text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
              style={selectedStage === s.id ? { background: s.color } : {}}
            >
              {s.label} ({TEMPLATE_OPTIONS.filter((t) => t.stage === s.id).length})
            </button>
          ))}
        </div>

        {/* Template cards */}
        <div className="space-y-6">
          {filtered.map((tmpl) => {
            const isSelected = selected.has(tmpl.id);
            const stageInfo = STAGES.find((s) => s.id === tmpl.stage)!;
            return (
              <div
                key={tmpl.id}
                onClick={() => toggle(tmpl.id)}
                className={`bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${
                  isSelected ? "border-blue-500 shadow-lg" : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex">
                  {/* Visual preview */}
                  <div className="w-[300px] shrink-0 border-r border-gray-100 p-4 bg-gray-50">
                    {tmpl.visualPreview}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                            style={{ background: stageInfo.color }}
                          >
                            {stageInfo.label}
                          </span>
                          <span className="text-xs text-gray-400">{tmpl.inspiration}</span>
                        </div>
                        <h3 className="text-lg font-bold">{tmpl.name}</h3>
                      </div>
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300"
                      }`}>
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">{tmpl.description}</p>

                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-400 mb-1.5">SECTIONS</div>
                      <div className="flex flex-wrap gap-1.5">
                        {tmpl.sections.map((s, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-gray-400 mb-1.5">LAYOUT</div>
                      <p className="text-xs text-gray-500">{tmpl.layoutStyle}</p>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <div className="text-xs font-semibold text-gray-400 mr-1">COLORS</div>
                      {Object.values(tmpl.colorScheme).map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded border border-gray-200" style={{ background: c }} title={c} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom action bar */}
        {selected.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="text-sm">
                <span className="font-bold">{selected.size}</span> templates selected:
                <span className="text-gray-500 ml-2">
                  {Array.from(selected).map((id) => TEMPLATE_OPTIONS.find((t) => t.id === id)?.name).join(", ")}
                </span>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer hover:bg-blue-700">
                Build Selected Templates
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
