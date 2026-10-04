import { ARTIST, ETSY_URL, INSTAGRAM_URL, SITE_URL, type Work } from "./site";
import type { GalleryGroup } from "./gallery";

type HeadResult = {
  meta: Array<Record<string, unknown>>;
  links: Array<{ rel: string; href: string }>;
};

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  pageType?: "WebPage" | "ProfilePage" | "CollectionPage" | "ContactPage";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
}): HeadResult {
  const url = SITE_URL + opts.path;
  const extras = opts.jsonLd ? (Array.isArray(opts.jsonLd) ? opts.jsonLd : [opts.jsonLd]) : [];
  const page = {
    "@context": "https://schema.org",
    "@type": opts.pageType ?? "WebPage",
    "@id": url + "#page",
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@id": SITE_URL + "/#website" },
    about: { "@id": SITE_URL + "/#artist" },
    ...(opts.pageType === "ProfilePage" ? { mainEntity: { "@id": SITE_URL + "/#artist" } } : {}),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_URL + "/#website",
    name: "Jacob Moore Artist",
    url: SITE_URL + "/",
    inLanguage: "en",
    publisher: { "@id": SITE_URL + "/#artist" },
  };
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "author", content: ARTIST },
      { name: "robots", content: opts.noindex ? "noindex,follow" : "index,follow,max-image-preview:large" },
      ...[artistJsonLd(), website, page, ...extras].map((block) => ({ "script:ld+json": block })),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function artistJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": SITE_URL + "/#artist",
    name: ARTIST,
    url: SITE_URL + "/about",
    jobTitle: "Metal artist and sculptor",
    knowsAbout: ["metal sculpture", "forged metalwork", "steel wire sculpture", "welded steel sculpture", "jewelry"],
    sameAs: [INSTAGRAM_URL, ETSY_URL],
    description: "Jacob Moore creates sculpture, metalwork, and jewelry inspired by the Long Beach Peninsula and the Pacific Northwest coast.",
  };
}

export function breadcrumbs(items: Array<{ name: string; path: string }>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: SITE_URL + item.path,
    })),
  };
}

export function galleryJsonLd(groups: GalleryGroup[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": SITE_URL + "/gallery#photographs",
    name: "Jacob Moore artwork photographs",
    itemListElement: groups.flatMap((group) => group.shots.map((shot) => ({ group, shot }))).map(({ group, shot }, index) => ({
      "@type": "ListItem", position: index + 1,
      item: {
        "@type": "ImageObject",
        contentUrl: SITE_URL + shot.src,
        name: shot.alt,
        caption: shot.alt + " — " + group.title + ", Jacob Moore",
        width: shot.width,
        height: shot.height,
      },
    })),
  };
}

export function artworkJsonLd(work: Work): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "@id": SITE_URL + "/work/" + work.slug + "#artwork",
    name: work.title,
    artform: "Sculpture",
    artMedium: work.material,
    creator: { "@id": SITE_URL + "/#artist" },
    image: SITE_URL + work.image.split("?")[0],
    description: work.body,
    url: SITE_URL + "/work/" + work.slug,
  };
}
