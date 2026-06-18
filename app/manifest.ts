import type { MetadataRoute } from "next";
import { SITE, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    lang: "en",
    orientation: "portrait-primary",
    categories: ["fashion", "design", "portfolio"],
    id: SITE_URL,
  };
}
