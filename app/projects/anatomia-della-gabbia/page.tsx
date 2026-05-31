import type { Metadata } from "next";
import AnatomiaGabbia from "@/components/projects/AnatomiaGabbia";
import { getProject } from "@/lib/projects";

const project = getProject("anatomia-della-gabbia")!;

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
  return <AnatomiaGabbia />;
}
