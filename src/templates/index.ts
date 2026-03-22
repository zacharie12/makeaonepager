export interface TemplateStyle {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: "startup" | "corporate" | "creative" | "minimal";
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundAlt: string;
    text: string;
    textLight: string;
    textInverse: string;
    border: string;
  };
  layout: "yc-classic" | "stripe-modern" | "notion-minimal" | "bold-hero" | "sidebar-pro" | "gradient-glass" | "dark-elite" | "split-metrics";
  fontPairing: {
    heading: string;
    body: string;
    headingWeight: number;
    bodyWeight: number;
  };
}

export const TEMPLATES: TemplateStyle[] = [
  {
    id: "yc-classic",
    name: "YC Classic",
    description: "The proven Y Combinator one-pager format that raised billions",
    thumbnail: "🚀",
    category: "startup",
    colors: {
      primary: "#FF6600",
      primaryLight: "#FF660018",
      secondary: "#1a1a2e",
      accent: "#FF8533",
      background: "#ffffff",
      backgroundAlt: "#FAFAF8",
      text: "#1a1a2e",
      textLight: "#6b7280",
      textInverse: "#ffffff",
      border: "#e5e5e5",
    },
    layout: "yc-classic",
    fontPairing: { heading: "'Georgia', serif", body: "'Inter', sans-serif", headingWeight: 700, bodyWeight: 400 },
  },
  {
    id: "stripe-modern",
    name: "Stripe Modern",
    description: "Clean, polished design inspired by Stripe's legendary branding",
    thumbnail: "💳",
    category: "corporate",
    colors: {
      primary: "#635BFF",
      primaryLight: "#635BFF12",
      secondary: "#0A2540",
      accent: "#80E9FF",
      background: "#ffffff",
      backgroundAlt: "#F6F9FC",
      text: "#0A2540",
      textLight: "#425466",
      textInverse: "#ffffff",
      border: "#E3E8EE",
    },
    layout: "stripe-modern",
    fontPairing: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif", headingWeight: 800, bodyWeight: 400 },
  },
  {
    id: "notion-minimal",
    name: "Notion Minimal",
    description: "Elegant simplicity with perfect typography and whitespace",
    thumbnail: "✏️",
    category: "minimal",
    colors: {
      primary: "#2F3437",
      primaryLight: "#2F343710",
      secondary: "#37352F",
      accent: "#EB5757",
      background: "#ffffff",
      backgroundAlt: "#FBFBFA",
      text: "#37352F",
      textLight: "#9B9A97",
      textInverse: "#ffffff",
      border: "#E9E9E7",
    },
    layout: "notion-minimal",
    fontPairing: { heading: "'Georgia', serif", body: "'Inter', sans-serif", headingWeight: 700, bodyWeight: 400 },
  },
  {
    id: "bold-hero",
    name: "Bold Founder",
    description: "High-impact design that commands attention — for ambitious startups",
    thumbnail: "⚡",
    category: "startup",
    colors: {
      primary: "#000000",
      primaryLight: "#00000008",
      secondary: "#111827",
      accent: "#3B82F6",
      background: "#ffffff",
      backgroundAlt: "#F9FAFB",
      text: "#111827",
      textLight: "#6B7280",
      textInverse: "#ffffff",
      border: "#E5E7EB",
    },
    layout: "bold-hero",
    fontPairing: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif", headingWeight: 900, bodyWeight: 400 },
  },
  {
    id: "sidebar-pro",
    name: "Investor Deck",
    description: "Structured sidebar layout perfect for data-heavy pitches",
    thumbnail: "📊",
    category: "corporate",
    colors: {
      primary: "#1E40AF",
      primaryLight: "#1E40AF10",
      secondary: "#1E3A5F",
      accent: "#3B82F6",
      background: "#ffffff",
      backgroundAlt: "#F0F4FF",
      text: "#1E293B",
      textLight: "#64748B",
      textInverse: "#ffffff",
      border: "#DBEAFE",
    },
    layout: "sidebar-pro",
    fontPairing: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif", headingWeight: 700, bodyWeight: 400 },
  },
  {
    id: "gradient-glass",
    name: "Glass Premium",
    description: "Modern glassmorphism with beautiful gradients",
    thumbnail: "🔮",
    category: "creative",
    colors: {
      primary: "#7C3AED",
      primaryLight: "#7C3AED12",
      secondary: "#4F46E5",
      accent: "#A78BFA",
      background: "#FAF5FF",
      backgroundAlt: "#F3E8FF",
      text: "#1E1B4B",
      textLight: "#6D6B7F",
      textInverse: "#ffffff",
      border: "#E9D5FF",
    },
    layout: "gradient-glass",
    fontPairing: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif", headingWeight: 800, bodyWeight: 400 },
  },
  {
    id: "dark-elite",
    name: "Dark Elite",
    description: "Sophisticated dark theme for premium and fintech brands",
    thumbnail: "🌙",
    category: "creative",
    colors: {
      primary: "#F59E0B",
      primaryLight: "#F59E0B15",
      secondary: "#D97706",
      accent: "#FBBF24",
      background: "#0F172A",
      backgroundAlt: "#1E293B",
      text: "#F1F5F9",
      textLight: "#94A3B8",
      textInverse: "#0F172A",
      border: "#334155",
    },
    layout: "dark-elite",
    fontPairing: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif", headingWeight: 700, bodyWeight: 400 },
  },
  {
    id: "split-metrics",
    name: "Metrics First",
    description: "Numbers-forward layout that lets your traction speak",
    thumbnail: "📈",
    category: "startup",
    colors: {
      primary: "#059669",
      primaryLight: "#05966912",
      secondary: "#064E3B",
      accent: "#10B981",
      background: "#ffffff",
      backgroundAlt: "#F0FDF4",
      text: "#1E293B",
      textLight: "#64748B",
      textInverse: "#ffffff",
      border: "#D1FAE5",
    },
    layout: "split-metrics",
    fontPairing: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif", headingWeight: 800, bodyWeight: 400 },
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
