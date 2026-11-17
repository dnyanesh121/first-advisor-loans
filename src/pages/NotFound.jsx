import { useMemo } from "react";
import { Link } from "react-router-dom";
import Clouds from "../components/common/Clouds";
import SvgArt from "../components/common/SvgArt";
import LoanTile from "../components/loan/LoanTile";
import { financeArt } from "../utils/art";
import { getLoan } from "../utils/lookup";
import useDocumentTitle from "../hooks/useDocumentTitle";

/** 404 with popular loans and quick links. */
export default function NotFound() {
  useDocumentTitle("Page Not Found | First Advisors Loans", true);
  const art = useMemo(() => financeArt("doc", 3), []);
  return (
    <section className="nf">
      <Clouds n={8} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="big rise" aria-hidden="true">4<span>0</span>4</div>
        <div className="house rise d1"><SvgArt html={art} /></div>
        <h1 className="rise d2">This page isn't on our books</h1>
        <p className="rise d3">The link may be broken or the page may have moved. Pick a loan below or head back home.</p>
        <div className="tile-grid rise d4" style={{ maxWidth: 720, margin: "0 auto", textAlign: "left" }}>
          {["personal", "home", "business"].map((k, i) => <LoanTile key={k} loan={getLoan(k)} index={i} />)}
        </div>
        <div className="quick rise d5">
          <Link className="btn btn--navy" to="/">Back to Home</Link>
          <Link className="chip" to="/loans">All loans</Link>
          <Link className="chip" to="/calculators">EMI calculator</Link>
          <Link className="chip" to="/learn">Learn</Link>
          <Link className="chip" to="/contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}
