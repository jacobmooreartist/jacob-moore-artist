import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { works } from "@/lib/site";

export function TideGallery() {
  const run = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 960px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const measure = () => {
      const enabled = wide.matches && !motion.matches;
      setActive(enabled);
      if (!enabled || !run.current || !track.current) {
        setX(0);
        return;
      }
      const total = run.current.offsetHeight - window.innerHeight;
      const passed = Math.min(
        Math.max(-run.current.getBoundingClientRect().top, 0),
        Math.max(total, 0),
      );
      const progress = total > 0 ? passed / total : 0;
      const max = Math.max(track.current.scrollWidth - window.innerWidth, 0);
      setX(max * progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    wide.addEventListener("change", onScroll);
    motion.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wide.removeEventListener("change", onScroll);
      motion.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section className="tide-run" ref={run} aria-label="Selected work">
      <div className="tide-sticky">
        <div
          className="tide-track"
          ref={track}
          style={active ? { transform: `translate3d(${-x}px, 0, 0)` } : undefined}
        >
          {works.map((work) => (
            <article className="tide-panel" key={work.slug}>
              <div className="tide-visual">
                <img src={work.image} width={work.width} height={work.height} alt={work.alt} />
              </div>
              <div className="tide-meta">
                <h2>{work.title}</h2>
                {work.summary ? <p>{work.summary}</p> : null}
                <Link className="tide-link" to="/work/$slug" params={{ slug: work.slug }}>
                  View <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
          <article className="tide-panel letter-panel">
            <p className="kicker">Select commissions</p>
            <h2>Room for the right work.</h2>
            <p>Every commission begins with a considered conversation.</p>
            <Link className="tide-link" to="/contact">
              Inquire with the studio <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
