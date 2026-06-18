import type { Metadata } from "next";
import AnatomiaGabbia from "@/components/projects/AnatomiaGabbia";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  projectCreativeWorkJsonLd,
  projectMetadata,
} from "@/lib/seo";

export const metadata: Metadata = projectMetadata("anatomia-della-gabbia");

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          projectCreativeWorkJsonLd("anatomia-della-gabbia"),
          breadcrumbJsonLd("anatomia-della-gabbia"),
        ]}
      />
      <AnatomiaGabbia />
    </>
  );
}
