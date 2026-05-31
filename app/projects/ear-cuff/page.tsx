import type { Metadata } from "next";
import EarCuff from "@/components/projects/EarCuff";
import { getProject } from "@/lib/projects";

const project = getProject("ear-cuff")!;

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
  return <EarCuff />;
}
