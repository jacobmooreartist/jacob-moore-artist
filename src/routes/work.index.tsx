import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site-frame";
import { gallery } from "@/lib/gallery";
import { pageMeta } from "@/lib/seo";
import { works } from "@/lib/site";

export const Route = createFileRoute("/work/")({
  head: () =>
    pageMeta({
      title: "Work — Jacob Moore Artist",
      description:
        "Work by Jacob Moore Artist. Forged topography, bent contours, and drawing lines.",
      path: "/work",
    }),
  component: WorkIndex,
});

const contour = works.find((work) => work.slug === "contour");

function WorkIndex() {
  const forged = gallery.find((group) => group.id === "forged");
  const lines = gallery.find((group) => group.id === "lines");
  const outside = gallery.find((group) => group.id === "outside");

  return (
    <SiteFrame>
      <div className="page frame">
        <p className="kicker">Selected work</p>
        <h1 className="display page-title">Work</h1>
        {forged ? <GalleryBlock group={forged} /> : null}
        {contour ? (
          <section className="gallery-group">
            <h2>
              <Link to="/work/$slug" params={{ slug: contour.slug }}>
                {contour.title}
              </Link>
            </h2>
            <div className="gallery-grid">
              <img src={contour.image} width={contour.width} height={contour.height} alt={contour.alt} />
            </div>
          </section>
        ) : null}
        {lines ? <GalleryBlock group={lines} /> : null}
        {outside ? <GalleryBlock group={outside} /> : null}
      </div>
    </SiteFrame>
  );
}

function GalleryBlock({ group }: { group: (typeof gallery)[number] }) {
  return (
    <section className="gallery-group">
      <h2>{group.title}</h2>
      <div className="gallery-grid">
        {group.shots.map((shot) => (
          <img key={shot.src} src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} />
        ))}
      </div>
    </section>
  );
}
