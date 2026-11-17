import { useState } from "react";
import Icon from "../assets/icons/Icon";
import Clouds from "../components/common/Clouds";
import Breadcrumbs from "../components/common/Breadcrumbs";
import SectionTitle from "../components/common/SectionTitle";
import Accordion from "../components/common/Accordion";
import ScoreGauge, { bandOf } from "../components/CreditScore/ScoreGauge";
import ValidatedForm, { SubmitButton } from "../components/Forms/ValidatedForm";
import Field, { CheckLabel } from "../components/Forms/Field";
import { SCORE_BANDS } from "../data/content";
import useDocumentTitle from "../hooks/useDocumentTitle";

const FACTORS = [
  ["calendar", "Payment history", "High impact", "Paying every EMI and card bill on time, every time."],
  ["card", "Credit utilisation", "High impact", "How much of your card limits you use. Keep it under 30%."],
  ["clock", "Length of credit history", "Medium impact", "Older accounts in good standing help your score."],
  ["layers", "Credit mix", "Medium impact", "A healthy mix of secured and unsecured credit."],
  ["search", "Recent enquiries", "Medium impact", "Many loan or card applications in a short time lower your score."],
  ["doc", "Errors & disputes", "Varies", "Wrong entries on your report can pull your score down until corrected."]
];
const TIPS = [
  ["Set up auto-debit for every EMI", "Late payments do the most damage and stay on your report for years."],
  ["Pay card bills in full", "Or at least well above the minimum, and before the due date."],
  ["Space out applications", "Apply for new credit only when you need it, and through one advisor."],
  ["Keep old cards active", "Use them lightly and pay in full to keep a long history."],
  ["Check your report twice a year", "Dispute errors with the bureau; it must resolve them within 30 days."]
];
const MYTHS = [
  ["Checking my own score lowers it.", "A self-check is a soft enquiry and does not affect your score."],
  ["Closing a loan early hurts my score.", "Closing a loan with all dues paid is positive. Closing your oldest card can slightly reduce history length."],
  ["Income affects my score.", "Income is not part of the score, though lenders look at it separately."],
  ["A settled loan is as good as a closed one.", "'Settled' means you paid less than due. It is viewed negatively; aim for 'closed'."]
];
const FAQS = [
  { q: "What is a good credit score?", a: "Scores range from 300 to 900. Most lenders see 750 and above as excellent, 650–749 as good, and below 650 as needing improvement." },
  { q: "How often is my score updated?", a: "Lenders report to credit bureaus at least monthly, so your score can change every month as new information arrives." },
  { q: "I have no credit history. Can I get a loan?", a: "Yes, but options are fewer. A secured card, a small secured loan or a co-applicant with a good score can help you build a history." },
  { q: "How long does it take to improve my score?", a: "Clearing overdue amounts and reducing card usage can show results in 2–3 months. Recovering from defaults takes longer, often 12 months or more of clean repayment." },
  { q: "How do I get a wrong entry corrected?", a: "Raise a dispute with the credit bureau online. Lenders and bureaus must resolve it within 30 days under RBI rules, failing which compensation applies." }
];
const likely = (s) => (s >= 750 ? "Personal, home, vehicle and business loans at the best rates on offer." : s >= 650 ? "Most secured loans; personal and business loans at moderate rates." : s >= 550 ? "Secured loans such as gold, property or vehicle loans, or loans with a co-applicant." : "Focus on clearing dues first. A secured card or small secured loan can help rebuild.");

/** Credit score: report request, score explorer, bands, factors, tips, myths, FAQs. */
export default function CreditScore() {
  useDocumentTitle("Check Your Credit Score | First Advisors Loans", true);
  const [score, setScore] = useState(760);
  const band = bandOf(score);

  return (
    <>
      <section className="page-hero cs-hero">
        <Clouds n={6} />
        <div className="container">
          <Breadcrumbs className="rise" crumbs={[["Check Credit Score"]]} />
          <div className="ld-grid">
            <div>
              <h1 className="rise d1">Check Your <em>Credit Score</em></h1>
              <p className="lead rise d2">Your credit score decides whether you get a loan and at what rate. Request your free credit report, understand what it means and learn how to improve it before you apply.</p>
              <ul className="cs-points rise d3">
                <li><Icon name="check" />Checking your own score does not lower it</li>
                <li><Icon name="check" />Report explained by an advisor</li>
                <li><Icon name="check" />Loan options that match your score</li>
              </ul>
            </div>
            <div className="form-card ld-form rise d2">
              <h2 style={{ fontSize: 19, marginBottom: 4 }}>Get your <em className="hl">free credit report</em></h2>
              <p className="muted" style={{ fontSize: 13, marginBottom: 16 }}>We'll fetch it with your consent and walk you through it.</p>
              <ValidatedForm className="stack" successTitle="Request received" success="On the live site your report is fetched from a credit bureau with your consent. An advisor will call to explain it. (Demo: nothing was sent.)">
                <Field id="cs-name" label="Full name (as on PAN)" required autoComplete="name" />
                <Field id="cs-pan" label="PAN" pan required placeholder="ABCDE1234F" />
                <Field id="cs-phone" label="Mobile number" phone required autoComplete="tel" />
                <CheckLabel id="cs-consent" required>I consent to First Advisors fetching my credit report from a credit bureau for this request.</CheckLabel>
                <SubmitButton className="btn btn--primary btn--block">Get My Report</SubmitButton>
              </ValidatedForm>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle title={<>What Does Your <em>Score Mean?</em></>} subtitle="Move the slider to see how lenders typically view a score" />
          <div className="score-box reveal">
            <div className="score-gauge"><ScoreGauge score={score} /></div>
            <div className="score-info">
              <div className="slider-field">
                <div className="top"><label htmlFor="scoreIn">Credit score</label><b className="num">{score}</b></div>
                <input type="range" id="scoreIn" min="300" max="900" step="5" value={score} onChange={(e) => setScore(+e.target.value)} />
                <div className="ends"><span>300</span><span>900</span></div>
              </div>
              <div>
                <span className="badge" style={{ background: band.color, color: "#fff" }}>{band.label}</span>
                <p style={{ margin: "10px 0" }}>{band.text}</p>
                <p className="muted" style={{ fontSize: 13.5, margin: 0 }}><b style={{ color: "var(--navy)" }}>Likely options:</b> {likely(score)}</p>
              </div>
            </div>
          </div>
          <div className="band-grid">
            {SCORE_BANDS.map((b, i) => (
              <div className="band reveal" key={b.label} style={{ "--d": i * 0.06 + "s", "--c": b.color }}><b className="num">{b.from}–{b.to}</b><span>{b.label}</span><p>{b.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>What Affects Your <em>Credit Score</em></>} />
          <div className="grid grid-3">
            {FACTORS.map(([icon, h, impact, p], i) => (
              <div className="icard reveal" key={h} style={{ "--d": (i % 3) * 0.08 + "s", textAlign: "left", padding: 22 }}>
                <div className="ic" style={{ margin: "0 0 10px", color: "var(--accent)", width: 40, height: 40 }}><Icon name={icon} /></div>
                <h3>{h}</h3>
                <span className="badge badge--soft" style={{ marginTop: 6 }}>{impact}</span>
                <p style={{ fontSize: 13.5, marginTop: 8 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="reveal from-left">
            <h3 className="col-title">How to <em>improve it</em></h3>
            <ul className="ticks ticks--1">{TIPS.map(([b, s]) => <li key={b}><Icon name="checkbox" /><div><b>{b}</b><span>{s}</span></div></li>)}</ul>
          </div>
          <div className="reveal from-right">
            <h3 className="col-title">Myths vs <em>facts</em></h3>
            <div className="myths">
              {MYTHS.map(([m, f]) => <div className="myth" key={m}><p className="m"><b>Myth</b>{m}</p><p className="f"><b>Fact</b>{f}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container narrow">
          <SectionTitle title={<>Credit Score <em>FAQs</em></>} />
          <Accordion items={FAQS} />
        </div>
      </section>
    </>
  );
}
