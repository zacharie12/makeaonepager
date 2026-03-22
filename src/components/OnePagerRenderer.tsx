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
} from "lucide-react";
import type { TemplateStyle } from "@/templates";
import type { OnePagerContent } from "@/lib/openai";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
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
};

interface Props {
  content: OnePagerContent;
  template: TemplateStyle;
  editable?: boolean;
  onContentChange?: (content: OnePagerContent) => void;
  companyName: string;
}

function EditableText({
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
  if (!editable) {
    return <Tag className={className} style={style}>{text}</Tag>;
  }

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

export default function OnePagerRenderer({
  content,
  template,
  editable = false,
  onContentChange,
  companyName,
}: Props) {
  const { colors, layout } = template;
  const isDark = colors.background.startsWith("#0") || colors.background.startsWith("#1");

  const updateSection = (index: number, field: "title" | "content", value: string) => {
    if (!onContentChange) return;
    const newSections = [...content.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    onContentChange({ ...content, sections: newSections });
  };

  // Classic Layout
  if (layout === "classic" || layout === "modern") {
    return (
      <div
        id="onepager-export"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: template.fontPairing.body,
          width: "794px",
          minHeight: "1123px",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "32px", borderBottom: `3px solid ${colors.primary}`, paddingBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: colors.primary,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "8px",
                }}
              >
                {companyName}
              </div>
              <EditableText
                tag="h1"
                text={content.headline}
                editable={editable}
                onUpdate={(v) => onContentChange?.({ ...content, headline: v })}
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: colors.text,
                  lineHeight: 1.2,
                  margin: 0,
                  maxWidth: "500px",
                }}
              />
              <EditableText
                tag="p"
                text={content.subheadline}
                editable={editable}
                onUpdate={(v) => onContentChange?.({ ...content, subheadline: v })}
                style={{
                  fontSize: "16px",
                  color: colors.textLight,
                  marginTop: "8px",
                  lineHeight: 1.5,
                }}
              />
            </div>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                color: "#fff",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {companyName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {content.sections.map((section, i) => {
            const IconComponent = ICON_MAP[section.icon || "zap"] || Zap;
            return (
              <div
                key={i}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: isDark ? `${colors.primary}15` : `${colors.primary}08`,
                  border: `1px solid ${colors.primary}20`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: `${colors.primary}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent size={18} color={colors.primary} />
                  </div>
                  <EditableText
                    tag="h3"
                    text={section.title}
                    editable={editable}
                    onUpdate={(v) => updateSection(i, "title", v)}
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: colors.text,
                      margin: 0,
                    }}
                  />
                </div>
                <EditableText
                  tag="p"
                  text={section.content}
                  editable={editable}
                  onUpdate={(v) => updateSection(i, "content", v)}
                  style={{
                    fontSize: "13px",
                    color: colors.textLight,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA & Contact */}
        <div
          style={{
            background: colors.primary,
            color: "#ffffff",
            padding: "24px 32px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EditableText
            tag="div"
            text={content.callToAction}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, callToAction: v })}
            style={{ fontSize: "16px", fontWeight: 700 }}
          />
          <EditableText
            tag="div"
            text={content.contactBlock}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, contactBlock: v })}
            style={{ fontSize: "13px", textAlign: "right", opacity: 0.9 }}
          />
        </div>
      </div>
    );
  }

  // Bold Layout
  if (layout === "bold") {
    return (
      <div
        id="onepager-export"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: template.fontPairing.body,
          width: "794px",
          minHeight: "1123px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Bold Header */}
        <div
          style={{
            background: colors.primary,
            color: "#ffffff",
            padding: "48px",
            paddingBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              opacity: 0.8,
              marginBottom: "12px",
            }}
          >
            {companyName}
          </div>
          <EditableText
            tag="h1"
            text={content.headline}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, headline: v })}
            style={{
              fontSize: "32px",
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "12px",
            }}
          />
          <EditableText
            tag="p"
            text={content.subheadline}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, subheadline: v })}
            style={{ fontSize: "16px", opacity: 0.85, margin: 0 }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "40px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "36px" }}>
            {content.sections.map((section, i) => {
              const IconComponent = ICON_MAP[section.icon || "zap"] || Zap;
              return (
                <div key={i} style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <IconComponent size={18} color={colors.primary} />
                    <EditableText
                      tag="h3"
                      text={section.title}
                      editable={editable}
                      onUpdate={(v) => updateSection(i, "title", v)}
                      style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}
                    />
                  </div>
                  <EditableText
                    tag="p"
                    text={section.content}
                    editable={editable}
                    onUpdate={(v) => updateSection(i, "content", v)}
                    style={{ fontSize: "13px", color: colors.textLight, lineHeight: 1.6, margin: 0 }}
                  />
                </div>
              );
            })}
          </div>

          <div
            style={{
              background: `${colors.primary}10`,
              border: `2px solid ${colors.primary}`,
              borderRadius: "12px",
              padding: "24px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EditableText
              tag="div"
              text={content.callToAction}
              editable={editable}
              onUpdate={(v) => onContentChange?.({ ...content, callToAction: v })}
              style={{ fontSize: "16px", fontWeight: 700, color: colors.primary }}
            />
            <EditableText
              tag="div"
              text={content.contactBlock}
              editable={editable}
              onUpdate={(v) => onContentChange?.({ ...content, contactBlock: v })}
              style={{ fontSize: "13px", color: colors.textLight, textAlign: "right" }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Gradient Layout
  if (layout === "gradient") {
    return (
      <div
        id="onepager-export"
        style={{
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primary}10 100%)`,
          color: colors.text,
          fontFamily: template.fontPairing.body,
          width: "794px",
          minHeight: "1123px",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `${colors.primary}10`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "-40px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: `${colors.secondary}10`,
          }}
        />

        {/* Header */}
        <div style={{ position: "relative", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "20px",
              background: `${colors.primary}15`,
              color: colors.primary,
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            {companyName}
          </div>
          <EditableText
            tag="h1"
            text={content.headline}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, headline: v })}
            style={{
              fontSize: "30px",
              fontWeight: 800,
              lineHeight: 1.2,
              margin: 0,
              marginBottom: "10px",
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            } as React.CSSProperties}
          />
          <EditableText
            tag="p"
            text={content.subheadline}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, subheadline: v })}
            style={{ fontSize: "16px", color: colors.textLight, margin: 0 }}
          />
        </div>

        {/* Sections */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px", position: "relative" }}>
          {content.sections.map((section, i) => {
            const IconComponent = ICON_MAP[section.icon || "zap"] || Zap;
            return (
              <div
                key={i}
                style={{
                  padding: "22px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent size={18} color="#fff" />
                  </div>
                  <EditableText
                    tag="h3"
                    text={section.title}
                    editable={editable}
                    onUpdate={(v) => updateSection(i, "title", v)}
                    style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}
                  />
                </div>
                <EditableText
                  tag="p"
                  text={section.content}
                  editable={editable}
                  onUpdate={(v) => updateSection(i, "content", v)}
                  style={{ fontSize: "13px", color: colors.textLight, lineHeight: 1.6, margin: 0 }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: "#fff",
            padding: "24px 32px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <EditableText
            tag="div"
            text={content.callToAction}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, callToAction: v })}
            style={{ fontSize: "16px", fontWeight: 700 }}
          />
          <EditableText
            tag="div"
            text={content.contactBlock}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, contactBlock: v })}
            style={{ fontSize: "13px", textAlign: "right", opacity: 0.9 }}
          />
        </div>
      </div>
    );
  }

  // Minimal Layout
  if (layout === "minimal") {
    return (
      <div
        id="onepager-export"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: template.fontPairing.body,
          width: "794px",
          minHeight: "1123px",
          padding: "64px",
          position: "relative",
        }}
      >
        {/* Minimal Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "13px", color: colors.textLight, marginBottom: "20px", letterSpacing: "1px" }}>
            {companyName.toUpperCase()}
          </div>
          <EditableText
            tag="h1"
            text={content.headline}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, headline: v })}
            style={{
              fontSize: "36px",
              fontWeight: 300,
              lineHeight: 1.3,
              margin: 0,
              marginBottom: "12px",
            }}
          />
          <EditableText
            tag="p"
            text={content.subheadline}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, subheadline: v })}
            style={{ fontSize: "16px", color: colors.textLight, margin: 0 }}
          />
          <div style={{ width: "40px", height: "2px", background: colors.text, marginTop: "24px" }} />
        </div>

        {/* Sections - single column */}
        <div style={{ marginBottom: "48px" }}>
          {content.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: "32px" }}>
              <EditableText
                tag="h3"
                text={section.title}
                editable={editable}
                onUpdate={(v) => updateSection(i, "title", v)}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: colors.textLight,
                  margin: 0,
                  marginBottom: "8px",
                }}
              />
              <EditableText
                tag="p"
                text={section.content}
                editable={editable}
                onUpdate={(v) => updateSection(i, "content", v)}
                style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${colors.accent}`, paddingTop: "24px", display: "flex", justifyContent: "space-between" }}>
          <EditableText
            tag="div"
            text={content.callToAction}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, callToAction: v })}
            style={{ fontSize: "14px", fontWeight: 500 }}
          />
          <EditableText
            tag="div"
            text={content.contactBlock}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, contactBlock: v })}
            style={{ fontSize: "13px", color: colors.textLight, textAlign: "right" }}
          />
        </div>
      </div>
    );
  }

  // Split Layout
  return (
    <div
      id="onepager-export"
      style={{
        background: colors.background,
        color: colors.text,
        fontFamily: template.fontPairing.body,
        width: "794px",
        minHeight: "1123px",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "280px",
          background: colors.primary,
          color: "#ffffff",
          padding: "48px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 800,
              marginBottom: "24px",
            }}
          >
            {companyName.charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
            {companyName}
          </div>
          <EditableText
            tag="p"
            text={content.subheadline}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, subheadline: v })}
            style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.6, margin: 0 }}
          />
        </div>

        <div>
          <EditableText
            tag="div"
            text={content.callToAction}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, callToAction: v })}
            style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}
          />
          <EditableText
            tag="div"
            text={content.contactBlock}
            editable={editable}
            onUpdate={(v) => onContentChange?.({ ...content, contactBlock: v })}
            style={{ fontSize: "12px", opacity: 0.8, lineHeight: 1.8 }}
          />
        </div>
      </div>

      {/* Right Content */}
      <div style={{ flex: 1, padding: "48px 40px" }}>
        <EditableText
          tag="h1"
          text={content.headline}
          editable={editable}
          onUpdate={(v) => onContentChange?.({ ...content, headline: v })}
          style={{
            fontSize: "26px",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: 0,
            marginBottom: "32px",
            color: colors.text,
          }}
        />

        {content.sections.map((section, i) => {
          const IconComponent = ICON_MAP[section.icon || "zap"] || Zap;
          return (
            <div key={i} style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <IconComponent size={16} color={colors.primary} />
                <EditableText
                  tag="h3"
                  text={section.title}
                  editable={editable}
                  onUpdate={(v) => updateSection(i, "title", v)}
                  style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: colors.primary }}
                />
              </div>
              <EditableText
                tag="p"
                text={section.content}
                editable={editable}
                onUpdate={(v) => updateSection(i, "content", v)}
                style={{ fontSize: "13px", color: colors.textLight, lineHeight: 1.6, margin: 0, paddingLeft: "24px" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
