export interface Cart {
  description?: string;
  slug: string;
  id: number;
  company: string;
  images: string[];
  title: string;
  doJob?: string;
  year?: number;
}

const rawCarts = [
  {
    slug: "project-1",
    title: "App & System Design",
    company: "apsan",
    images: ["/image/project/apsan-app-fit.png"],
    description:
      "New system design and UI/UX for app emphasizing ease of use and visual clarity for APSAN",
    year: 2025,
  },
  {
    slug: "project-2",
    title: "Brand Identity",
    company: "apsan",
    images: ["/image/project/apsan-brandbook-fit.png"],
    description:
      "esigning a cohesivevisual identity to reflect the brand's personality for APSAN",
    year: 2024,
  },
  {
    slug: "project-3",
    company: "zarrin roya",
    images: [
      "/image/project/Zarin-mockup1.png",
      "/image/project/Zarin-mockup4.jpg",
      "/image/project/Zarin-mockup2.jpg",
      "/image/project/Zarin-mockup3.jpg",
    ],
    title: "Wellcome Pack",
    description: "Crafted a warm and inviting welcome pack for ZARRIN ROYA",
    year: 2025,
  },
  {
    slug: "project-4",
    title: "Landing & Poster",
    company: "zarrin roya",
    images: [
      "/image/project/landing zarrin-fit.png",
      "/image/project/Zarin-mockup-poster.jpg",
    ],
    description:
      "Designed a creative poster and landing page for ZARRIN ROYA’s Creativity workshop",
    year: 2024,
  },
  {
    slug: "project-5",
    title: "Advertising Campaign",
    company: "digistyle",
    images: [
      "/image/project/digi-vl-girl-fit.png",
      "/image/project/digi-vl-boy-fit.jpg",
    ],
    description:
      "Designed love-themed visuals for DIGISTYLE’s Valentine’s sales campaign",
    year: 2022,
  },
  {
    slug: "project-6",
    title: "Advertising Campaign ",
    company: "digistyle",
    images: [
      "/image/project/digi-sp-boy-s.png",
      "/image/project/digi-sp-boy.jpg",
      "/image/project/digi-sp-girl-s-fit.jpg",
    ],
    description:
      "Designed fresh and seasonal visuals for DIGISTYLE’s spring campaign",
    year: 2022,
  },
  {
    slug: "project-7",
    company: "asanpardakht",
    title: "Creative Design",
    images: [
      "/image/project/Asanpardakht.png",
      "/image/project/Asanpardakht-2.jpg",
    ],
    description:
      "Created exciting visuals for ASAN PARDAKHT’s travel discount campaign",
    year: 2025,
  },
  {
    slug: "project-8",
    company: "kardix",
    title: "Brand Book",
    images: [
      "/image/project/Kardix-logo-fit.png",
      "/image/project/Kardix-logo-fit.jpg",
    ],
    description: "Created KARDIX’s brand identity and cohesive brand book",
    year: 2023,
  },
  {
    slug: "project-9",
    company: "fixso",
    title: "Art Direction",
    images: ["/image/project/Marjana.png"],
    description:
      "Led visual direction for Marjana Gallery with a focus on brand essence in FIXSO",
    year: 2020,
  },
  {
    slug: "project-10",
    company: "xperix",
    title: "Flyer Design",
    images: ["/image/project/Xp-brochure-fit.png"],
    description: "Designed a professional product fair brochure for XPERIX.AI",
    year: 2025,
  },
  {
    slug: "project-11",
    company: "modekey",
    title: "Magazine Design",
    images: ["/image/project/Modekey-mag-fit.png"],
    description:
      "Created graphic layouts aligned with MODEKEY’s editorial identity",
    year: 2025 - 2018,
  },
  {
    slug: "project-12",
    company: "fixso",
    title: "Creative Direction",
    images: ["/image/project/creative photography-fit.png"],
    description:
      "Directed concept-driven, brand-oriented photography production",
    year: 2021,
  },
  {
    slug: "project-13",
    company: "schwarzkopf",
    title: "Advertising Design",
    images: ["/image/project/schwarzkopf-mag-fit.png"],
    description:
      "Developed bold and beautiful visuals for SCHWARZKOPF campaigns in Iran",
    year: 2016 - 2017,
  },
  {
    slug: "project-14",
    company: "kardix",
    title: "Advertising Campaign",
    images: ["/image/project/kardix-kashf-fit.png"],
    description:
      "Designed KARDIX’s ‘Discover Yourself’ campaign with a creative twist",
    year: 2023,
  },
  {
    slug: "project-15",
    company: "kardix",
    title: "Creative Direction",
    images: ["/image/project/job-poster-fit.png"],
    description:
      "Led the creative vision for  Tehran game’s week industry job fair",
    year: 2023,
  },
  {
    slug: "project-16",
    company: "kardix",
    title: "Advertising Campaign",
    images: ["/image/project/kRDIX-60MIN-fit.png"],
    description: "Crafted an integrated advertising campaign for KARDIX",
    year: 2023,
  },
];

export const carts: Cart[] = rawCarts.map((item, index) => ({
  id: index + 1,
  slug: item.slug,
  title: item.title,
  company: item.company,
  images: item.images,
  description: item.description,
  year: item.year,
}));
