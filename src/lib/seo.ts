import { ARTIST, INSTAGRAM_URL, SITE_URL, type Work } from "./site";

type HeadResult = {
  meta: Array<Record<string, unknown>>;
  links: Array<{ rel: string; href: string }>;
};

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}): HeadResult {
  const url = `${SITE_URL}${opts.path}`;
  const blocks = opts.jsonLd
    ? Array.isArray(opts.jsonLd)
      ? opts.jsonLd
      : [opts.jsonLd]
    : [artistJsonLd()];
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "author", content: ARTIST },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      ...blocks.map((block) => ({ "script:ld+json": block })),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function artistJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtist",
    name: ARTIST,
    url: SITE_URL,
    image: `${SITE_URL}/works/shell.jpg`,
    jobTitle: "Sculptor",
    knowsAbout: [
      "forged metal sculpture",
      "steel wire sculpture",
      "welded steel sculpture",
      "contemporary sculpture",
    ],
    sameAs: [INSTAGRAM_URL],
    description:
      "Jacob Moore makes metalwork in the Pacific Northwest.",
  };
}

export function artworkJsonLd(work: Work): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: work.title,
    artform: "Sculpture",
    artMedium: work.material,
    creator: { "@type": "Person", name: ARTIST, url: SITE_URL },
    image: `${SITE_URL}${work.image.split("?")[0]}`,
    description: work.body,
    url: `${SITE_URL}/work/${work.slug}`,
  };
}
