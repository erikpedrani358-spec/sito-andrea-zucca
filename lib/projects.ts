/**
 * Central source of truth for the three collections.
 * Each project carries its own visual identity (accent color, mood)
 * so its dedicated route can be themed independently.
 *
 * NOTE: image paths point to /public/assets/projects/<slug>/NN.jpg.
 * Replace any placeholder image by dropping a file with the same name.
 */

export type ProjectSlug =
  | "senza-limiti"
  | "anatomia-della-gabbia"
  | "ear-cuff"
  | "fashion-talents"
  | "chowa-armonia";

export interface ProjectImage {
  src: string;
  /** Short descriptive alt for accessibility + SEO. */
  alt: string;
  /** Optional aspect hint for masonry layouts. */
  span?: "tall" | "wide" | "square";
}

export interface Project {
  slug: ProjectSlug;
  index: string; // editorial numbering, e.g. "01"
  title: string;
  subtitle: string;
  year: string;
  /** One-line teaser used on the home grid. */
  teaser: string;
  /** Full design rationale (from the studio notes). */
  rationale: string[];
  /** Materials / craft notes. */
  materials: string[];
  /** Human readable location + raw coordinates. */
  location: string;
  coordinates: { lat: string; lng: string };
  /** Theme accent (hex) used across the project route. */
  accent: string;
  /** Cover image used on the home grid + project hero. */
  cover: string;
  /** Gallery images for the dedicated page. */
  gallery: ProjectImage[];
  /** Optional looping video (muted) for ambience. */
  video?: string;
}

export const projects: Project[] = [
  {
    slug: "senza-limiti",
    index: "01",
    title: "Senza Limiti",
    subtitle: "Fashion Show 2024",
    year: "2025",
    teaser: "The skeleton turned inside out — exposure, restraint, presence.",
    rationale: [
      "Inspired by anatomical structures, the look reinterprets the skeleton as an external surface.",
      "He layered construction in double fabric creates depth, tension and fragmentation across the body, revealing flashes of red beneath a dark protective shell.",
      "A study of exposure, restraint and physical presence.",
    ],
    materials: ["Double-layer wool", "Hand-cut ribcage appliqué", "Exposed zip spine"],
    location: "Milano, Italia",
    coordinates: { lat: "45.4642° N", lng: "9.1900° E" },
    accent: "#e10600",
    cover: "/assets/projects/senza-limiti/02.jpg",
    gallery: [
      { src: "/assets/projects/senza-limiti/02.jpg", alt: "Senza Limiti — full ribcage look on runway", span: "tall" },
      { src: "/assets/projects/senza-limiti/01.jpg", alt: "Senza Limiti — backstage profile", span: "square" },
      { src: "/assets/projects/senza-limiti/03.jpg", alt: "Senza Limiti runway look", span: "tall" },
      { src: "/assets/projects/senza-limiti/07.jpg", alt: "Senza Limiti — runway walk with audience applause", span: "wide" },
      { src: "/assets/projects/senza-limiti/05.jpg", alt: "Senza Limiti — construction detail", span: "square" },
    ],
  },
  {
    slug: "anatomia-della-gabbia",
    index: "02",
    title: "Anatomia della Gabbia",
    subtitle: "Thesis — Camilla Marta Milani",
    year: "2024",
    teaser: "The body as protection and restraint. The cage corset, silenced and suspended.",
    rationale: [
      "Inspired by the visual language of hysteria and female repression, the look explores the body as both protection and restraint.",
      "The cage corset transforms the silhouette into a controlled structure, suspended between tension, fragility and liberation.",
      "Crafted in cadì and fresco wool, fluid volumes contrast with sharp constructions and exposed laces, recalling psychological confinement and silent protest.",
      "Created for Camilla Marta Milani's graduation thesis project on female identity, hysteria and the body as a communicative device.",
    ],
    materials: ["Cadì wool", "Fresco wool", "Exposed corset lacing", "Steel cage boning"],
    location: "Opificio industriale, Lombardia",
    coordinates: { lat: "45.5845° N", lng: "9.2744° E" },
    accent: "#d9d9d9",
    cover: "/assets/projects/anatomia-della-gabbia/03.jpg",
    gallery: [
      { src: "/assets/projects/anatomia-della-gabbia/01.jpg", alt: "Anatomia della Gabbia — figure in industrial hall", span: "wide" },
      { src: "/assets/projects/anatomia-della-gabbia/02.jpg", alt: "Anatomia della Gabbia — corset structure", span: "tall" },
      { src: "/assets/projects/anatomia-della-gabbia/03.jpg", alt: "Anatomia della Gabbia — portrait", span: "square" },
      { src: "/assets/projects/anatomia-della-gabbia/04.jpg", alt: "Anatomia della Gabbia — exposed laces detail", span: "tall" },
      { src: "/assets/projects/anatomia-della-gabbia/05.jpg", alt: "Anatomia della Gabbia — full look", span: "tall" },
      { src: "/assets/projects/anatomia-della-gabbia/06.jpg", alt: "Anatomia della Gabbia — movement study", span: "wide" },
      { src: "/assets/projects/anatomia-della-gabbia/07.jpg", alt: "Anatomia della Gabbia — cage corset back", span: "square" },
      { src: "/assets/projects/anatomia-della-gabbia/08.jpg", alt: "Anatomia della Gabbia — atelier", span: "tall" },
      { src: "/assets/projects/anatomia-della-gabbia/09.jpg", alt: "Anatomia della Gabbia — detail", span: "square" },
      { src: "/assets/projects/anatomia-della-gabbia/10.jpg", alt: "Anatomia della Gabbia — final look", span: "wide" },
    ],
  },
  {
    slug: "ear-cuff",
    index: "03",
    title: "Ear Cuff",
    subtitle: "Sardinian Filigree Object",
    year: "2025",
    teaser: "Traditional craftsmanship melted into a brutalist, organic object.",
    rationale: [
      "Inspired by Sardinian filigree, the accessory transforms traditional craftsmanship into a brutalist object.",
      "Entirely handmade in tin through melting, soldering and manual shaping, the ear cuff develops an imperfect and organic texture, suspended between memory, decay and contemporary form.",
      "Created for Giulia Pais' thesis project at Accademia del Lusso.",
    ],
    materials: ["Hand-melted tin", "Soldered filigree", "Satin headscarf styling"],
    location: "Accademia del Lusso, Milano",
    coordinates: { lat: "45.4720° N", lng: "9.1859° E" },
    accent: "#7a5cff",
    cover: "/assets/projects/ear-cuff/01.jpg",
    video: "/assets/projects/ear-cuff/02.mov",
    gallery: [
      { src: "/assets/projects/ear-cuff/01.jpg", alt: "Ear Cuff — close portrait with filigree earring", span: "tall" },
      { src: "/assets/projects/ear-cuff/03.jpg", alt: "Ear Cuff — purple satin headscarf profile", span: "tall" },
      { src: "/assets/projects/ear-cuff/04.jpg", alt: "Ear Cuff — filigree detail", span: "square" },
      { src: "/assets/projects/ear-cuff/05.jpg", alt: "Ear Cuff — styling study", span: "wide" },
      { src: "/assets/projects/ear-cuff/06.jpg", alt: "Ear Cuff — profile", span: "tall" },
      { src: "/assets/projects/ear-cuff/07.jpg", alt: "Ear Cuff — tin texture", span: "square" },
      { src: "/assets/projects/ear-cuff/08.jpg", alt: "Ear Cuff — editorial", span: "tall" },
      { src: "/assets/projects/ear-cuff/09.jpg", alt: "Ear Cuff — final object", span: "wide" },
    ],
  },
  {
    slug: "fashion-talents",
    index: "04",
    title: "Fashion & Talents",
    subtitle: "Giuliano Fujiwara × Brand Project",
    year: "2026",
    teaser:
      "Not the full collection. Just a preview — seen on the runway in Piazza di Spagna.",
    rationale: [
      "A first look, a first fragment of the Brand Project developed with Accademia del Lusso: a single look designed to be seen in motion, under the lights, on the runway.",
      "Crisp shirting, glossed red nappa and long-fringe leather staged against the nightly backdrop of Rome — the Spanish Steps turned into an open-air catwalk.",
      "Selected for the VIII Edition of Fashion & Talents, the event that moves between Rome and the Milan fashion week calendar.",
    ],
    materials: [
      "Crisp cotton shirting",
      "Glossed red nappa",
      "Fringe-leather clutch",
      "White leather sneakers",
    ],
    location: "Piazza di Spagna, Roma",
    coordinates: { lat: "41.9058° N", lng: "12.4824° E" },
    accent: "#ff2d22",
    cover: "/assets/projects/fashion-talents/01.jpg",
    gallery: [
      { src: "/assets/projects/fashion-talents/01.jpg", alt: "Fashion & Talents — the look on the runway, white shirt and red nappa trousers", span: "tall" },
      { src: "/assets/projects/fashion-talents/02.jpg", alt: "Fashion & Talents — open-air runway at Piazza di Spagna", span: "wide" },
      { src: "/assets/projects/fashion-talents/03.jpg", alt: "Fashion & Talents — walking the look with fringe clutch", span: "tall" },
      { src: "/assets/projects/fashion-talents/04.jpg", alt: "Fashion & Talents — official poster, VIII Edition", span: "square" },
      { src: "/assets/projects/fashion-talents/05.jpg", alt: "Fashion & Talents — designers' bow at the end of the show", span: "wide" },
    ],
  },
  {
    slug: "chowa-armonia",
    index: "05",
    title: "Chowa: Armonia",
    subtitle: "Accademia del Lusso × Giuliano Fujiwara",
    year: "2026",
    teaser:
      "The harmony of imperfection — three looks between sashiko memory and deconstruction, on the occasion of Milano Fashion Week SS.2027.",
    rationale: [
      "Chowa — harmony. A special project dedicated to Giuliano Fujiwara, reinterpreting the brand's identity and creative heritage through the students' contemporary perspective.",
      "The whole creative process unfolds from garment design to styling and image development, balancing archive research with experimentation.",
      "Three looks — Sashiko De-Construction, Equilibrium, Memory Gesture — move between hand-stitched memory, suspended balance and the gesture of dressing.",
    ],
    materials: [
      "Red running-stitch sashiko",
      "Raw-edge deconstruction",
      "Knotted drawstring details",
      "Industrial cotton canvas",
    ],
    location: "Eleven Factory, Via Padova 11, Milano",
    coordinates: { lat: "45.4938° N", lng: "9.2156° E" },
    accent: "#c1121f",
    cover: "/assets/projects/chowa-armonia/03.jpg",
    gallery: [
      { src: "/assets/projects/chowa-armonia/03.jpg", alt: "Chowa: Armonia — Sashiko De-Construction, white tailoring with red running stitches", span: "tall" },
      { src: "/assets/projects/chowa-armonia/01.jpg", alt: "Chowa: Armonia — Look 01 against the studio wall", span: "square" },
      { src: "/assets/projects/chowa-armonia/06.jpg", alt: "Chowa: Armonia — Equilibrium, profile with ribbon ear-piece", span: "tall" },
      { src: "/assets/projects/chowa-armonia/09.jpg", alt: "Chowa: Armonia — Equilibrium on the runway", span: "tall" },
      { src: "/assets/projects/chowa-armonia/14.jpg", alt: "Chowa: Armonia — Memory Gesture, knotted tunic backstage", span: "tall" },
      { src: "/assets/projects/chowa-armonia/16.jpg", alt: "Chowa: Armonia — the industrial hall set for the show", span: "tall" },
    ],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
