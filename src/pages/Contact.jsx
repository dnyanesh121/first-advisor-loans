import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import InfoCard from "../components/common/InfoCard";
import ValidatedForm, { SubmitButton } from "../components/Forms/ValidatedForm";
import Field, { CheckLabel } from "../components/Forms/Field";
import { CONFIG as C } from "../data/config";
import { LOANS } from "../data/loans";
import { BRANCHES } from "../data/branches";
import { getLoan } from "../utils/lookup";
import useDocumentTitle from "../hooks/useDocumentTitle";

const TIMES = ["Morning", "Afternoon", "Evening"];
const CITIES = ["All", ...BRANCHES.map((b) => b.city).filter((c, i, a) => a.indexOf(c) === i)];
const LEVELS = [
  ["Level 1", "Customer care", `Call ${C.phone} or email ${C.email}. We acknowledge within 2 working days and aim to resolve within 7.`, "phone"],
  ["Level 2", "Grievance Redressal Officer", `If unresolved, write to our Grievance Redressal Officer, ${C.grievanceOfficer}, at ${C.grievanceEmail}.`, "user2"],
  ["Level 3", "Your lender", "For loan account issues, escalate to the lending partner's grievance officer (details are in your sanction letter and KFS).", "bank"],
  ["Level 4", "RBI Ombudsman", "If the lender does not resolve your complaint within 30 days, or you are unhappy with the reply, you can complain under the RBI Integrated Ombudsman Scheme at cms.rbi.org.in.", "shield"]
];

/** Contact: callback form (?loan= pre-selects), contact cards, branch locator, grievance levels, fraud advisory. */
export default function Contact() {
  useDocumentTitle("Contact Us, Branches & Grievance Redressal | First Advisors Loans", true);
  const [qp] = useSearchParams();
  const pre = getLoan(qp.get("loan"));
  const [time, setTime] = useState(TIMES[0]);
  const [city, setCity] = useState("All");

  return (
    <>
      <PageHero title={<>Contact <em>Us</em></>} crumbs={[["Contact & Branches"]]} art="personal" lead="Talk to a loan advisor, visit a branch, or raise a service request or complaint. We usually call back within one working day." />
      <section className="section">
        <div className="container contact-grid">
          <div className="form-card reveal">
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>Request a <em className="hl">callback</em></h2>
            <p className="muted" style={{ fontSize: 14, marginBottom: 22 }}>Tell us what you need and an advisor will call you.</p>
            <ValidatedForm className="form-grid" successTitle="Thank you" success="A loan advisor will call you within one working day.">
              <Field id="c-name" label="Full Name" name="name" required autoComplete="name" />
              <Field id="c-phone" label="Mobile Number" phone required autoComplete="tel" />
              <Field id="c-email" label="Email Address" type="email" required autoComplete="email" />
              <Field id="c-city" label="City" placeholder="e.g. Pune" />
              <Field id="c-type" label="Request type" as="select" options={["New loan enquiry", "Balance transfer / top-up", "Application status", "Statement / NOC / documents", "Complaint", "Partner with us"]} />
              <Field id="c-loan" label="Loan" as="select" defaultValue={pre ? pre.name : undefined} options={[...LOANS.map((l) => l.name), "Not sure yet"]} />
              <Field id="c-msg" label="Message (optional)" as="textarea" full placeholder="Anything you'd like us to know before we call" />
              <div className="field full">
                <span className="label">Preferred time</span>
                <div className="opts flex">{TIMES.map((t) => <button type="button" className="chip" key={t} aria-pressed={t === time} onClick={() => setTime(t)}>{t}</button>)}</div>
                <input type="hidden" name="time" value={time} />
              </div>
              <CheckLabel id="c-consent" className="full" required>I agree to be contacted by First Advisors about my request.</CheckLabel>
              <div className="full submit-row"><SubmitButton className="btn btn--primary btn--lg">Request Callback</SubmitButton></div>
            </ValidatedForm>
          </div>
          <div className="stack">
            <InfoCard icon="phone" title="Toll free" className="from-right" index={0} cols={99}><a href={`tel:${C.phoneRaw}`}>{C.phone}</a></InfoCard>
            <InfoCard icon="whats" title="WhatsApp" className="from-right" index={1} cols={99}><a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat with an advisor</a></InfoCard>
            <InfoCard icon="mail" title="Email" className="from-right" index={2} cols={99}><a href={`mailto:${C.email}`}>{C.email}</a></InfoCard>
            <InfoCard icon="pin" title="Head office" className="from-right" index={3} cols={99}><span>{C.address}</span></InfoCard>
            <InfoCard icon="clock" title="Working hours" className="from-right" index={4} cols={99}><span>{C.hours}</span></InfoCard>
          </div>
        </div>
      </section>

      <section className="section section--white" id="branches">
        <div className="container">
          <SectionTitle title={<>Our <em>Branches</em></>} subtitle="Walk in for advice, document submission or service requests" note="Branch list other than head office is a placeholder — replace with real addresses" />
          <div className="opts flex reveal" style={{ justifyContent: "center", marginBottom: 20 }}>
            {CITIES.map((c) => <button type="button" className="chip" key={c} aria-pressed={c === city} onClick={() => setCity(c)}>{c}</button>)}
          </div>
          <div className="offices">
            {BRANCHES.filter((b) => city === "All" || b.city === city).map((b) => (
              <div className={"office" + (b.hq ? " hq" : "")} key={b.name}>
                {b.hq && <span className="badge badge--accent" style={{ marginBottom: 8 }}>Head office</span>}
                <b>{b.name}</b><span className="muted" style={{ fontSize: 12 }}>{b.city}</span>
                <p>{b.address}</p>
                <a className="link-arrow" href={`tel:${b.phone.replace(/\D/g, "")}`}><Icon name="phone" />{b.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="grievance">
        <div className="container">
          <SectionTitle title={<>Grievance <em>Redressal</em></>} subtitle="If something isn't right, here is how to escalate" />
          <div className="levels">
            {LEVELS.map(([lv, b, p, icon], i) => <div className="level reveal" key={lv} style={{ "--d": i * 0.08 + "s" }}><span className="ic"><Icon name={icon} /></span><small>{lv}</small><b>{b}</b><p>{p}</p></div>)}
          </div>
          <div className="disclaimer reveal" style={{ marginTop: 28 }}><b>Fraud advisory</b>First Advisors and its lending partners never ask for advance fees, OTPs, UPI PINs or passwords to process a loan, and never ask you to pay into an individual's account. If you receive such a request, do not pay. Report it to us on <a className="link" href="tel:18008909195">1800-890-9195</a> and to the National Cyber Crime helpline 1930 or cybercrime.gov.in.</div>
        </div>
      </section>
    </>
  );
}
