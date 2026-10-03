export const SITE_URL = "https://jacobmooreartist.com";
export const ARTIST = "Jacob Moore";
export const EMAIL = "jacob.moore06@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/jacobmooreartist/";
export const INSTAGRAM_HANDLE = "@jacobmooreartist";
/** Replace with the live shop URL before the domain cutover. */
export const ETSY_URL = "https://www.etsy.com/shop/JacobMooreArtist";

export type Work = {
  slug: string;
  title: string;
  material: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  summary: string;
  body: string;
};

export const works: Work[] = [
  {
    slug: "shell",
    title: "Forged topography",
    material: "Forged metal",
    image: "/works/shell.jpg?v=3",
    width: 1200,
    height: 1600,
    alt: "Forged topography. A spiral of raised metal ridges.",
    summary: "",
    body: "",
  },
  {
    slug: "contour",
    title: "Bent contours",
    material: "Steel wire",
    image: "/works/contour.jpg",
    width: 2000,
    height: 1394,
    alt: "Bent contours. Steel wire, two nested forms on a pale wall.",
    summary: "",
    body: "",
  },
  {
    slug: "portrait",
    title: "Drawing lines",
    material: "Welded steel rod",
    image: "/works/portrait.jpg?v=2",
    width: 1500,
    height: 2000,
    alt: "Drawing lines. A face in welded steel rod on a pale wall.",
    summary: "",
    body: "",
  },
];

export function getWork(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

export function neighbors(slug: string): { prev?: Work; next?: Work } {
  const index = works.findIndex((work) => work.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? works[index - 1] : undefined,
    next: index < works.length - 1 ? works[index + 1] : undefined,
  };
}
