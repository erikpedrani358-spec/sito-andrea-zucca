import type { Metadata } from "next";
import { getProject, projects, type ProjectSlug } from "@/lib/projects";

/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production (e.g. Vercel). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://andreazucca.com";

export const SITE = {
  name: "Andrea Zucca",
  title: "Andrea Zucca — Fashion Designer Portfolio",
  tagline: "Fashion designer · Milano",
  description:
    "Official portfolio of Andrea Zucca, Milan-based fashion designer. Explore Senza Limiti, Anatomia della Gabbia, Ear Cuff and editorial work in garment construction, styling and visual research.",
  descriptionIt:
    "Portfolio ufficiale di Andrea Zucca, fashion designer di Milano. Collezioni, styling editoriale e ricerca visiva tra identità, struttura e tensione.",
  locale: "en_GB",
  localeAlternate: "it_IT",
  email: "Zuccaandrea1999@outlook.it",
  phone: "+393516521573",
  instagram: "https://www.instagram.com/_itsandreh_",
  whatsapp: "https://wa.me/393516521573",
  location: "Milano, Italy",
  coordinates: { lat: 45.4642, lng: 9.19 },
  defaultOgImage: "/assets/projects/senza-limiti/02.jpg",
  portraitImage: "/assets/stylist/01.jpg",
} as const;

export const SEO_KEYWORDS = [
  "Andrea Zucca",
  "Andrea Zucca fashion designer",
  "Andrea Zucca portfolio",
  "Andrea Zucca stilista",
  "Andrea Zucca Milano",
  "fashion designer Milano",
  "stilista Milano",
  "Accademia del Lusso",
  "Senza Limiti",
  "Anatomia della Gabbia",
  "Ear Cuff",
  "fashion product design",
  "editorial styling",
  "avant-garde fashion",
] as const;

export const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  ...projects.map((p) => ({
    path: `/projects/${p.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  })),
];

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE.title,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    keywords: [...SEO_KEYWORDS],
    authors: [{ name: SITE.name, url: SITE_URL }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "Fashion",
    alternates: {
      canonical: "/",
      languages: {
        en: SITE_URL,
        it: SITE_URL,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      alternateLocale: [SITE.localeAlternate],
      url: SITE_URL,
      siteName: SITE.name,
      title: SITE.title,
      description: SITE.description,
      images: [
        {
          url: SITE.defaultOgImage,
          width: 1200,
          height: 1600,
          alt: `${SITE.name} — fashion designer portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.title,
      description: SITE.description,
      images: [SITE.defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
    other: {
      "geo.region": "IT-MI",
      "geo.placename": "Milano",
    },
  };
}

export function homeMetadata(): Metadata {
  return {
    title: SITE.title,
    description: SITE.description,
    alternates: { canonical: "/" },
    openGraph: {
      title: SITE.title,
      description: SITE.description,
      url: SITE_URL,
    },
  };
}

export function projectMetadata(slug: ProjectSlug): Metadata {
  const project = getProject(slug)!;
  const description = `${project.teaser} — Collection by ${SITE.name}, Milan-based fashion designer.`;
  const path = `/projects/${slug}`;

  return {
    title: `${project.title} by ${SITE.name}`,
    description,
    keywords: [
      project.title,
      SITE.name,
      "Andrea Zucca fashion",
      project.subtitle,
      ...SEO_KEYWORDS.slice(0, 6),
    ],
    alternates: { canonical: path },
    openGraph: {
      title: `${project.title} — ${SITE.name}`,
      description,
      url: absoluteUrl(path),
      type: "article",
      images: [
        {
          url: project.cover,
          alt: `${project.title} by ${SITE.name}`,
        },
      ],
    },
    twitter: {
      title: `${project.title} — ${SITE.name}`,
      description,
      images: [project.cover],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE.name,
    givenName: "Andrea",
    familyName: "Zucca",
    alternateName: ["Andrea Zucca fashion designer", "Andrea Zucca stilista"],
    jobTitle: "Fashion Designer",
    description: SITE.description,
    url: SITE_URL,
    image: absoluteUrl(SITE.portraitImage),
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    sameAs: [SITE.instagram, SITE.whatsapp],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Milano",
      addressRegion: "Lombardia",
      addressCountry: "IT",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Accademia del Lusso",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Milano",
        addressCountry: "IT",
      },
    },
    knowsAbout: [
      "Fashion Design",
      "Garment Construction",
      "Editorial Styling",
      "Fashion Product Design",
      "Visual Research",
    ],
    workLocation: {
      "@type": "Place",
      name: "Milano",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    alternateName: `${SITE.name} Portfolio`,
    url: SITE_URL,
    description: SITE.description,
    inLanguage: ["en", "it"],
    publisher: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: `${SITE.name} — Portfolio`,
    description: SITE.description,
    mainEntity: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function worksItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Selected works by ${SITE.name}`,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: absoluteUrl(`/projects/${p.slug}`),
    })),
  };
}

export function projectCreativeWorkJsonLd(slug: ProjectSlug) {
  const project = getProject(slug)!;
  const url = absoluteUrl(`/projects/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.title,
    headline: project.title,
    description: project.teaser,
    url,
    image: absoluteUrl(project.cover),
    dateCreated: project.year,
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    keywords: [project.title, SITE.name, project.subtitle].join(", "),
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function breadcrumbJsonLd(slug: ProjectSlug) {
  const project = getProject(slug)!;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE.name,
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: project.title,
        item: absoluteUrl(`/projects/${slug}`),
      },
    ],
  };
}
