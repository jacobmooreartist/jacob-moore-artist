import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site-frame";
import { TideGallery } from "@/components/tide-gallery";
import { pageMeta } from "@/lib/seo";
import { ArtistName } from "@/components/artist-name";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Jacob Moore Artist — Coastal Metal Sculpture & Jewelry",
      description:
        "Original metal sculpture and jewelry by Jacob Moore. Inspired by the Long Beach Peninsula and the Pacific Northwest coast. Explore the work and inquire with the studio.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <SiteFrame>
      <section className="intro">
        <h1><ArtistName /></h1>
        <blockquote className="intro-quote">
          <p>Spring forth. Tides of change.</p>
          <p>Summer fog banks. A coast slowed down.</p>
          <p>Fall's bounty brings earthen treats.</p>
          <p>Forged in the winds of winter.</p>
        </blockquote>
      </section>
      <TideGallery />
    </SiteFrame>
  );
}
