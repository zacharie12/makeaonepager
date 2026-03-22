import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

// ─── Model Configuration ───────────────────────────────────
// Switch AI_PROVIDER to change the model used for content generation.
// "gemini"  → Free tier, great for testing (Gemini 2.0 Flash)
// "openai"  → Paid, higher quality for production (GPT-4o-mini or GPT-4o)

export type AIProvider = "gemini" | "openai";

const AI_PROVIDER: AIProvider = (process.env.AI_PROVIDER as AIProvider) || "gemini";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// ─── Types ──────────────────────────────────────────────────

export interface OnePagerInput {
  type: string;
  companyName: string;
  tagline?: string;
  description: string;
  industry?: string;
  targetAudience?: string;
  keyMetrics?: string;
  teamInfo?: string;
  contactInfo?: string;
  additionalInfo?: string;
}

export interface OnePagerContent {
  headline: string;
  subheadline: string;
  sections: {
    title: string;
    content: string;
    icon?: string;
  }[];
  callToAction: string;
  contactBlock: string;
}

// ─── Prompts per one-pager type ─────────────────────────────

const TYPE_PROMPTS: Record<string, string> = {
  "investor-pitch": `You are an expert startup pitch writer who has helped YC companies raise millions.
Create a compelling investor one-pager that makes VCs want to take a meeting.
Structure: Problem → Solution → Market Size → Traction/Metrics → Team → Ask.
Use punchy, confident language. Lead with the most impressive metric or insight.`,

  "company-overview": `You are a top business communications consultant.
Create a professional company overview one-pager for partnerships and clients.
Structure: What We Do → Our Approach → Key Services/Products → Results/Impact → Why Choose Us.
Use clear, professional language that builds trust and credibility.`,

  "product-sheet": `You are a product marketing expert at a top SaaS company.
Create a compelling product sheet one-pager that drives conversions.
Structure: Product Name & Value Prop → Key Features (3-4) → How It Works → Pricing/Plans → CTA.
Use benefit-driven language, not feature lists.`,

  "personal-brand": `You are a personal branding expert who works with executives and founders.
Create a powerful personal brand one-pager.
Structure: Name & Title → Professional Summary → Key Achievements → Expertise Areas → Contact.
Use confident but authentic language.`,

  "case-study": `You are a content strategist specializing in B2B case studies.
Create a compelling case study one-pager.
Structure: Client & Challenge → Solution → Implementation → Results (with numbers) → Testimonial.
Lead with the most impressive result.`,

  "event-summary": `You are an event marketing specialist.
Create a professional event summary one-pager.
Structure: Event Name & Date → Purpose → Key Highlights → Speaker/Attendee Info → Next Steps.
Make it feel exciting and worth attending.`,

  "project-proposal": `You are a management consultant who writes winning proposals.
Create a persuasive project proposal one-pager.
Structure: Project Overview → Objectives → Approach → Timeline → Budget → Expected ROI.
Focus on value delivered, not just activities.`,

  "nonprofit-grant": `You are a grant writing expert for nonprofit organizations.
Create a compelling nonprofit/grant summary one-pager.
Structure: Mission → The Problem → Our Solution → Impact (with data) → Funding Request → How to Help.
Use emotional storytelling backed by data.`,

  "real-estate": `You are a luxury real estate marketing specialist.
Create a stunning real estate listing one-pager.
Structure: Property Headline → Key Details (beds/baths/sqft) → Description → Features → Location Highlights → Price & Contact.
Make the property feel aspirational.`,

  "sales-sheet": `You are a top sales enablement specialist.
Create a powerful sales one-pager that helps close deals.
Structure: Value Proposition → Pain Points We Solve → Key Benefits → Social Proof → Pricing → CTA.
Use persuasive, action-oriented language.`,
};

// ─── Shared prompt builder ──────────────────────────────────

function buildUserPrompt(input: OnePagerInput): string {
  return `Create a one-pager with the following information:
Company/Person Name: ${input.companyName}
${input.tagline ? `Tagline: ${input.tagline}` : ""}
Description: ${input.description}
${input.industry ? `Industry: ${input.industry}` : ""}
${input.targetAudience ? `Target Audience: ${input.targetAudience}` : ""}
${input.keyMetrics ? `Key Metrics/Numbers: ${input.keyMetrics}` : ""}
${input.teamInfo ? `Team: ${input.teamInfo}` : ""}
${input.contactInfo ? `Contact: ${input.contactInfo}` : ""}
${input.additionalInfo ? `Additional Info: ${input.additionalInfo}` : ""}

Return ONLY valid JSON in this exact format (no markdown, no code blocks, no \`\`\`):
{
  "headline": "A powerful, attention-grabbing headline",
  "subheadline": "A supporting subheadline that adds context",
  "sections": [
    {
      "title": "Section Title",
      "content": "Section content - keep each section to 2-3 concise sentences max",
      "icon": "one of: target, rocket, users, chart, shield, zap, globe, award, briefcase, heart"
    }
  ],
  "callToAction": "A compelling call to action",
  "contactBlock": "Formatted contact information"
}

Create 4-6 sections. Each section should be concise and impactful. Use the most relevant icon for each section.
IMPORTANT: Return ONLY the JSON object, nothing else.`;
}

function parseResponse(text: string): OnePagerContent {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Strip markdown code fences if present
    const cleaned = text.replace(/```json?\s*/g, "").replace(/```\s*/g, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      // Last resort: extract JSON object
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
      throw new Error("Failed to parse AI response as JSON");
    }
  }
}

// ─── Gemini (FREE) ──────────────────────────────────────────

async function generateWithGemini(input: OnePagerInput): Promise<OnePagerContent> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const systemPrompt = TYPE_PROMPTS[input.type] || TYPE_PROMPTS["company-overview"];

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [{ role: "user", parts: [{ text: buildUserPrompt(input) }] }],
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.7,
      maxOutputTokens: 2000,
    },
  });

  const text = response.text || "";
  return parseResponse(text);
}

// ─── OpenAI (PAID) ──────────────────────────────────────────

async function generateWithOpenAI(input: OnePagerInput): Promise<OnePagerContent> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const systemPrompt = TYPE_PROMPTS[input.type] || TYPE_PROMPTS["company-overview"];

  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: buildUserPrompt(input) },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const text = response.choices[0]?.message?.content || "";
  return parseResponse(text);
}

// ─── Main export ────────────────────────────────────────────

export async function generateOnePagerContent(input: OnePagerInput): Promise<OnePagerContent> {
  if (AI_PROVIDER === "gemini") {
    return generateWithGemini(input);
  }
  return generateWithOpenAI(input);
}

export function getCurrentModel(): { provider: AIProvider; model: string } {
  return {
    provider: AI_PROVIDER,
    model: AI_PROVIDER === "gemini" ? GEMINI_MODEL : OPENAI_MODEL,
  };
}
