import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Grain from "@/components/ui/Grain";
import SvgFilters from "@/components/ui/SvgFilters";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/ui/Preloader";

const SITE_URL = "https://andreazucca.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Andrea Zucca — Wearable Anatomy & Restraint",
    template: "%s — Andrea Zucca",
  },
  description:
    "Andrea Zucca is a Milan-based fashion designer exploring the body as architecture, anatomy and protest. Dark, industrial, brutalist collections.",
  keywords: [
    "Andrea Zucca",
    "fashion designer",
    "Milano",
    "Senza Limiti",
    "Anatomia della Gabbia",
    "Ear Cuff",
    "avant-garde fashion",
    "brutalist fashion",
  ],
  authors: [{ name: "Andrea Zucca" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Andrea Zucca",
    title: "Andrea Zucca — Wearable Anatomy & Restraint",
    description:
      "Dark, industrial, brutalist fashion. Exposure, restraint and physical presence.",
    images: [{ url: "/assets/projects/senza-limiti/02.jpg", width: 1200, height: 1600 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea Zucca",
    description: "Wearable anatomy & restraint. Milano.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-ink antialiased">
        <Preloader />
        <SvgFilters />
        <Grain />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
