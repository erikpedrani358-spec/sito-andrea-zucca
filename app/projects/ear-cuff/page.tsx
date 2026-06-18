import type { Metadata } from "next";
import EarCuff from "@/components/projects/EarCuff";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  projectCreativeWorkJsonLd,
  projectMetadata,
} from "@/lib/seo";

export const metadata: Metadata = projectMetadata("ear-cuff");

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          projectCreativeWorkJsonLd("ear-cuff"),
          breadcrumbJsonLd("ear-cuff"),
        ]}
      />
      <EarCuff />
    </>
  );
}
