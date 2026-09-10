import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rainbow — Two in the Rain | Creative Agency & IT Company",
  description:
    "Rainbow is a full-spectrum creative agency and IT company. We transform digital experiences under the rainbow — web, mobile, AI, cloud, and beyond.",
  keywords: [
    "creative agency",
    "IT company",
    "web development",
    "AI solutions",
    "UI/UX design",
    "Rainbow agency",
  ],
  authors: [{ name: "Rainbow Agency" }],
  openGraph: {
    title: "Rainbow — Two in the Rain",
    description: "Full-spectrum creative agency & IT company",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rainbow — Two in the Rain",
    description: "Full-spectrum creative agency & IT company",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-body bg-[#020617] text-slate-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
