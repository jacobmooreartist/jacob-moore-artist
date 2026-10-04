import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFrame } from "@/components/site-frame";
import { pageMeta } from "@/lib/seo";
import { EMAIL, getWork, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

type ContactSearch = { piece?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => {
    if (typeof search.piece === "string" && search.piece) return { piece: search.piece };
    return {};
  },
  head: () =>
    pageMeta({
      title: "Art & Commission Inquiries — Jacob Moore Artist",
      description: "Contact Jacob Moore’s studio about original metal sculpture, jewelry, or a considered commission. Each inquiry is reviewed individually with the studio’s schedule.",
      path: "/contact",
      pageType: "ContactPage",
    }),
  component: Contact,
});

function Contact() {
  const { piece } = Route.useSearch();
  const work = piece ? getWork(piece) : undefined;
  const [ready, setReady] = useState(false);

  return (
    <SiteFrame>
      <div className="page frame contact-grid">
        <div>
          <p className="kicker">The studio</p>
          <h1 className="display page-title">Inquire</h1>
          <p>For a work that stays with you. Or one yet to take shape.</p>
          <p>Commission inquiries are considered individually, according to the project and the studio’s schedule. Share your vision, intended setting, and preferred timing.</p>
          <p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram {INSTAGRAM_HANDLE}
            </a>
          </p>
        </div>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const name = String(data.get("name") ?? "").trim();
            const from = String(data.get("email") ?? "").trim();
            const interest = String(data.get("interest") ?? "Commission");
            const message = String(data.get("message") ?? "").trim();
            const subject = encodeURIComponent(
              work ? `${interest} — ${work.title}` : `Studio inquiry — ${interest}`,
            );
            const body = encodeURIComponent(
              `${message}\n\n— ${name}\n${from}${work ? `\nRegarding: ${work.title}` : ""}`,
            );
            window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
            setReady(true);
          }}
        >
          <label className="field">
            <span className="kicker">Name</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label className="field">
            <span className="kicker">Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="field">
            <span className="kicker">Regarding</span>
            <select name="interest" defaultValue={work ? "A specific work" : "Commission"}>
              <option>Commission</option>
              <option>Jewelry or smaller work</option>
              <option>A specific work</option>
              <option>Something else</option>
            </select>
          </label>
          <label className="field">
            <span className="kicker">Letter</span>
            <textarea
              name="message"
              required
              defaultValue={work ? `I am writing about ${work.title}.` : ""}
            />
          </label>
          <button className="btn" type="submit">
            Prepare inquiry
          </button>
          <p className="note" role="status">
            {ready
              ? "Your letter is open in your mail app, addressed to Jacob."
              : "Opens your email app with a draft addressed to Jacob. Review and send it there."}
          </p>
        </form>
      </div>
    </SiteFrame>
  );
}
