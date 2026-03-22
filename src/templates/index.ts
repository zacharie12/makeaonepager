export interface TemplateStyle {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
  };
  layout: "classic" | "modern" | "bold" | "minimal" | "split" | "gradient";
  fontPairing: {
    heading: string;
    body: string;
  };
}

export const TEMPLATES: TemplateStyle[] = [
  {
    id: "startup-classic",
    name: "Startup Classic",
    description: "Clean, professional layout inspired by YC one-pagers",
    thumbnail: "🚀",
    colors: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#3b82f6",
      background: "#ffffff",
      text: "#1e293b",
      textLight: "#64748b",
    },
    layout: "classic",
    fontPairing: { heading: "Inter", body: "Inter" },
  },
  {
    id: "modern-gradient",
    name: "Modern Gradient",
    description: "Bold gradients with a contemporary feel",
    thumbnail: "🎨",
    colors: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      accent: "#c084fc",
      background: "#faf5ff",
      text: "#1e1b4b",
      textLight: "#6b7280",
    },
    layout: "gradient",
    fontPairing: { heading: "Inter", body: "Inter" },
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Less is more — elegant whitespace and typography",
    thumbnail: "✨",
    colors: {
      primary: "#18181b",
      secondary: "#3f3f46",
      accent: "#a1a1aa",
      background: "#ffffff",
      text: "#18181b",
      textLight: "#71717a",
    },
    layout: "minimal",
    fontPairing: { heading: "Inter", body: "Inter" },
  },
  {
    id: "bold-impact",
    name: "Bold Impact",
    description: "High-contrast design that commands attention",
    thumbnail: "⚡",
    colors: {
      primary: "#dc2626",
      secondary: "#991b1b",
      accent: "#f87171",
      background: "#ffffff",
      text: "#1e293b",
      textLight: "#64748b",
    },
    layout: "bold",
    fontPairing: { heading: "Inter", body: "Inter" },
  },
  {
    id: "corporate-split",
    name: "Corporate Split",
    description: "Split-layout perfect for data-heavy one-pagers",
    thumbnail: "📊",
    colors: {
      primary: "#0f766e",
      secondary: "#134e4a",
      accent: "#14b8a6",
      background: "#ffffff",
      text: "#1e293b",
      textLight: "#64748b",
    },
    layout: "split",
    fontPairing: { heading: "Inter", body: "Inter" },
  },
  {
    id: "dark-premium",
    name: "Dark Premium",
    description: "Sophisticated dark theme for premium brands",
    thumbnail: "🌙",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      accent: "#fbbf24",
      background: "#0f172a",
      text: "#f1f5f9",
      textLight: "#94a3b8",
    },
    layout: "modern",
    fontPairing: { heading: "Inter", body: "Inter" },
  },
  {
    id: "nature-fresh",
    name: "Nature Fresh",
    description: "Earthy tones for sustainability and wellness brands",
    thumbnail: "🌿",
    colors: {
      primary: "#16a34a",
      secondary: "#15803d",
      accent: "#4ade80",
      background: "#f0fdf4",
      text: "#1e293b",
      textLight: "#64748b",
    },
    layout: "classic",
    fontPairing: { heading: "Inter", body: "Inter" },
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Calming blues for finance and healthcare",
    thumbnail: "🌊",
    colors: {
      primary: "#0284c7",
      secondary: "#0369a1",
      accent: "#38bdf8",
      background: "#f0f9ff",
      text: "#1e293b",
      textLight: "#64748b",
    },
    layout: "gradient",
    fontPairing: { heading: "Inter", body: "Inter" },
  },
];

export const ONE_PAGER_TYPES = [
  {
    id: "investor-pitch",
    name: "Investor Pitch",
    description: "A compelling one-pager to send to VCs and angel investors",
    icon: "rocket",
    popular: true,
  },
  {
    id: "company-overview",
    name: "Company Overview",
    description: "Professional overview for partnerships and clients",
    icon: "briefcase",
    popular: true,
  },
  {
    id: "product-sheet",
    name: "Product Sheet",
    description: "Showcase your product's features and benefits",
    icon: "zap",
    popular: true,
  },
  {
    id: "personal-brand",
    name: "Personal Brand",
    description: "Stand out with a professional personal one-pager",
    icon: "users",
    popular: false,
  },
  {
    id: "case-study",
    name: "Case Study",
    description: "Highlight client success stories with impact",
    icon: "award",
    popular: false,
  },
  {
    id: "event-summary",
    name: "Event Summary",
    description: "Promote or summarize events professionally",
    icon: "globe",
    popular: false,
  },
  {
    id: "project-proposal",
    name: "Project Proposal",
    description: "Win projects with a persuasive proposal",
    icon: "target",
    popular: false,
  },
  {
    id: "nonprofit-grant",
    name: "Nonprofit / Grant",
    description: "Tell your nonprofit's story and request funding",
    icon: "heart",
    popular: false,
  },
  {
    id: "real-estate",
    name: "Real Estate Listing",
    description: "Beautiful property listing sheets",
    icon: "shield",
    popular: false,
  },
  {
    id: "sales-sheet",
    name: "Sales Sheet",
    description: "Arm your sales team with a powerful leave-behind",
    icon: "chart",
    popular: false,
  },
];
