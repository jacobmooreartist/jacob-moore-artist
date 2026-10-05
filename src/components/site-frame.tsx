import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TideWash } from "./tide-wash";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site-frame">
      <TideWash />
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </div>
  );
}
