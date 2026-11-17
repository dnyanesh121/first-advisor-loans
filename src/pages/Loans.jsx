import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import EmptyState from "../components/common/EmptyState";
import LoanCard from "../components/loan/LoanCard";
import RateTable from "../components/loan/RateTable";
import { CONFIG } from "../data/config";
import { LOANS } from "../data/loans";
import { amountRange, date, rate, tenureRange } from "../utils/format";
import { applyUrl, loanUrl } from "../utils/lookup";
import { useApp } from "../context/AppContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const SEGS = [["all", "All Loans", "grid"], ["you", "Loans for You", "user2"], ["business", "Loans for Business", "briefcase"]];
const FILTERS = [["all", "All"], ["unsecured", "No collateral"], ["secured", "Secured"], ["fast", "Disbursal in 72 hrs"]];
const fast = (l) => /hours|Same day/.test(l.disbursal);
const GLANCE = [
  { h: "Rate from*", label: "Rate from", num: true, cell: (l) => <b>{rate(l.rate)}</b> },
  { h: "Amount", num: true, cell: amountRange },
  { h: "Tenure", num: true, cell: tenureRange },
  { h: "Processing fee", label: "Fee", cell: (l) => l.fee },
  { h: "Collateral", cell: (l) => (l.secured ? "Required" : "Not required") }
];

/** All loans: segment tabs (?seg=you|business), filters, search, at-a-glance table. */
export default function Loans() {
  useDocumentTitle("All Loans — Personal, Home, Vehicle & Business | First Advisors Loans", true);
  const { openConsult } = useApp();
  const [qp, setQp] = useSearchParams();
  const seg = ["you", "business"].includes(qp.get("seg")) ? qp.get("seg") : "all";
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return LOANS.filter((l) => {
      if (seg !== "all" && l.seg !== seg) return false;
      if (filter === "unsecured" && l.secured) return false;
      if (filter === "secured" && !l.secured) return false;
      if (filter === "fast" && !fast(l)) return false;
      if (s && (l.name + " " + l.tagline + " " + l.variants.map((v) => v[0]).join(" ")).toLowerCase().indexOf(s) < 0) return false;
      return true;
    });
  }, [seg, filter, q]);

  return (
    <>
      <PageHero title={<>Find the Right <em>Loan</em></>} crumbs={[["All Loans"]]} art="business" lead="Loans for individuals and businesses from our partner banks and NBFCs. Compare starting rates, amounts and tenures, then apply in minutes." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="cat-tabs reveal" role="tablist" aria-label="Loan segment">
            {SEGS.map(([k, label, icon]) => (
              <button type="button" role="tab" key={k} aria-selected={k === seg} onClick={() => setQp(k === "all" ? {} : { seg: k }, { replace: true })}><Icon name={icon} />{label}</button>
            ))}
          </div>
          <div className="toolbar reveal" style={{ marginBottom: 22 }}>
            <div className="opts flex" role="group" aria-label="Filter loans">
              {FILTERS.map(([k, label]) => <button type="button" className="chip" key={k} aria-pressed={k === filter} onClick={() => setFilter(k)}>{label}</button>)}
            </div>
            <div style={{ flex: 1, minWidth: 220, maxWidth: 340 }}><input className="input input--sm" id="q" type="search" placeholder="Search loans, e.g. car, MSME" aria-label="Search loans" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          </div>
          <p className="muted" style={{ margin: "-6px 0 16px" }}><b className="num" style={{ color: "var(--navy)" }}>{list.length}</b> {list.length === 1 ? "loan" : "loans"}</p>
          <div className="loan-grid">
            {list.length ? list.map((l, i) => <LoanCard key={l.key} loan={l} index={i} />) : (
              <div style={{ gridColumn: "1/-1" }}>
                <EmptyState title="No loans match" text="Try another filter, or ask an advisor what suits your need.">
                  <button type="button" className="btn btn--primary" onClick={openConsult}>Ask an advisor</button>
                </EmptyState>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Compare Loans <em>at a Glance</em></>} subtitle="Indicative starting rates and limits across our lending partners" note={`Indicative rates as of ${date(CONFIG.ratesAsOf)}`} />
          <RateTable id="glance" columns={GLANCE} groups={[{ loans: LOANS }]} rowHead={loanUrl} action={applyUrl} />
          <p className="muted center mt-4" style={{ fontSize: 12.5 }}>*Rates are indicative, on a reducing balance, and depend on the lender's credit assessment of your profile. See <Link className="link" to="/rates">interest rates &amp; charges</Link> for full details.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <div><h2>Not sure which loan fits? <em>Ask an advisor.</em></h2><p>Tell us what you need the money for. We'll suggest the cheapest suitable option and the right lender.</p></div>
            <div className="flex">
              <button type="button" className="btn btn--primary btn--lg" onClick={openConsult}>Request a Callback</button>
              <Link className="btn btn--white btn--lg" to="/calculators?type=eligibility">Check eligibility</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
