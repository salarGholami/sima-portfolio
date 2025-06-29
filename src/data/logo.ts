export interface Logo {
  company: string;
  images: string[];
  title: string;
}

const rawLogos = [
  {
    title: "ibis Hotel",
    images: ["/image/Logo/ibis.png"],
    company: "ibis",
  },
  {
    title: "Asan pardakht",
    images: ["/image/Logo/Asan pardakht.png"],
    company: "Asan pardakht",
  },
  {
    title: "Digi",
    images: ["/image/Logo/Digi.png"],
    company: "Digi",
  },
  {
    title: "IRtalent",
    images: ["/image/Logo/IRtalent.png"],
    company: "IRtalent",
  },
  {
    title: "schwarzkopf",
    images: ["/image/Logo/schwarzkopf.png"],
    company: "schwarzkopf",
  },
  {
    title: "zarrin",
    images: ["/image/Logo/zarrin.png"],
    company: "zarrin",
  },
];

export const logos: Logo[] = rawLogos.map((item) => ({
  title: item.title,
  images: item.images,
  company: item.company,
}));
