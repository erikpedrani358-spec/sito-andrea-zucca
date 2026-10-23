import type { Metadata } from "next";
import FashionTalents from "@/components/projects/FashionTalents";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  projectCreativeWorkJsonLd,
  projectMetadata,
} from "@/lib/seo";

export const metadata: Metadata = projectMetadata("fashion-talents");

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          projectCreativeWorkJsonLd("fashion-talents"),
          breadcrumbJsonLd("fashion-talents"),
        ]}
      />
      <FashionTalents />
    </>
  );
}
