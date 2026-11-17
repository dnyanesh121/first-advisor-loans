import { useMemo } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Clouds from "./Clouds";
import SvgArt from "./SvgArt";
import { financeArt } from "../../utils/art";

/**
 * Inner-page hero: clouds, chart motif, breadcrumbs, title, lead.
 * <PageHero title={<>Find the Right <em>Loan</em></>} crumbs={[["All Loans"]]} lead="…" art="business" />
 */
export default function PageHero({ title, crumbs, lead, extra, center, art: kind = "growth" }) {
  const art = useMemo(() => financeArt(kind, 9), [kind]);
  return (
    <section className={`page-hero ${center ? "center" : ""}`}>
      <Clouds n={6} />
      <div className="hero-chart" aria-hidden="true"><SvgArt html={art} /></div>
      <div className="container">
        <div className="rise"><Breadcrumbs crumbs={crumbs} /></div>
        <h1 className="rise d1">{title}</h1>
        {lead && <p className="lead rise d2">{lead}</p>}
        {extra && <div className="rise d3">{extra}</div>}
      </div>
    </section>
  );
}
