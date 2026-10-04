import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site-frame";
import { artworkJsonLd, breadcrumbs, pageMeta } from "@/lib/seo";
import { getWork, neighbors } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    const work = loaderData?.work;
    if (!work) {
      return pageMeta({
        title: "Work — Jacob Moore Artist",
        description: "Metalwork by Jacob Moore Artist.",
        path: "/work",
        noindex: true,
      });
    }
    return pageMeta({
      title: `${work.title} — Jacob Moore Artist`,
      description: `${work.summary} Original sculpture by Jacob Moore, inspired by the Pacific Northwest coast.`,
      path: `/work/${work.slug}`,
      jsonLd: [artworkJsonLd(work), breadcrumbs([{ name: "Work", path: "/work" }, { name: work.title, path: `/work/${work.slug}` }])],
    });
  },
  component: WorkDetail,
});

function WorkDetail() {
  const { work } = Route.useLoaderData();
  const { prev, next } = neighbors(work.slug);

  return (
    <SiteFrame>
      <article className="page frame detail">
        <div className="detail-visual">
          <img src={work.image} width={work.width} height={work.height} alt={work.alt} />
        </div>
        <div className="detail-copy">
          <Link className="crumb kicker" to="/work">
            Work
          </Link>
          <h1>{work.title}</h1>
          {work.body ? <p>{work.body}</p> : null}
          <Link className="btn" to="/contact" search={{ piece: work.slug }}>
            Inquire about {work.title}
          </Link>
          <nav className="pager" aria-label="More work">
            {prev ? (
              <Link to="/work/$slug" params={{ slug: prev.slug }}>
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to="/work/$slug" params={{ slug: next.slug }}>
                {next.title}
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </article>
    </SiteFrame>
  );
}
