import type { Metadata } from "next";
import SenzaLimiti from "@/components/projects/SenzaLimiti";
import { getProject } from "@/lib/projects";

const project = getProject("senza-limiti")!;

export const metadata: Metadata = {
  title: `${project.title} — ${project.subtitle}`,
  description: project.teaser,
  openGraph: {
    title: `${project.title} — Andrea Zucca`,
    description: project.teaser,
    images: [{ url: project.cover }],
  },
};

export default function Page() {
  return <SenzaLimiti />;
}
