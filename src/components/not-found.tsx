import { Link } from "@tanstack/react-router";
import { SiteFrame } from "./site-frame";

export function NotFound() {
  return (
    <SiteFrame>
      <div className="page frame">
        <p className="kicker">404</p>
        <h1 className="display missing-title">Not on this wall.</h1>
        <p>That page is not in the studio.</p>
        <Link className="btn" to="/">
          Return
        </Link>
      </div>
    </SiteFrame>
  );
}
