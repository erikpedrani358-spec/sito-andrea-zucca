import {
  Inter,
  Cormorant_Garamond,
  Anton,
  Pinyon_Script,
  Space_Mono,
} from "next/font/google";

/**
 * Typographic system — only critical faces are preloaded (Inter + Anton).
 * Weights trimmed to what the site actually uses.
 */

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
  preload: false,
});

export const mono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const fontVariables = [
  inter.variable,
  cormorant.variable,
  anton.variable,
  script.variable,
  mono.variable,
].join(" ");
