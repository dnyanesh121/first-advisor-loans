import { Link, useSearchParams } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import RateTable from "../components/loan/RateTable";
import { CONFIG } from "../data/config";
import { LOANS } from "../data/loans";
import { GLOSSARY } from "../data/content";
import { date, rate, tenureRange } from "../utils/format";
import { applyUrl, getLoan, loansBySeg, loanUrl } from "../utils/lookup";
import useDocumentTitle from "../hooks/useDocumentTitle";

const prepayOf = (l) => l.charges.find((c) => /Prepayment/.test(c[0]))[1];
const COLUMNS = [
  { h: "Interest rate (p.a.)", label: "Interest rate", num: true, cell: (l) => <b>{rate(l.rate)} – {rate(l.rateTo)}</b> },
  { h: "Processing fee", cell: (l) => l.fee },
  { h: "Tenure", num: true, cell: tenureRange },
  { h: "Prepayment / foreclosure", label: "Prepayment", style: { maxWidth: 300, fontSize: 13 }, cell: prepayOf }
];
const FACTORS = [
  ["gauge", "Credit score", "Scores above 750 get the lowest rates; below 650 can mean a higher rate or a decline."],
  ["briefcase", "Income & stability", "Higher, stable income and a well-rated employer or business lower the risk for the lender."],
  ["shield", "Security offered", "Secured loans (home, property, vehicle, securities) are cheaper than unsecured ones. A lower loan-to-value helps further."],
  ["rupee", "Amount & tenure", "Some lenders price larger and longer loans differently; shorter tenures cost less interest overall."],
  ["percent", "Benchmark rate", "Floating rates are linked to an external benchmark such as the RBI repo rate, plus the lender's spread."],
  ["handshake", "Relationship & offers", "Existing customers, salary-account holders and women borrowers may get special pricing from some lenders."]
];
const VS = [
  ["EMI", "Stays the same for the fixed period", "Changes when the benchmark rate changes"],
  ["Starting rate", "Usually higher", "Usually lower"],
  ["Prepayment", "May carry a charge as per the lender", "Nil for individuals on non-business loans (RBI)"],
  ["Best when", "You want certainty, or rates are expected to rise", "Rates are stable or expected to fall, and you can absorb changes"]
];
const RIGHTS = [
  ["A Key Fact Statement before you sign", "With the APR, all fees and the repayment schedule. Charges not in the KFS can't be levied without your consent."],
  ["No foreclosure charges on floating-rate loans", "For individuals borrowing for non-business purposes, as per RBI."],
  ["Penal charges, not penal interest", "Delays attract penal charges that are not added to the interest rate or compounded."],
  ["Choice at a rate reset", "When floating rates change, you can choose a higher EMI, a longer tenure (within limits), or switch to a fixed rate where offered."],
  ["Property papers back within 30 days", "Lenders must return original documents within 30 days of full repayment."],
  ["A way to complain", "Every lender has a grievance officer; unresolved complaints can go to the RBI Ombudsman."]
];

/** Interest rates & charges: rate table, charges per loan (?loan=), rate factors, fixed vs floating, borrower rights. */
export default function Rates() {
  useDocumentTitle("Interest Rates & Charges | First Advisors Loans", true);
  const [qp, setQp] = useSearchParams();
  const cur = getLoan(qp.get("loan")) || LOANS[0];

  return (
    <>
      <PageHero title={<>Interest Rates &amp; <em>Charges</em></>} crumbs={[["Interest Rates & Charges"]]} art="growth" lead="Indicative interest rates, fees and charges across our partner banks and NBFCs, with what decides your rate and your rights as a borrower." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="data-note reveal" style={{ marginBottom: 18 }}><Icon name="help" /><span>Indicative rates and charges across our lending partners as of <b>{date(CONFIG.ratesAsOf)}</b>. Your actual rate depends on the lender's credit assessment. GST applies to fees.</span></div>
          <RateTable id="rates" columns={COLUMNS} groups={[{ title: "Loans for you", loans: loansBySeg("you") }, { title: "Loans for business", loans: loansBySeg("business") }]} rowHead={loanUrl} action={applyUrl} />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Charges by <em>Loan Type</em></>} subtitle="Pick a loan to see its full schedule of charges" />
          <div className="opts flex reveal" style={{ justifyContent: "center", marginBottom: 20 }}>
            {LOANS.map((x) => <button type="button" className="chip" key={x.key} aria-pressed={x === cur} onClick={() => setQp({ loan: x.key }, { replace: true })}>{x.name}</button>)}
          </div>
          <div className="panel reveal narrow" style={{ maxWidth: 900, marginInline: "auto" }}>
            <div className="flex between" style={{ marginBottom: 10 }}>
              <h2 style={{ margin: 0 }}>{cur.name} <em>charges</em></h2>
              <Link className="link-arrow" to={loanUrl(cur) + "#charges"}>Full details <Icon name="arrow" /></Link>
            </div>
            <div className="table-x">
              <table className="charges-table">
                <thead><tr><th>Particulars</th><th>Charges</th></tr></thead>
                <tbody>{cur.charges.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle title={<>How Your Rate Is <em>Decided</em></>} subtitle="Lenders price each loan on your profile — here is what moves the number" />
          <div className="grid grid-3">
            {FACTORS.map(([icon, h, p], i) => (
              <div className="icard reveal" key={h} style={{ "--d": (i % 3) * 0.08 + "s", textAlign: "left", padding: 22 }}>
                <div className="ic" style={{ margin: "0 0 10px", color: "var(--accent)", width: 40, height: 40 }}><Icon name={icon} /></div>
                <h3>{h}</h3><p style={{ fontSize: 13.5 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container narrow">
          <SectionTitle title={<>Fixed vs Floating <em>Interest Rates</em></>} />
          <div className="vs-wrap reveal">
            <table className="vs-table">
              <thead><tr><th scope="col">Basis</th><th scope="col">Fixed rate</th><th scope="col">Floating rate</th></tr></thead>
              <tbody>{VS.map(([h, a, b]) => <tr key={h}><th scope="row">{h}</th><td>{a}</td><td>{b}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal from-left">
              <h3 className="col-title">Your rights as a <em>borrower</em></h3>
              <ul className="ticks ticks--1">{RIGHTS.map(([b, s]) => <li key={b}><Icon name="checkbox" /><div><b>{b}</b><span>{s}</span></div></li>)}</ul>
            </div>
            <div className="reveal from-right">
              <h3 className="col-title">Know these <em>terms</em></h3>
              <dl className="gloss gloss--2">{GLOSSARY.slice(0, 8).map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
