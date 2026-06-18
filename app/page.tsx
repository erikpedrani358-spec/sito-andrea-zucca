import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import {
  homeMetadata,
  personJsonLd,
  profilePageJsonLd,
  websiteJsonLd,
  worksItemListJsonLd,
} from "@/lib/seo";

const FeaturedProjects = dynamic(
  () => import("@/components/sections/FeaturedProjects"),
  { loading: () => <div className="min-h-[40vh] bg-ink" aria-hidden /> }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { loading: () => <div className="min-h-[20vh] bg-ink" aria-hidden /> }
);

export const metadata: Metadata = homeMetadata();

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          personJsonLd(),
          websiteJsonLd(),
          profilePageJsonLd(),
          worksItemListJsonLd(),
        ]}
      />
      <main>
        <Hero />
        <FeaturedProjects />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
