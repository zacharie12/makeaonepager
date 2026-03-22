"use client";

import React from "react";
import {
  Target,
  Rocket,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Award,
  Briefcase,
  Heart,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import type { TemplateStyle } from "@/templates";
import type { OnePagerContent } from "@/lib/ai";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  target: Target,
  rocket: Rocket,
  users: Users,
  chart: BarChart3,
  shield: Shield,
  zap: Zap,
  globe: Globe,
  award: Award,
  briefcase: Briefcase,
  heart: Heart,
  trending: TrendingUp,
  check: CheckCircle2,
};

interface Props {
  content: OnePagerContent;
  template: TemplateStyle;
  editable?: boolean;
  onContentChange?: (content: OnePagerContent) => void;
  companyName: string;
}

function E({
  text,
  editable,
  onUpdate,
  className,
  style,
  tag: Tag = "p",
}: {
  text: string;
  editable?: boolean;
  onUpdate?: (text: string) => void;
  className?: string;
  style?: React.CSSProperties;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}) {
  if (!editable) return <Tag className={className} style={style}>{text}</Tag>;
  return (
    <Tag
      className={className}
      style={style}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onUpdate?.(e.currentTarget.textContent || "")}
    >
      {text}
    </Tag>
  );
}

const PAGE: React.CSSProperties = {
  width: "794px",
  minHeight: "1123px",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
};

export default function OnePagerRenderer({ content, template, editable = false, onContentChange, companyName }: Props) {
  const { colors } = template;
  const f = template.fontPairing;

  const up = (field: keyof OnePagerContent, value: string) =>
    onContentChange?.({ ...content, [field]: value });
  const upSec = (i: number, field: "title" | "content", value: string) => {
    if (!onContentChange) return;
    const s = [...content.sections];
    s[i] = { ...s[i], [field]: value };
    onContentChange({ ...content, sections: s });
  };

  /* ═══════════════════════════════════════════════════════
     YC CLASSIC — The proven YC one-pager format
     Based on real YC application one-pagers
  ═══════════════════════════════════════════════════════ */
  if (template.layout === "yc-classic") {
    return (
      <div id="onepager-export" style={{ ...PAGE, background: colors.background, color: colors.text, fontFamily: f.body, padding: "56px 52px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "10px", background: colors.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", fontWeight: 800, color: colors.textInverse, fontFamily: f.heading,
            }}>
              {companyName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: "20px", fontWeight: 700, fontFamily: f.heading, color: colors.text, letterSpacing: "-0.3px" }}>
                {companyName}
              </div>
            </div>
          </div>
          <E tag="div" text={content.contactBlock} editable={editable} onUpdate={(v) => up("contactBlock", v)}
            style={{ fontSize: "11px", color: colors.textLight, textAlign: "right", lineHeight: 1.6, maxWidth: "200px" }} />
        </div>

        {/* Divider */}
        <div style={{ height: "2px", background: colors.primary, marginBottom: "24px", marginTop: "16px" }} />

        {/* Headline */}
        <E tag="h1" text={content.headline} editable={editable} onUpdate={(v) => up("headline", v)}
          style={{
            fontSize: "28px", fontWeight: f.headingWeight, fontFamily: f.heading,
            lineHeight: 1.25, margin: "0 0 10px 0", color: colors.text, letterSpacing: "-0.5px",
          }} />
        <E tag="p" text={content.subheadline} editable={editable} onUpdate={(v) => up("subheadline", v)}
          style={{ fontSize: "15px", color: colors.textLight, margin: "0 0 28px 0", lineHeight: 1.6, maxWidth: "600px" }} />

        {/* Sections — 2 col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 24px", marginBottom: "28px" }}>
          {content.sections.map((sec, i) => {
            const Icon = ICON_MAP[sec.icon || "zap"] || Zap;
            return (
              <div key={i} style={{
                padding: "18px 20px", borderRadius: "8px", background: colors.backgroundAlt,
                borderLeft: `3px solid ${colors.primary}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Icon size={15} color={colors.primary} strokeWidth={2.5} />
                  <E tag="h3" text={sec.title} editable={editable} onUpdate={(v) => upSec(i, "title", v)}
                    style={{ fontSize: "13px", fontWeight: 700, color: colors.text, margin: 0, fontFamily: f.heading, textTransform: "uppercase", letterSpacing: "0.5px" }} />
                </div>
                <E tag="p" text={sec.content} editable={editable} onUpdate={(v) => upSec(i, "content", v)}
                  style={{ fontSize: "12.5px", color: colors.textLight, lineHeight: 1.65, margin: 0 }} />
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div style={{
          background: colors.primary, color: colors.textInverse, padding: "20px 28px", borderRadius: "8px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <E tag="div" text={content.callToAction} editable={editable} onUpdate={(v) => up("callToAction", v)}
            style={{ fontSize: "15px", fontWeight: 700, fontFamily: f.heading }} />
          <div style={{ fontSize: "12px", opacity: 0.85 }}>→ {companyName}</div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     STRIPE MODERN — Inspired by Stripe's design language
  ═══════════════════════════════════════════════════════ */
  if (template.layout === "stripe-modern") {
    return (
      <div id="onepager-export" style={{ ...PAGE, background: colors.background, color: colors.text, fontFamily: f.body }}>
        {/* Header band */}
        <div style={{ background: colors.secondary, padding: "40px 52px 36px", position: "relative", overflow: "hidden" }}>
          {/* Decorative gradient orbs */}
          <div style={{ position: "absolute", top: "-80px", right: "-40px", width: "250px", height: "250px", borderRadius: "50%", background: `radial-gradient(circle, ${colors.primary}40, transparent)` }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "30%", width: "180px", height: "180px", borderRadius: "50%", background: `radial-gradient(circle, ${colors.accent}25, transparent)` }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: colors.primary, letterSpacing: "0.5px" }}>
                {companyName.toUpperCase()}
              </div>
              <E tag="div" text={content.contactBlock} editable={editable} onUpdate={(v) => up("contactBlock", v)}
                style={{ fontSize: "11px", color: `${colors.textInverse}99`, textAlign: "right", lineHeight: 1.6 }} />
            </div>
            <E tag="h1" text={content.headline} editable={editable} onUpdate={(v) => up("headline", v)}
              style={{
                fontSize: "30px", fontWeight: f.headingWeight, color: colors.textInverse,
                lineHeight: 1.2, margin: "0 0 10px 0", letterSpacing: "-0.6px", maxWidth: "550px",
              }} />
            <E tag="p" text={content.subheadline} editable={editable} onUpdate={(v) => up("subheadline", v)}
              style={{ fontSize: "15px", color: `${colors.textInverse}BB`, margin: 0, lineHeight: 1.5, maxWidth: "500px" }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "32px 52px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px", marginBottom: "28px" }}>
            {content.sections.map((sec, i) => {
              const Icon = ICON_MAP[sec.icon || "zap"] || Zap;
              return (
                <div key={i} style={{
                  padding: "20px", borderRadius: "12px", background: colors.backgroundAlt,
                  border: `1px solid ${colors.border}`, transition: "box-shadow 0.2s",
                }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "8px", background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px",
                  }}>
                    <Icon size={16} color="#fff" strokeWidth={2} />
                  </div>
                  <E tag="h3" text={sec.title} editable={editable} onUpdate={(v) => upSec(i, "title", v)}
                    style={{ fontSize: "14px", fontWeight: 700, color: colors.text, margin: "0 0 6px 0" }} />
                  <E tag="p" text={sec.content} editable={editable} onUpdate={(v) => upSec(i, "content", v)}
                    style={{ fontSize: "12.5px", color: colors.textLight, lineHeight: 1.65, margin: 0 }} />
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: colors.textInverse, padding: "22px 28px", borderRadius: "12px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <E tag="div" text={content.callToAction} editable={editable} onUpdate={(v) => up("callToAction", v)}
              style={{ fontSize: "15px", fontWeight: 700 }} />
            <div style={{
              background: "rgba(255,255,255,0.2)", padding: "8px 20px", borderRadius: "6px",
              fontSize: "13px", fontWeight: 600,
            }}>
              Learn More →
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     NOTION MINIMAL — Elegant, typography-first design
  ═══════════════════════════════════════════════════════ */
  if (template.layout === "notion-minimal") {
    return (
      <div id="onepager-export" style={{ ...PAGE, background: colors.background, color: colors.text, fontFamily: f.body, padding: "64px 60px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "12px", color: colors.textLight, letterSpacing: "2px", marginBottom: "20px", textTransform: "uppercase" }}>
            {companyName}
          </div>
          <E tag="h1" text={content.headline} editable={editable} onUpdate={(v) => up("headline", v)}
            style={{
              fontSize: "38px", fontWeight: f.headingWeight, fontFamily: f.heading,
              lineHeight: 1.2, margin: "0 0 14px 0", color: colors.text, letterSpacing: "-0.5px",
            }} />
          <E tag="p" text={content.subheadline} editable={editable} onUpdate={(v) => up("subheadline", v)}
            style={{ fontSize: "17px", color: colors.textLight, margin: 0, lineHeight: 1.6 }} />
          <div style={{ width: "32px", height: "3px", background: colors.accent, marginTop: "28px", borderRadius: "2px" }} />
        </div>

        {/* Sections — single column, editorial style */}
        <div style={{ marginBottom: "48px" }}>
          {content.sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: i < content.sections.length - 1 ? `1px solid ${colors.border}` : "none" }}>
              <E tag="h3" text={sec.title} editable={editable} onUpdate={(v) => upSec(i, "title", v)}
                style={{
                  fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px",
                  color: colors.accent, margin: "0 0 10px 0",
                }} />
              <E tag="p" text={sec.content} editable={editable} onUpdate={(v) => upSec(i, "content", v)}
                style={{ fontSize: "15px", lineHeight: 1.75, margin: 0, color: colors.text }} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "20px", borderTop: `1px solid ${colors.border}` }}>
          <div>
            <E tag="div" text={content.callToAction} editable={editable} onUpdate={(v) => up("callToAction", v)}
              style={{ fontSize: "14px", fontWeight: 600, fontFamily: f.heading, marginBottom: "4px" }} />
            <div style={{ fontSize: "11px", color: colors.textLight }}>
              {companyName}
            </div>
          </div>
          <E tag="div" text={content.contactBlock} editable={editable} onUpdate={(v) => up("contactBlock", v)}
            style={{ fontSize: "12px", color: colors.textLight, textAlign: "right", lineHeight: 1.7 }} />
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     BOLD HERO — High-impact, full-width hero design
  ═══════════════════════════════════════════════════════ */
  if (template.layout === "bold-hero") {
    return (
      <div id="onepager-export" style={{ ...PAGE, background: colors.background, color: colors.text, fontFamily: f.body }}>
        {/* Giant hero */}
        <div style={{ padding: "52px 52px 40px", background: colors.primary }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", fontWeight: 900, color: colors.textInverse,
              }}>
                {companyName.charAt(0)}
              </div>
              <span style={{ color: colors.textInverse, fontSize: "15px", fontWeight: 600 }}>{companyName}</span>
            </div>
            <E tag="div" text={content.contactBlock} editable={editable} onUpdate={(v) => up("contactBlock", v)}
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textAlign: "right", lineHeight: 1.6 }} />
          </div>
          <E tag="h1" text={content.headline} editable={editable} onUpdate={(v) => up("headline", v)}
            style={{
              fontSize: "36px", fontWeight: f.headingWeight, color: colors.textInverse,
              lineHeight: 1.15, margin: "0 0 14px 0", letterSpacing: "-1px", maxWidth: "580px",
            }} />
          <E tag="p" text={content.subheadline} editable={editable} onUpdate={(v) => up("subheadline", v)}
            style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.5, maxWidth: "500px" }} />
        </div>

        {/* Accent bar */}
        <div style={{ height: "4px", background: colors.accent }} />

        {/* Content grid */}
        <div style={{ padding: "32px 52px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
            {content.sections.map((sec, i) => {
              const Icon = ICON_MAP[sec.icon || "zap"] || Zap;
              return (
                <div key={i} style={{ padding: "20px 22px", borderLeft: `3px solid ${colors.accent}`, background: colors.backgroundAlt, borderRadius: "0 8px 8px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <Icon size={15} color={colors.accent} strokeWidth={2.5} />
                    <E tag="h3" text={sec.title} editable={editable} onUpdate={(v) => upSec(i, "title", v)}
                      style={{ fontSize: "14px", fontWeight: 700, margin: 0 }} />
                  </div>
                  <E tag="p" text={sec.content} editable={editable} onUpdate={(v) => upSec(i, "content", v)}
                    style={{ fontSize: "12.5px", color: colors.textLight, lineHeight: 1.65, margin: 0 }} />
                </div>
              );
            })}
          </div>

          <E tag="div" text={content.callToAction} editable={editable} onUpdate={(v) => up("callToAction", v)}
            style={{
              fontSize: "16px", fontWeight: 800, color: colors.textInverse, background: colors.primary,
              padding: "18px 28px", borderRadius: "8px", textAlign: "center",
            }} />
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     SIDEBAR PRO — Investor deck with left sidebar
  ═══════════════════════════════════════════════════════ */
  if (template.layout === "sidebar-pro") {
    return (
      <div id="onepager-export" style={{ ...PAGE, background: colors.background, color: colors.text, fontFamily: f.body, display: "flex" }}>
        {/* Left sidebar */}
        <div style={{
          width: "260px", background: colors.secondary, color: colors.textInverse, padding: "44px 28px",
          display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div>
            {/* Logo */}
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px", background: colors.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", fontWeight: 800, marginBottom: "20px",
            }}>
              {companyName.charAt(0)}
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>{companyName}</div>
            <E tag="p" text={content.subheadline} editable={editable} onUpdate={(v) => up("subheadline", v)}
              style={{ fontSize: "12px", opacity: 0.75, lineHeight: 1.6, margin: "0 0 28px 0" }} />

            {/* Key metrics highlight */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "20px" }}>
              {content.sections.slice(0, 2).map((sec, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", opacity: 0.5, marginBottom: "4px" }}>
                    {sec.title}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.85, lineHeight: 1.5 }}>
                    {sec.content.substring(0, 80)}...
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <E tag="div" text={content.contactBlock} editable={editable} onUpdate={(v) => up("contactBlock", v)}
              style={{ fontSize: "11px", opacity: 0.65, lineHeight: 1.8 }} />
          </div>
        </div>

        {/* Right content */}
        <div style={{ flex: 1, padding: "44px 40px" }}>
          <E tag="h1" text={content.headline} editable={editable} onUpdate={(v) => up("headline", v)}
            style={{
              fontSize: "26px", fontWeight: f.headingWeight, lineHeight: 1.25,
              margin: "0 0 28px 0", color: colors.text, letterSpacing: "-0.4px",
            }} />

          {content.sections.map((sec, i) => {
            const Icon = ICON_MAP[sec.icon || "zap"] || Zap;
            return (
              <div key={i} style={{ marginBottom: "22px", paddingBottom: "22px", borderBottom: i < content.sections.length - 1 ? `1px solid ${colors.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "6px", background: colors.primaryLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={13} color={colors.primary} strokeWidth={2.5} />
                  </div>
                  <E tag="h3" text={sec.title} editable={editable} onUpdate={(v) => upSec(i, "title", v)}
                    style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: colors.primary }} />
                </div>
                <E tag="p" text={sec.content} editable={editable} onUpdate={(v) => upSec(i, "content", v)}
                  style={{ fontSize: "12.5px", color: colors.textLight, lineHeight: 1.65, margin: 0, paddingLeft: "32px" }} />
              </div>
            );
          })}

          {/* CTA */}
          <div style={{
            marginTop: "8px", padding: "18px 24px", borderRadius: "10px",
            background: colors.primaryLight, border: `2px solid ${colors.primary}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <E tag="div" text={content.callToAction} editable={editable} onUpdate={(v) => up("callToAction", v)}
              style={{ fontSize: "14px", fontWeight: 700, color: colors.primary }} />
            <div style={{ fontSize: "18px" }}>→</div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     GRADIENT GLASS — Modern glassmorphism
  ═══════════════════════════════════════════════════════ */
  if (template.layout === "gradient-glass") {
    return (
      <div id="onepager-export" style={{
        ...PAGE, fontFamily: f.body, color: colors.text,
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundAlt} 50%, ${colors.primary}12 100%)`,
        padding: "48px 52px",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-100px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: `radial-gradient(circle, ${colors.primary}20, transparent)`, filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: `radial-gradient(circle, ${colors.secondary}20, transparent)`, filter: "blur(30px)" }} />

        {/* Header */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 14px 6px 6px", borderRadius: "24px",
              background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)",
              border: `1px solid ${colors.border}`,
            }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 800, color: "#fff",
              }}>
                {companyName.charAt(0)}
              </div>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>{companyName}</span>
            </div>
            <E tag="div" text={content.contactBlock} editable={editable} onUpdate={(v) => up("contactBlock", v)}
              style={{ fontSize: "11px", color: colors.textLight, textAlign: "right", lineHeight: 1.6 }} />
          </div>

          <E tag="h1" text={content.headline} editable={editable} onUpdate={(v) => up("headline", v)}
            style={{
              fontSize: "32px", fontWeight: f.headingWeight, lineHeight: 1.2, margin: "0 0 10px 0",
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            } as React.CSSProperties} />
          <E tag="p" text={content.subheadline} editable={editable} onUpdate={(v) => up("subheadline", v)}
            style={{ fontSize: "15px", color: colors.textLight, margin: 0, lineHeight: 1.6 }} />
        </div>

        {/* Glass cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px", position: "relative", zIndex: 1 }}>
          {content.sections.map((sec, i) => {
            const Icon = ICON_MAP[sec.icon || "zap"] || Zap;
            return (
              <div key={i} style={{
                padding: "22px", borderRadius: "16px",
                background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "10px",
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px",
                }}>
                  <Icon size={16} color="#fff" strokeWidth={2} />
                </div>
                <E tag="h3" text={sec.title} editable={editable} onUpdate={(v) => upSec(i, "title", v)}
                  style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 6px 0" }} />
                <E tag="p" text={sec.content} editable={editable} onUpdate={(v) => upSec(i, "content", v)}
                  style={{ fontSize: "12.5px", color: colors.textLight, lineHeight: 1.65, margin: 0 }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          position: "relative", zIndex: 1,
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          color: "#fff", padding: "22px 28px", borderRadius: "16px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxShadow: `0 8px 32px ${colors.primary}30`,
        }}>
          <E tag="div" text={content.callToAction} editable={editable} onUpdate={(v) => up("callToAction", v)}
            style={{ fontSize: "15px", fontWeight: 700 }} />
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
            Get Started →
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     DARK ELITE — Premium dark theme
  ═══════════════════════════════════════════════════════ */
  if (template.layout === "dark-elite") {
    return (
      <div id="onepager-export" style={{ ...PAGE, background: colors.background, color: colors.text, fontFamily: f.body, padding: "52px" }}>
        {/* Subtle grid pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${colors.textLight} 1px, transparent 1px), linear-gradient(90deg, ${colors.textLight} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", fontWeight: 800, color: colors.textInverse,
                }}>
                  {companyName.charAt(0)}
                </div>
                <span style={{ fontSize: "16px", fontWeight: 700 }}>{companyName}</span>
              </div>
              <E tag="h1" text={content.headline} editable={editable} onUpdate={(v) => up("headline", v)}
                style={{
                  fontSize: "30px", fontWeight: f.headingWeight, lineHeight: 1.2,
                  margin: "0 0 10px 0", letterSpacing: "-0.5px", maxWidth: "500px",
                }} />
              <E tag="p" text={content.subheadline} editable={editable} onUpdate={(v) => up("subheadline", v)}
                style={{ fontSize: "15px", color: colors.textLight, margin: 0, lineHeight: 1.6, maxWidth: "450px" }} />
            </div>
            <E tag="div" text={content.contactBlock} editable={editable} onUpdate={(v) => up("contactBlock", v)}
              style={{ fontSize: "11px", color: colors.textLight, textAlign: "right", lineHeight: 1.7 }} />
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: `linear-gradient(90deg, ${colors.primary}, transparent)`, marginBottom: "28px" }} />

          {/* Sections */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
            {content.sections.map((sec, i) => {
              const Icon = ICON_MAP[sec.icon || "zap"] || Zap;
              return (
                <div key={i} style={{
                  padding: "20px", borderRadius: "12px", background: colors.backgroundAlt,
                  border: `1px solid ${colors.border}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <Icon size={15} color={colors.primary} strokeWidth={2.5} />
                    <E tag="h3" text={sec.title} editable={editable} onUpdate={(v) => upSec(i, "title", v)}
                      style={{ fontSize: "13px", fontWeight: 700, margin: 0, color: colors.primary }} />
                  </div>
                  <E tag="p" text={sec.content} editable={editable} onUpdate={(v) => upSec(i, "content", v)}
                    style={{ fontSize: "12.5px", color: colors.textLight, lineHeight: 1.65, margin: 0 }} />
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: colors.textInverse, padding: "22px 28px", borderRadius: "10px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <E tag="div" text={content.callToAction} editable={editable} onUpdate={(v) => up("callToAction", v)}
              style={{ fontSize: "15px", fontWeight: 700 }} />
            <div style={{ fontSize: "12px", fontWeight: 600 }}>{companyName} →</div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     SPLIT METRICS — Numbers-forward traction layout
  ═══════════════════════════════════════════════════════ */
  return (
    <div id="onepager-export" style={{ ...PAGE, background: colors.background, color: colors.text, fontFamily: f.body }}>
      {/* Top header */}
      <div style={{ padding: "40px 52px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "10px", background: colors.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "17px", fontWeight: 800, color: colors.textInverse,
          }}>
            {companyName.charAt(0)}
          </div>
          <span style={{ fontSize: "16px", fontWeight: 700 }}>{companyName}</span>
        </div>
        <E tag="div" text={content.contactBlock} editable={editable} onUpdate={(v) => up("contactBlock", v)}
          style={{ fontSize: "11px", color: colors.textLight, textAlign: "right", lineHeight: 1.6 }} />
      </div>

      {/* Hero area with metrics */}
      <div style={{ padding: "28px 52px 32px" }}>
        <E tag="h1" text={content.headline} editable={editable} onUpdate={(v) => up("headline", v)}
          style={{
            fontSize: "28px", fontWeight: f.headingWeight, lineHeight: 1.25,
            margin: "0 0 10px 0", letterSpacing: "-0.5px",
          }} />
        <E tag="p" text={content.subheadline} editable={editable} onUpdate={(v) => up("subheadline", v)}
          style={{ fontSize: "15px", color: colors.textLight, margin: "0 0 24px 0", lineHeight: 1.5, maxWidth: "550px" }} />

        {/* Metrics strip */}
        <div style={{
          display: "grid", gridTemplateColumns: `repeat(${Math.min(content.sections.length, 4)}, 1fr)`,
          gap: "2px", background: colors.border, borderRadius: "12px", overflow: "hidden", marginBottom: "24px",
        }}>
          {content.sections.slice(0, 4).map((sec, i) => (
            <div key={i} style={{ background: colors.backgroundAlt, padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", color: colors.primary, fontWeight: 600, marginBottom: "4px" }}>
                {sec.title}
              </div>
              <div style={{ fontSize: "12px", color: colors.textLight, lineHeight: 1.5 }}>
                {sec.content.substring(0, 60)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed sections */}
      <div style={{ padding: "0 52px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          {content.sections.slice(Math.min(content.sections.length, 4) > 3 ? 4 : 0).map((sec, i) => {
            const Icon = ICON_MAP[sec.icon || "zap"] || Zap;
            return (
              <div key={i} style={{
                padding: "18px 20px", borderRadius: "10px",
                border: `1px solid ${colors.border}`, background: colors.background,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "7px", background: colors.primaryLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={14} color={colors.primary} strokeWidth={2.5} />
                  </div>
                  <E tag="h3" text={sec.title} editable={editable} onUpdate={(v) => upSec(i + (Math.min(content.sections.length, 4) > 3 ? 4 : 0), "title", v)}
                    style={{ fontSize: "13px", fontWeight: 700, margin: 0 }} />
                </div>
                <E tag="p" text={sec.content} editable={editable} onUpdate={(v) => upSec(i + (Math.min(content.sections.length, 4) > 3 ? 4 : 0), "content", v)}
                  style={{ fontSize: "12px", color: colors.textLight, lineHeight: 1.65, margin: 0 }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          background: colors.primary, color: colors.textInverse, padding: "20px 28px", borderRadius: "10px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <E tag="div" text={content.callToAction} editable={editable} onUpdate={(v) => up("callToAction", v)}
            style={{ fontSize: "15px", fontWeight: 700 }} />
          <TrendingUp size={20} color={colors.textInverse} />
        </div>
      </div>
    </div>
  );
}
