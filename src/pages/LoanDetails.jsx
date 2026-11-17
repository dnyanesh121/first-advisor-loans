import { Link, useParams } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import SectionTitle from "../components/common/SectionTitle";
import Accordion from "../components/common/Accordion";
import LoanCard from "../components/loan/LoanCard";
import EmiWidget from "../components/loan/EmiWidget";
import LoanHero, { twoTone } from "../components/LoanDetails/LoanHero";
import SubNav from "../components/LoanDetails/SubNav";
import ProfileTabs from "../components/LoanDetails/ProfileTabs";
import NotFound from "./NotFound";
import { CONFIG } from "../data/config";
import { LOANS } from "../data/loans";
import { date, rate, short, tenureRange } from "../utils/format";
import { applyUrl, getLoan } from "../utils/lookup";
import { useApp } from "../context/AppContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const SECTIONS = [["overview", "Overview"], ["features", "Features"], ["emi", "EMI Calculator"], ["eligibility", "Eligibility"], ["documents", "Documents"], ["charges", "Rates & Charges"], ["how", "How to Apply"], ["faqs", "FAQs"]];

/** Loan product page: overview, features, EMI, eligibility, documents, charges, steps, tips, FAQs, related. */
function LoanView({ loan: l }) {
  useDocumentTitle(`${l.name} — Rates, Eligibility & EMI | First Advisors Loans`, true);
  const { openConsult } = useApp();

  const how = [
    ["Apply online or call us", `Fill the short form or call ${CONFIG.phone}.`],
    ["Eligibility check", "We match your profile with suitable partner lenders and share offers with rate, fees and APR."],
    ["Documents & verification", "Upload documents or schedule a doorstep pick-up; the lender verifies them" + (l.secured ? " and values the security." : ".")],
    ["Sanction & agreement", "Review the sanction letter and Key Fact Statement, then sign the agreement."],
    ["Disbursal", "Funds are transferred " + (l.key === "home" || l.key === "lap" ? "to you or the seller/builder as agreed." : "to your bank account.")]
  ];
  const tips = [
    ["Check your credit score", "A score above 750 improves approval chances and pricing."],
    ["Keep EMIs within 50% of income", "Close small loans or card dues before applying if you can."],
    ["Apply with one lender at a time", "Several applications at once lower your score."],
    ["Keep documents consistent", "Same name, address and date of birth across KYC, bank and income documents."],
    l.secured ? ["Check the security's papers early", "Clear title and approvals speed up legal and technical checks."] : ["Add a co-applicant if needed", "An earning co-applicant can raise the eligible amount."]
  ];
  const faqs = l.faqs.concat([
    { q: `What is the interest rate on a ${l.name.toLowerCase()}?`, a: `Rates start from about ${rate(l.rate)} p.a. and can go up to ${rate(l.rateTo)} depending on the lender, your credit score, income and the loan amount. Your exact rate and APR are in the lender's Key Fact Statement.` },
    { q: "How long does it take to get the money?", a: `Typically ${l.disbursal} after you submit complete documents, subject to the lender's verification.` }
  ]);
  const side = [["Interest rate", rate(l.rate) + " – " + rate(l.rateTo)], ["Loan amount", short(l.min) + " – " + short(l.max)], ["Tenure", tenureRange(l)], ["Processing fee", l.fee], ["Disbursal", l.disbursal], ["Collateral", l.secured ? "Required" : "Not required"]];
  const related = LOANS.filter((x) => x.seg === l.seg && x !== l).slice(0, 3);
  const typesTitle = "Types of " + l.name.replace(/ Loan$/, " loans").replace(/ & Leasing$/, " & leasing");

  return (
    <>
      <LoanHero loan={l} />
      <SubNav sections={SECTIONS} />

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="pd-layout" style={{ marginTop: 0 }}>
            <div>
              <div className="panel reveal" id="overview">
                <h2>About {twoTone(l.name)}</h2>
                <p className="ld-intro">{l.intro}</p>
                <h3 className="ld-h3">{typesTitle}</h3>
                <div className="var-grid">
                  {l.variants.map(([name, text, icon]) => <div className="var-card" key={name}><span className="ic"><Icon name={icon} /></span><div><b>{name}</b><span>{text}</span></div></div>)}
                </div>
              </div>
              <div className="panel reveal" id="features">
                <h2>Features &amp; <em>Benefits</em></h2>
                <div className="feat-grid">
                  {l.features.map(([icon, b, p]) => <div className="fb" key={b}><span className="ic"><Icon name={icon} /></span><b>{b}</b><p>{p}</p></div>)}
                </div>
              </div>
              <div className="panel reveal" id="emi">
                <h2>EMI <em>Calculator</em></h2>
                <div><EmiWidget loan={l} compact /></div>
                <p className="muted" style={{ fontSize: 12, margin: "12px 0 0" }}>Calculated on a reducing balance at the rate you choose. Your actual rate depends on the lender's assessment.</p>
              </div>
              <div className="panel reveal" id="eligibility">
                <h2>Eligibility <em>Criteria</em></h2>
                <ProfileTabs data={l.elig} render={(rows) => (
                  <div><dl className="elig-list">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
                )} />
              </div>
              <div className="panel reveal" id="documents">
                <h2>Documents <em>Required</em></h2>
                <ProfileTabs data={l.docs} render={(rows) => (
                  <ul className="doc-list">{rows.map((d) => <li key={d}><Icon name="checkbox" /><span>{d}</span></li>)}</ul>
                )} />
                <p className="muted" style={{ fontSize: 12, margin: "12px 0 0" }}>Lenders may ask for additional documents depending on your profile.</p>
              </div>
              <div className="panel reveal" id="charges">
                <h2>Interest Rates &amp; <em>Charges</em></h2>
                <div className="table-x">
                  <table className="charges-table">
                    <thead><tr><th>Particulars</th><th>Charges</th></tr></thead>
                    <tbody>{l.charges.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
                  </table>
                </div>
                <p className="muted" style={{ fontSize: 12, margin: "12px 0 0" }}>Indicative ranges across our lending partners as of {date(CONFIG.ratesAsOf)}. GST applies to fees and charges. Interest is charged on a reducing balance.</p>
              </div>
              <div className="panel reveal" id="how">
                <h2>How to <em>Apply</em></h2>
                <ol className="kyc-steps ld-steps">{how.map(([b, t]) => <li key={b}><div><b>{b}</b>{t}</div></li>)}</ol>
              </div>
              <div className="panel reveal" id="tips">
                <h2>Tips for a <em>Faster Approval</em></h2>
                <ul className="ticks ticks--1">{tips.map(([b, t]) => <li key={b}><Icon name="checkbox" /><div><b>{b}</b><span>{t}</span></div></li>)}</ul>
              </div>
              <div className="panel reveal" id="faqs">
                <h2>Frequently Asked <em>Questions</em></h2>
                <Accordion items={faqs} />
              </div>
            </div>
            <aside className="pd-side">
              <div className="panel ld-side">
                <h2 style={{ fontSize: 18, marginBottom: 12 }}>{l.name} <em>at a glance</em></h2>
                <dl className="ld-kv num">{side.map(([k, v]) => [<dt key={k + "t"}>{k}</dt>, <dd key={k + "d"}>{v}</dd>])}</dl>
                <div className="stack mt-4">
                  <Link className="btn btn--primary btn--block" to={applyUrl(l)}>Apply Now</Link>
                  <button type="button" className="btn btn--outline btn--block" onClick={openConsult}>Talk to an Advisor</button>
                </div>
                <p className="muted" style={{ fontSize: 11.5, margin: "12px 0 0" }}>Indicative terms. The lender's sanction letter and Key Fact Statement are final.</p>
              </div>
              <div className="panel" style={{ background: "var(--grad-navy)", color: "#fff" }}>
                <b style={{ display: "block", fontSize: 16 }}>Know your credit score</b>
                <p style={{ fontSize: 13, opacity: 0.85, margin: "6px 0 12px" }}>A score above 750 usually gets you the best rates.</p>
                <Link className="btn btn--white btn--sm" to="/credit-score">Check credit score</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle title={l.seg === "business" ? <>Other Loans <em>for Business</em></> : <>Other Loans <em>for You</em></>} subtitle={l.seg === "you" ? "More ways to fund your plans" : "More finance options for your business"} />
          <div className="loan-grid">{related.map((x, i) => <LoanCard key={x.key} loan={x} index={i} />)}</div>
        </div>
      </section>
    </>
  );
}

export default function LoanDetails() {
  const { type } = useParams();
  const loan = getLoan(type);
  if (!loan) return <NotFound />;
  return <LoanView key={loan.key} loan={loan} />;
}
