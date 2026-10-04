import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Inquire" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <header className="site-header">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Link to="/" className="wordmark" onClick={() => setOpen(false)}>
        Jacob Moore Artist
      </Link>
      <div className="header-end">
        <a className="ig-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <Instagram size={18} aria-hidden="true" />
          <span className="ig-handle">{INSTAGRAM_HANDLE}</span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
        <nav id="site-nav" className={open ? "site-nav open" : "site-nav"} aria-label="Studio">
          {links.map((link) => {
            const current = pathname === link.to || pathname.startsWith(`${link.to}/`);
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
