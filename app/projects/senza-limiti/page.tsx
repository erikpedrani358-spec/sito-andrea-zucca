import type { Metadata } from "next";
import SenzaLimiti from "@/components/projects/SenzaLimiti";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  projectCreativeWorkJsonLd,
  projectMetadata,
} from "@/lib/seo";

export const metadata: Metadata = projectMetadata("senza-limiti");

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          projectCreativeWorkJsonLd("senza-limiti"),
          breadcrumbJsonLd("senza-limiti"),
        ]}
      />
      <SenzaLimiti />
    </>
  );
}
