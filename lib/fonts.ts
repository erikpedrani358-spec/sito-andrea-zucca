import {
  Inter,
  Cormorant_Garamond,
  Anton,
  Pinyon_Script,
  Space_Mono,
} from "next/font/google";

/**
 * Typographic system.
 * - Inter        → UI / navigation / body
 * - Cormorant    → elegant editorial serif (refined headings, Ear Cuff)
 * - Anton        → industrial condensed display (distressed titles base)
 * - Pinyon Script→ the "Andrea Zucca" cursive logotype
 * - Space Mono   → technical readouts (GPS coordinates, labels, indices)
 */

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = [
  inter.variable,
  cormorant.variable,
  anton.variable,
  script.variable,
  mono.variable,
].join(" ");
