import type { Metadata } from "next";
import ChowaArmonia from "@/components/projects/ChowaArmonia";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  projectCreativeWorkJsonLd,
  projectMetadata,
} from "@/lib/seo";

export const metadata: Metadata = projectMetadata("chowa-armonia");

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          projectCreativeWorkJsonLd("chowa-armonia"),
          breadcrumbJsonLd("chowa-armonia"),
        ]}
      />
      <ChowaArmonia />
    </>
  );
}
