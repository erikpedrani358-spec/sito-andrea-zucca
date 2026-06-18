import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { baseMetadata } from "@/lib/seo";
import ClientChrome from "@/components/layout/ClientChrome";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = baseMetadata();

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
        <Navbar />
        <ClientChrome>{children}</ClientChrome>
      </body>
    </html>
  );
}
