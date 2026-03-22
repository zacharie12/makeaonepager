import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MakeAOnePager — Create Beautiful One-Pagers in Seconds",
  description:
    "AI-powered one-pager generator. Create stunning investor pitches, company overviews, product sheets and more with professional templates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
