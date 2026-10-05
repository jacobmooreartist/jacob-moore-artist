import { Link } from "@tanstack/react-router";
import { ETSY_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";
import { ArtistName } from "./artist-name";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        <ArtistName />
        <br />
        Metalwork. Pacific Northwest.
      </p>
      <nav aria-label="Footer">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          {INSTAGRAM_HANDLE}
        </a>
        <a href={ETSY_URL} target="_blank" rel="noreferrer">
          Etsy
        </a>
        <Link to="/contact">Studio inquiries</Link>
      </nav>
      <p>© {new Date().getFullYear()} <ArtistName /></p>
    </footer>
  );
}
