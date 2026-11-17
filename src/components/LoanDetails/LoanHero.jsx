import { useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Clouds from "../common/Clouds";
import SvgArt from "../common/SvgArt";
import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field, { CheckLabel } from "../Forms/Field";
import { financeArt } from "../../utils/art";
import { amountRange, rate, short, tenureRange } from "../../utils/format";
import { applyUrl, calcUrl } from "../../utils/lookup";

/** "Personal Loan" → Personal <em>Loan</em> */
export const twoTone = (name) => { const i = name.lastIndexOf(" "); return <>{name.slice(0, i + 1)}<em>{name.slice(i + 1)}</em></>; };

/** Product hero: breadcrumbs, badges, title, key figures, CTAs and a personalised-offer form. */
export default function LoanHero({ loan: l }) {
  const art = useMemo(() => financeArt(l.art, 5), [l.art]);
  const segName = l.seg === "you" ? "Loans for You" : "Loans for Business";
  const keys = [["percent", rate(l.rate) + "*", "Rate from (p.a.)"], ["rupee", amountRange(l), "Loan amount"], ["calendar", tenureRange(l), "Tenure"], ["bolt", l.disbursal, "Disbursal"]];
  const steps = [l.min, l.max / 20, l.max / 5, l.max].map((v) => Math.round(v / 10000) * 10000 || l.min);
  const amounts = ["Up to " + short(steps[1]), short(steps[1]) + " – " + short(steps[2]), "Above " + short(steps[2]), "Not sure yet"];

  return (
    <section className="page-hero ld-hero">
      <Clouds n={6} />
      <div className="hero-chart" aria-hidden="true"><SvgArt html={art} /></div>
      <div className="container">
        <nav className="crumbs rise" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span className="sep">/</span><Link to={`/loans?seg=${l.seg}`}>{segName}</Link><span className="sep">/</span><span aria-current="page">{l.name}</span>
        </nav>
        <div className="ld-grid">
          <div>
            <div className="ld-badges rise d1">
              <span className="ld-ic"><Icon name={l.icon} /></span>
              <span className="badge badge--soft">{segName}</span>
              <span className={`badge ${l.secured ? "badge--soft" : "badge--ok"}`}>{l.secured ? "Secured" : "No collateral"}</span>
            </div>
            <h1 className="rise d1">{twoTone(l.name)}</h1>
            <p className="lead rise d2">{l.tagline}</p>
            <div className="ld-keys rise d2">
              {keys.map(([icon, v, label]) => <div key={label}><Icon name={icon} /><b className="num">{v}</b><span>{label}</span></div>)}
            </div>
            <div className="flex rise d3" style={{ marginTop: 22 }}>
              <Link className="btn btn--primary btn--lg" to={applyUrl(l)}>Apply Now</Link>
              <Link className="btn btn--outline btn--lg" to={calcUrl("eligibility", l)}>Check Eligibility</Link>
            </div>
          </div>
          <div className="form-card ld-form rise d2">
            <h2 style={{ fontSize: 19, marginBottom: 4 }}>Get a <em className="hl">personalised offer</em></h2>
            <p className="muted" style={{ fontSize: 13, marginBottom: 16 }}>Free advice · no impact on your credit score</p>
            <ValidatedForm className="stack" id="offerForm" successTitle="Thank you" success="An advisor will call you within one working day with offers from suitable lenders.">
              <Field id="o-name" label="Full name" name="name" required autoComplete="name" />
              <Field id="o-phone" label="Mobile number" phone required autoComplete="tel" />
              <Field id="o-amt" label="Loan amount needed" as="select" options={amounts} />
              <CheckLabel id="o-consent" required>I agree to be contacted by First Advisors and its lending partners.</CheckLabel>
              <SubmitButton className="btn btn--primary btn--block">Get My Offer</SubmitButton>
            </ValidatedForm>
          </div>
        </div>
      </div>
    </section>
  );
}
