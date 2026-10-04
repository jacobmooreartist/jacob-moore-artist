import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { GalleryView } from "@/components/gallery-view";
import { pageMeta } from "@/lib/seo";
import { ETSY_URL } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () => pageMeta({
    title: "Gallery — Jacob Moore Artist",
    description: "Explore Jacob Moore’s coastal metalwork: forged forms, contours, line studies, and jewelry.",
    path: "/gallery",
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <SiteFrame>
      <div className="page frame">
        <p className="kicker">From the studio</p>
        <h1 className="display page-title">Gallery</h1>
        <p className="gallery-intro">A closer look at the work. Shaped by the coast, expressed in metal.</p>
        <GalleryView />
        <section className="studio-invitation">
          <div>
            <p className="kicker">Acquisitions & commissions</p>
            <h2>Begin a conversation.</h2>
            <p>For a particular work or a considered commission, inquire directly with the studio. Each inquiry is reviewed individually, according to the project and the studio’s schedule.</p>
            <Link className="tide-link" to="/contact">Inquire with the studio <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div>
            <p className="kicker">Available pieces</p>
            <p>Explore jewelry and smaller works in Jacob’s Etsy shop.</p>
            <a className="tide-link" href={ETSY_URL} target="_blank" rel="noreferrer">Visit the Etsy shop <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
