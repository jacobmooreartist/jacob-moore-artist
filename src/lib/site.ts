export const SITE_URL = "https://www.jacobmooreartist.com";
export const ARTIST = "Jacob Moore";
export const EMAIL = "jacob.moore06@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/jacobmooreartist/";
export const INSTAGRAM_HANDLE = "@jacobmooreartist";
export const ETSY_URL = "https://jacobmooreartist.etsy.com";

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
    summary: "A forged metal shell sculpture with raised ridges and a spiral form.",
    body: "A spiral of raised metal ridges gives this shell form its depth. The surface catches light and shadow, drawing together the rugged texture of metal and the quiet geometry of the coast.",
  },
  {
    slug: "contour",
    title: "Bent contours",
    material: "Steel wire",
    image: "/works/contour.jpg",
    width: 2000,
    height: 1394,
    alt: "Bent contours. Steel wire, two nested forms on a pale wall.",
    summary: "Nested steel wire forms that explore coastal contours and negative space.",
    body: "Nested steel wire forms trace an open silhouette. Their contours and the space between them suggest the shifting lines of shoreline and water, while shadows extend the drawing across the wall.",
  },
  {
    slug: "portrait",
    title: "Drawing lines",
    material: "Welded steel rod",
    image: "/works/portrait.jpg?v=2",
    width: 1500,
    height: 2000,
    alt: "Drawing lines. A face in welded steel rod on a pale wall.",
    summary: "A welded steel rod portrait that turns a drawn line into sculpture.",
    body: "A face takes shape in welded steel rod. The open framework brings the economy of a drawn line into three dimensions, allowing the wall, light, and shadow to become part of the portrait.",
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
