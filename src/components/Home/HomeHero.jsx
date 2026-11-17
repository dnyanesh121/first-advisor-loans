import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Clouds from "../common/Clouds";
import { emi } from "../../utils/loanMath";
import { inr, rate, tenure } from "../../utils/format";
import { applyUrl, calcUrl, getLoan, loanUrl } from "../../utils/lookup";
import { useApp } from "../../context/AppContext";

const PILLS = ["personal", "home", "lap", "new-car"].map(getLoan);
const Q_KEYS = ["personal", "home", "new-car", "business", "lap"];
const tabLabel = (l) => l.name.replace(" Loan", "").replace("Loan Against Property", "LAP");

/** slider limits for the quick EMI card */
function limits(l) {
  const step = l.max > 2e7 ? 100000 : 10000, tStep = l.tMax > 120 ? 12 : 6;
  return { min: l.min, max: Math.min(l.max, l.key === "home" || l.key === "lap" ? 30000000 : l.max), step, tMin: Math.max(l.tMin, tStep), tMax: l.tMax, tStep };
}

/** Home hero: headline, mobile-number offer check, starting-rate pills and a quick EMI card. */
export default function HomeHero() {
  const { openApply } = useApp();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [loan, setLoan] = useState(getLoan(Q_KEYS[0]));
  const [amt, setAmt] = useState(loan.def.amt);
  const [ten, setTen] = useState(loan.def.t);
  const lim = limits(loan);

  const pick = (k) => { const l = getLoan(k); setLoan(l); setAmt(l.def.amt); setTen(l.def.t); };
  const submit = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) { setError(true); document.getElementById("startPhone")?.focus(); return; }
    setError(false);
    openApply(loan.key, { phone });
  };

  return (
    <section className="mf-hero ln-hero" aria-label="Introduction">
      <Clouds n={8} />
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow rise">First Advisors Loans</span>
            <h1 className="rise d1" style={{ marginTop: 14 }}>The right loan, <em>from the right lender.</em></h1>
            <p className="lead rise d2">Personal, home, vehicle, property and business loans from our partner banks and NBFCs. We compare offers, explain every charge and stay with you from application to disbursal.</p>
            <form id="startForm" className={`start-form rise d3${error ? " has-error" : ""}`} noValidate aria-label="Check your loan offers" onSubmit={submit}>
              <span className="pfx">+91</span>
              <label className="sr-only" htmlFor="startPhone">Mobile number</label>
              <input id="startPhone" inputMode="numeric" maxLength={10} placeholder="Enter mobile number" autoComplete="tel" value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setError(false); }} />
              <button className="btn btn--grad" type="submit">Check Offers</button>
            </form>
            <div className="start-note rise d3" id="startNote">
              {error ? <span style={{ color: "var(--accent)" }}>Enter a 10-digit Indian mobile number.</span> : (
                <>
                  <span><Icon name="check" />No impact on credit score</span>
                  <span><Icon name="check" />Doorstep documentation</span>
                  <span><Icon name="check" />Free advice</span>
                </>
              )}
            </div>
            <div className="hero-pills rise d4" id="heroPills">
              {PILLS.map((l) => <Link key={l.key} to={loanUrl(l)}><b className="num">{rate(l.rate)}*</b><span>{l.name}</span></Link>)}
            </div>
          </div>

          <div className="pf rise d2" aria-label="Quick EMI estimate">
            <div className="chip-float cf2"><span className="ic o"><Icon name="bolt" /></span><div><b>Disbursal in 24–72 hrs*</b>on personal loans</div></div>
            <div className="pf-card qcard">
              <div className="qcard-tabs" role="tablist" aria-label="Loan type" id="qTabs">
                {Q_KEYS.map((k) => {
                  const l = getLoan(k);
                  return <button type="button" role="tab" key={k} aria-selected={loan.key === k} onClick={() => pick(k)}><Icon name={l.icon} /><span>{tabLabel(l)}</span></button>;
                })}
              </div>
              <div className="qcard-body">
                <div className="slider-field">
                  <div className="top"><label htmlFor="qAmt">Loan amount</label><b className="num">{inr(amt)}</b></div>
                  <input type="range" id="qAmt" min={lim.min} max={lim.max} step={lim.step} value={amt} onChange={(e) => setAmt(+e.target.value)} />
                </div>
                <div className="slider-field">
                  <div className="top"><label htmlFor="qTen">Tenure</label><b className="num">{tenure(ten)}</b></div>
                  <input type="range" id="qTen" min={lim.tMin} max={lim.tMax} step={lim.tStep} value={ten} onChange={(e) => setTen(+e.target.value)} />
                </div>
                <div className="qcard-res">
                  <div><small>Estimated EMI</small><b className="num">{inr(emi(amt, loan.rate, ten))}/month</b><span className="muted num">at {rate(loan.rate)} p.a. (starting rate)</span></div>
                  <Link className="btn btn--primary" to={applyUrl(loan)}>Apply Now</Link>
                </div>
              </div>
              <div className="pf-foot"><span>Indicative · final rate set by the lender</span><Link className="link-arrow" to={calcUrl("emi", loan)}>Full calculator <Icon name="arrow" /></Link></div>
            </div>
            <div className="chip-float cf1"><span className="ic"><Icon name="shield" /></span><div><b>RBI-regulated lenders</b>Banks &amp; NBFC partners</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
