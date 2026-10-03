import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site-frame";
import { TideGallery } from "@/components/tide-gallery";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Jacob Moore Artist",
      description:
        "Jacob Moore Artist. Forged topography, bent contours, and drawing lines.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <SiteFrame>
      <section className="intro">
        <h1>Jacob Moore Artist</h1>
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