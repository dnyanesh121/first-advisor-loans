import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Field, { CheckLabel } from "../Forms/Field";
import { FormErrorsProvider, useValidation } from "../Forms/ValidatedForm";
import { LOANS } from "../../data/loans";
import { emi } from "../../utils/loanMath";
import { inr, rate, short, tenure } from "../../utils/format";
import { loanUrl } from "../../utils/lookup";
import { apps, newRef } from "../../utils/applications";
import { useApp } from "../../context/AppContext";

const STEPS = ["Loan", "About you", "Income", "Review"];
const TOTAL = STEPS.length;
const PURPOSE = {
  you: ["Wedding", "Travel", "Medical", "Home purchase", "Home construction / renovation", "Vehicle purchase", "Education", "Business needs", "Debt consolidation", "Other"],
  business: ["Working capital", "Machinery / equipment", "Expansion", "Vehicle / fleet", "Refinance existing loan", "Other"]
};
const DEFAULT_PURPOSE = { home: "Home purchase", lap: "Business needs", business: "Business needs", "used-car": "Vehicle purchase", "new-car": "Vehicle purchase", "two-wheeler": "Vehicle purchase", education: "Education", las: "Other", personal: "Wedding", "commercial-vehicle": "Vehicle / fleet", equipment: "Machinery / equipment", "construction-equipment": "Machinery / equipment" };
const EXPERIENCE = ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "More than 10 years"];

/** tenure options for a loan, with the one nearest its default selected */
function tenureOptions(l) {
  const opts = [];
  for (let m = l.tMin; m <= l.tMax; m += l.tMax > 120 ? 60 : l.tMax <= 12 ? 3 : 12) opts.push(m);
  if (opts[opts.length - 1] !== l.tMax) opts.push(l.tMax);
  const near = opts.reduce((a, o) => (Math.abs(o - l.def.t) < Math.abs(a - l.def.t) ? o : a), opts[0]);
  return { opts, near };
}
const scrollTo = () => document.querySelector(".ap-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });

/** Four-step application: loan → about you → income → review & consent. Saves a reference for tracking. */
export default function ApplicationForm({ loan, onLoan }) {
  const { copy } = useApp();
  const v = useValidation();
  const formRef = useRef(null);
  const [step, setStep] = useState(1);
  const [emp, setEmp] = useState(loan.seg === "business" ? "Business" : "Salaried");
  const [d, setD] = useState(() => ({ amount: String(loan.def.amt), tenure: tenureOptions(loan).near, purpose: DEFAULT_PURPOSE[loan.key] || PURPOSE[loan.seg][0], emis: "0", income: "", co: false }));
  const [amtErr, setAmtErr] = useState("");
  const [done, setDone] = useState(null);
  const upd = (k) => (e) => setD((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const { opts } = tenureOptions(loan);

  const pickLoan = (l) => {
    onLoan(l);
    setD((x) => ({ ...x, amount: String(l.def.amt), tenure: tenureOptions(l).near, purpose: DEFAULT_PURPOSE[l.key] || PURPOSE[l.seg][0] }));
    if (l.seg === "business") setEmp("Business");
    setAmtErr("");
  };
  const amtCheck = (val = d.amount) => {
    const n = parseInt(val, 10) || 0;
    const msg = !n ? "Loan amount is required." : n < loan.min || n > loan.max ? `Enter an amount between ${short(loan.min)} and ${short(loan.max)}.` : "";
    setAmtErr(msg);
    return !msg;
  };
  const field = (id) => formRef.current?.elements[id]?.value?.trim() || "";

  const submit = (e) => {
    e.preventDefault();
    const cur = formRef.current.querySelector(`.ap-step[data-step="${step}"]`);
    let ok = v.validate(cur);
    if (step === 1) ok = amtCheck() && ok;
    if (step === 2 && ok) {
      const age = (Date.now() - new Date(field("ap-dob"))) / 3.15576e10;
      const msg = age < 18 ? "You must be at least 18 years old." : age > 80 ? "Please check the date of birth." : "";
      if (msg) { v.setError("ap-dob", msg); document.getElementById("ap-dob")?.focus(); ok = false; }
    }
    if (!ok) return;
    if (step < TOTAL) { setStep(step + 1); scrollTo(); return; }
    const app = {
      type: loan.key, amount: +d.amount, tenure: +d.tenure, purpose: d.purpose, name: field("ap-name"), dob: field("ap-dob"), pan: field("ap-pan").toUpperCase(),
      phone: field("ap-phone"), email: field("ap-email"), city: field("ap-city"), pin: field("ap-pin"), emp, income: +d.income || 0, emis: +d.emis || 0,
      org: field("ap-org"), exp: field("ap-exp"), coApplicant: d.co, ref: newRef(), date: new Date().toISOString(), stage: 1, source: "full"
    };
    apps.add(app);
    setDone(app);
    scrollTo();
  };

  const review = () => {
    const f = formRef.current?.elements;
    if (!f) return null;
    const val = (id) => f[id]?.value?.trim() || "";
    const pan = val("ap-pan").toUpperCase(), maskPan = pan.slice(0, 2) + "XXXX" + pan.slice(6);
    const rows = [["Loan", loan.name], ["Amount", inr(+d.amount)], ["Tenure", tenure(+d.tenure)], ["Purpose", d.purpose], ["Name", val("ap-name")], ["Mobile", val("ap-phone")], ["Email", val("ap-email")], ["PAN", maskPan], ["City", val("ap-city") + " " + val("ap-pin")], ["Employment", emp + (val("ap-org") ? " · " + val("ap-org") : "")], [emp === "Business" ? "Monthly turnover" : "Monthly income", inr(+d.income || 0)], ["Existing EMIs", inr(+d.emis || 0)]];
    const e = emi(+d.amount, loan.rate, +d.tenure), foir = emp !== "Business" && +d.income ? ((e + (+d.emis || 0)) / +d.income) * 100 : null;
    return (
      <>
        <dl className="review" id="review">
          {rows.map(([k, x], i) => (
            <div key={k}><dt>{k}</dt><dd>{x} <button type="button" className="link" onClick={() => { setStep(i < 4 ? 1 : i < 9 ? 2 : 3); scrollTo(); }}>Edit</button></dd></div>
          ))}
        </dl>
        <div className="ap-est" id="est"><Icon name="calc" /><div><b>Estimated EMI: {inr(e)}/month</b><span>At the starting rate of {rate(loan.rate)} p.a. Your actual rate and EMI are set by the lender.{foir ? ` Total EMIs would be about ${foir.toFixed(0)}% of your income${foir > 60 ? " — a longer tenure or co-applicant may help." : "."}` : ""}</span></div></div>
      </>
    );
  };

  const stepClass = (n) => (done || n < step ? "done" : n === step ? "cur" : "");
  const docs = loan.docs[Object.keys(loan.docs)[0]];

  return (
    <div className="pd-layout" style={{ marginTop: 20 }}>
      <div className="panel ap-panel">
        <ol className="stepper" id="stepper">
          {STEPS.map((s, i) => (
            <li key={s} className={stepClass(i + 1)} aria-current={!done && i + 1 === step ? "step" : undefined}>
              <span>{done || i + 1 < step ? <Icon name="check" /> : i + 1}</span><b>{s}</b>
            </li>
          ))}
        </ol>
        <FormErrorsProvider value={v}>
          <form id="apForm" noValidate ref={formRef} onSubmit={submit} hidden={!!done}>
            <div className="ap-step" data-step="1" hidden={step !== 1}>
              <h2>Which loan do you <em>need?</em></h2>
              <div className="type-grid" role="radiogroup" aria-label="Loan type">
                {LOANS.map((l) => <button type="button" role="radio" className="type-card" key={l.key} aria-checked={l.key === loan.key} onClick={() => pickLoan(l)}><Icon name={l.icon} /><span>{l.name}</span></button>)}
              </div>
              <div className="form-grid mt-6">
                <div className={`field${amtErr ? " has-error" : ""}`}>
                  <label htmlFor="ap-amt">Loan amount</label>
                  <div className="amt-input"><span>₹</span><input className="input num" id="ap-amt" inputMode="numeric" value={d.amount} onChange={(e) => { const x = e.target.value.replace(/\D/g, ""); setD((s) => ({ ...s, amount: x })); amtCheck(x); }} /></div>
                  <span className="err" id="ap-amt-err">{amtErr}</span>
                </div>
                <Field id="ap-ten" label="Preferred tenure" as="select" value={d.tenure} onChange={upd("tenure")} options={opts.map((o) => [o, tenure(o)])} />
                <Field id="ap-purpose" label="Purpose" as="select" full value={d.purpose} onChange={upd("purpose")} options={PURPOSE[loan.seg]} />
              </div>
            </div>

            <div className="ap-step" data-step="2" hidden={step !== 2}>
              <h2>About <em>you</em></h2>
              <div className="form-grid">
                <Field id="ap-name" label="Full name (as on PAN)" required autoComplete="name" />
                <Field id="ap-dob" label="Date of birth" type="date" required />
                <Field id="ap-pan" label="PAN" pan required placeholder="ABCDE1234F" />
                <Field id="ap-phone" label="Mobile number" phone required autoComplete="tel" />
                <Field id="ap-email" label="Email address" type="email" required autoComplete="email" />
                <Field id="ap-city" label="City" required autoComplete="address-level2" />
                <Field id="ap-pin" label="PIN code" pin required autoComplete="postal-code" />
              </div>
            </div>

            <div className="ap-step" data-step="3" hidden={step !== 3}>
              <h2>Your <em>income</em></h2>
              <span className="label" style={{ display: "block", marginBottom: 8 }}>Employment type</span>
              <div className="seg" role="group" aria-label="Employment type">
                {["Salaried", "Self-employed", "Business"].map((x) => <button type="button" key={x} aria-pressed={emp === x} onClick={() => setEmp(x)}>{x}</button>)}
              </div>
              <div className="form-grid mt-6">
                <Field id="ap-inc" label={emp === "Business" ? "Average monthly turnover" : emp === "Self-employed" ? "Average monthly income (as per ITR)" : "Net monthly income"} prefix="₹" inputMode="numeric" required value={d.income} onChange={(e) => setD((s) => ({ ...s, income: e.target.value.replace(/\D/g, "") }))} />
                <Field id="ap-emi" label="Existing EMIs per month" prefix="₹" inputMode="numeric" value={d.emis} onChange={(e) => setD((s) => ({ ...s, emis: e.target.value.replace(/\D/g, "") }))} />
                <Field id="ap-org" label={emp === "Salaried" ? "Employer name" : "Business / practice name"} required />
                <Field id="ap-exp" label={emp === "Salaried" ? "Total work experience" : "Business vintage"} as="select" options={EXPERIENCE} />
                <label className="check full"><input type="checkbox" id="ap-co" checked={d.co} onChange={upd("co")} /> I'd like to add a co-applicant (an advisor will collect their details)</label>
              </div>
            </div>

            <div className="ap-step" data-step="4" hidden={step !== 4}>
              <h2>Review &amp; <em>submit</em></h2>
              {step === 4 && review()}
              <div className="stack mt-4">
                <CheckLabel id="ap-c1" required>I confirm the details are correct and authorise First Advisors and its lending partners to contact me, overriding DND.</CheckLabel>
                <CheckLabel id="ap-c2" required>I consent to my credit report being fetched by the lending partner(s) for this application.</CheckLabel>
              </div>
            </div>

            <div className="ap-nav">
              <button type="button" className="btn btn--ghost" hidden={step === 1} onClick={() => setStep(Math.max(1, step - 1))}>← Back</button>
              <span className="muted" style={{ fontSize: 13 }}>Step {step} of {TOTAL}</span>
              <button type="submit" className="btn btn--primary" id="next">{step === TOTAL ? "Submit Application" : "Continue"}</button>
            </div>
          </form>
        </FormErrorsProvider>
        {done && (
          <div>
            <div className="ap-done">
              <span className="tick"><Icon name="check" /></span>
              <h2>Application <em>submitted</em></h2>
              <p>Thank you, {done.name.split(" ")[0]}. Your reference number is</p>
              <div className="ref num">{done.ref}</div>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => copy(done.ref, "Reference copied")}><Icon name="link" />Copy reference</button>
              <ol className="kyc-steps" style={{ textAlign: "left", maxWidth: 460, margin: "24px auto 0" }}>
                <li><div><b>Advisor call within one working day</b>We confirm your details and requirement.</div></li>
                <li><div><b>Offers from suitable lenders</b>With rate, fees and APR for each.</div></li>
                <li><div><b>Documents &amp; sanction</b>Doorstep pick-up or upload, then the lender's sanction letter and KFS.</div></li>
              </ol>
              <div className="flex mt-6" style={{ justifyContent: "center" }}>
                <Link className="btn btn--primary" to={`/apply/track?ref=${done.ref}`}>Track application</Link>
                <Link className="btn btn--outline" to={loanUrl(loan) + "#documents"}>Keep documents ready</Link>
              </div>
              <p className="muted" style={{ fontSize: 12, marginTop: 16 }}>Demo: nothing was sent. On the live site this goes to your CRM / lending-partner API.</p>
            </div>
          </div>
        )}
      </div>
      <aside className="pd-side">
        <div className="panel">
          <h2 style={{ fontSize: 17 }}>Documents for <em>{loan.name}</em></h2>
          <ul className="doc-list" style={{ fontSize: 13 }}>{docs.map((x) => <li key={x}><Icon name="checkbox" /><span>{x}</span></li>)}</ul>
          <Link className="link-arrow mt-4" to={loanUrl(loan) + "#documents"} style={{ display: "inline-flex" }}>All details <Icon name="arrow" /></Link>
        </div>
        <SidePanels />
      </aside>
    </div>
  );
}

function SidePanels() {
  const { openConsult } = useApp();
  return (
    <>
      <div className="panel" style={{ background: "var(--grad-navy)", color: "#fff" }}>
        <b style={{ display: "block", fontSize: 16 }}>Prefer to talk?</b>
        <p style={{ fontSize: 13, opacity: 0.85, margin: "6px 0 12px" }}>Call us toll free or request a callback.</p>
        <div className="flex"><a className="btn btn--white btn--sm" href="tel:18008909195">Call 1800-890-9195</a><button type="button" className="btn btn--primary btn--sm" onClick={openConsult}>Callback</button></div>
      </div>
      <div className="disclaimer" style={{ margin: 0 }}><b>Safe borrowing</b>We never ask for an upfront payment, OTP or UPI PIN. Your details go only to the lenders you agree to.</div>
    </>
  );
}
