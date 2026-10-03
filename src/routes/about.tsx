import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site-frame";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About — Jacob Moore Artist",
      description:
        "Jacob Moore Artist. A coast of hard winters and fog, and metalwork shaped by a life outdoors.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <SiteFrame>
      <div className="page frame">
        <article className="essay">
          <h1 className="display page-title">About</h1>
          <p>
            Winter takes the coast. Summer gives it back in fog. He answers both the same way:
            fishing, surf, and the slow hunt for mushrooms under the trees.
          </p>
          <p>
            The years between have been stills, the care of land, and a farm of his own. None of
            it was a detour. The Northwest that formed him is the pressure still in the metal.
          </p>
          <Link className="btn" to="/contact">
            Contact
          </Link>
        </article>
      </div>
    </SiteFrame>
  );
}