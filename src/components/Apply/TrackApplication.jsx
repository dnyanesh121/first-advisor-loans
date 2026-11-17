import { useRef, useState } from "react";
import Icon from "../../assets/icons/Icon";
import Field from "../Forms/Field";
import { FormErrorsProvider, useValidation } from "../Forms/ValidatedForm";
import { CONFIG } from "../../data/config";
import { apps } from "../../utils/applications";
import { date, inr } from "../../utils/format";
import { getLoan } from "../../utils/lookup";

const STAGES = [
  ["Application received", "We have your application."],
  ["Advisor review", "An advisor checks your details and requirement."],
  ["Offers shared", "Offers from suitable lenders with rate, fees and APR."],
  ["Documents & verification", "Documents collected and verified by the lender."],
  ["Sanction", "Lender's sanction letter and Key Fact Statement."],
  ["Disbursal", "Funds transferred."]
];

function Result({ app }) {
  if (app === null) return null;
  if (!app) {
    return (
      <div className="tr-none"><Icon name="help" /><div><b>We couldn't find that application.</b>Check the reference number and mobile number, or call {CONFIG.phone}. <em style={{ opacity: 0.75 }}>(Demo: only applications submitted from this browser can be tracked here.)</em></div></div>
    );
  }
  const l = getLoan(app.type), mins = (Date.now() - new Date(app.date)) / 60000, stage = mins > 60 * 24 ? 2 : 1;
  return (
    <div className="tr-card">
      <div className="tr-head">
        <div><small>Reference</small><b className="num">{app.ref}</b></div>
        <div><small>Loan</small><b>{l.name}</b></div>
        <div><small>Amount</small><b className="num">{inr(app.amount)}</b></div>
        <div><small>Applied on</small><b>{date(app.date)}</b></div>
      </div>
      <ol className="timeline">
        {STAGES.map(([b, p], i) => (
          <li key={b} className={i < stage ? "done" : i === stage ? "cur" : ""}>
            <span /><div><b>{b}</b>{i === stage && <em className="badge badge--accent">In progress</em>}<p>{p}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Track application by reference + mobile (initialRef pre-fills and looks it up). */
export default function TrackApplication({ initialRef }) {
  const first = initialRef ? apps.find(initialRef) : null;
  const [result, setResult] = useState(first || null); // null = not searched, undefined = not found
  const formRef = useRef(null);
  const v = useValidation();

  const submit = (e) => {
    e.preventDefault();
    if (!v.validate(formRef.current)) return;
    const f = formRef.current.elements;
    setResult(apps.find(f["tr-ref"].value, f["tr-phone"].value.trim()));
  };

  return (
    <div className="panel track-panel" id="track">
      <h2>Track your <em>application</em></h2>
      <p className="muted" style={{ marginBottom: 18 }}>Enter the reference number from your confirmation SMS or email.</p>
      <FormErrorsProvider value={v}>
        <form className="form-grid" id="trForm" noValidate ref={formRef} onSubmit={submit}>
          <Field id="tr-ref" label="Reference number" required placeholder="e.g. FAL4K9Z2Q12" style={{ textTransform: "uppercase" }} defaultValue={initialRef || ""} />
          <Field id="tr-phone" label="Registered mobile number" phone required defaultValue={first ? first.phone : ""} />
          <div className="full"><button className="btn btn--primary" type="submit">Track Status</button></div>
        </form>
      </FormErrorsProvider>
      <div id="trResult"><Result app={result} /></div>
    </div>
  );
}
