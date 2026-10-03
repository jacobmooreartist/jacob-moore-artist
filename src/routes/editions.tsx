import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { pageMeta } from "@/lib/seo";
import { ETSY_URL, works } from "@/lib/site";

export const Route = createFileRoute("/editions")({
  head: () =>
    pageMeta({
      title: "Editions — Jacob Moore Artist",
      description:
        "Smaller works by Jacob Moore are on Etsy. Commissions go through email.",
      path: "/editions",
    }),
  component: Editions,
});

function Editions() {
  return (
    <SiteFrame>
      <div className="page frame">
        <p className="kicker">The shop</p>
        <h1 className="display page-title">Editions</h1>
        <div className="split">
          <div className="essay">
            <p>
              Smaller works are on Etsy. The pieces on this site are the studio work.
              Commissions go through email.
            </p>
            <a className="btn" href={ETSY_URL} target="_blank" rel="noreferrer">
              Enter the Etsy studio <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="note">
            Commissions start on the contact page, not in the shop.
          </p>
        </div>
        <div className="edition-grid">
          {works.map((work) => (
            <Link key={work.slug} to="/work/$slug" params={{ slug: work.slug }}>
              <img src={work.image} width={work.width} height={work.height} alt={work.alt} />
              <h2>{work.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </SiteFrame>
  );
}
