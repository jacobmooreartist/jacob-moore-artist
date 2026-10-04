import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { gallery } from "@/lib/gallery";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  head: () => pageMeta({
    title: "Metal Sculpture & Jewelry — Jacob Moore Artist",
    description: "Discover Jacob Moore’s forged forms, coastal contours, line studies, and jewelry. Original metalwork inspired by the Pacific Northwest coast.",
    path: "/work",
    pageType: "CollectionPage",
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <SiteFrame>
      <div className="page frame">
        <p className="kicker">A coastal practice</p>
        <h1 className="display page-title">Work</h1>
        <p className="gallery-intro">Rugged forms. Considered lines. A body of work rooted in the land and water of the Pacific Northwest.</p>
        <div className="collection-grid">
          {gallery.map((group) => {
            const shot = group.shots[0];
            return (
              <Link key={group.id} to="/gallery" hash={group.id} className="collection-card">
                <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" />
                <h2>{group.title} <ArrowUpRight size={20} aria-hidden="true" /></h2>
                <p>{group.description}</p>
              </Link>
            );
          })}
        </div>
        <section className="studio-invitation">
          <div>
            <p className="kicker">Select commissions</p>
            <h2>Room for the right work.</h2>
            <p>A commission begins with a conversation about the piece, its setting, and the time it asks. Share your vision with the studio.</p>
            <Link className="tide-link" to="/contact">Inquire about a commission <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
