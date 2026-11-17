import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";
import Field, { CheckLabel } from "../Forms/Field";
import { FormErrorsProvider, FormSuccess, useValidation } from "../Forms/ValidatedForm";
import { LOANS } from "../../data/loans";
import { getLoan, loanUrl } from "../../utils/lookup";
import { inr, short } from "../../utils/format";
import { apps, newRef } from "../../utils/applications";

/**
 * Quick apply: loan type, amount (checked against the product's range), name,
 * mobile, city and consent. Saves a reference so the enquiry can be tracked.
 */
export default function ApplyModal({ open, onClose, loanKey, prefill = {} }) {
  const [type, setType] = useState((getLoan(loanKey) || getLoan("personal")).key);
  const [amount, setAmount] = useState(String(prefill.amount || (getLoan(loanKey) || getLoan("personal")).def.amt));
  const [amtErr, setAmtErr] = useState("");
  const [done, setDone] = useState(null);
  const formRef = useRef(null);
  const v = useValidation();
  const l = getLoan(type);

  const rangeErr = (val = amount, loan = l) => {
    const n = parseInt(val, 10) || 0;
    const msg = n && (n < loan.min || n > loan.max) ? `Enter an amount between ${short(loan.min)} and ${short(loan.max)}.` : "";
    setAmtErr(msg);
    return !msg && n > 0;
  };

  const submit = (e) => {
    e.preventDefault();
    const ok = v.validate(formRef.current), rok = rangeErr();
    if (!ok || !rok) { if (ok) document.getElementById("qa-amt")?.focus(); return; }
    const f = formRef.current.elements;
    const app = apps.add({ ref: newRef(), type, amount: +amount, name: f["qa-name"].value.trim(), phone: f["qa-phone"].value.trim(), city: f["qa-city"].value.trim(), date: new Date().toISOString(), stage: 1, source: "quick" });
    setDone(app);
  };

  return (
    <Modal open={open} onClose={onClose} id="applyModal" title={<>Apply for a <em className="hl">Loan</em></>} subtitle="Share a few details. An advisor will call you with offers from our lending partners.">
      <div id="applyBody">
      {done ? (
        <>
          <FormSuccess title={`Thank you, ${done.name.split(" ")[0]}.`}>
            {" "}Your enquiry for a {l.name} of {inr(done.amount)} is registered. Reference <b className="num">{done.ref}</b>. An advisor will call you within one working day with offers. <em style={{ opacity: 0.75 }}>(Demo: nothing was sent.)</em>
          </FormSuccess>
          <div className="flex mt-4">
            <Link className="btn btn--outline btn--sm" to={`/apply/track?ref=${done.ref}`} onClick={onClose}>Track application</Link>
            <Link className="btn btn--ghost btn--sm" to={loanUrl(l)} onClick={onClose}>Documents needed</Link>
          </div>
        </>
      ) : (
        <FormErrorsProvider value={v}>
          <form id="qaForm" className="form-grid" noValidate ref={formRef} onSubmit={submit}>
            <Field id="qa-type" label="Loan type" as="select" full value={type}
              onChange={(e) => { const x = getLoan(e.target.value); setType(x.key); setAmount(String(x.def.amt)); rangeErr(String(x.def.amt), x); }}
              options={LOANS.map((x) => [x.key, x.name])} />
            <div className={`field full${amtErr ? " has-error" : ""}`}>
              <label htmlFor="qa-amt">Loan amount</label>
              <div className="amt-input"><span>₹</span><input className="input num" id="qa-amt" inputMode="numeric" value={amount}
                onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); setAmount(val); rangeErr(val); }} /></div>
              <span className="err" id="qa-amt-err">{amtErr}</span>
            </div>
            <Field id="qa-name" label="Full name" required autoComplete="name" defaultValue={prefill.name || ""} />
            <Field id="qa-phone" label="Mobile number" phone required defaultValue={prefill.phone || ""} />
            <Field id="qa-city" label="City" full required autoComplete="address-level2" placeholder="e.g. Pune" />
            <CheckLabel id="qa-consent" className="full" required>I authorise First Advisors and its lending partners to contact me about this enquiry, overriding DND.</CheckLabel>
            <div className="full"><button className="btn btn--primary btn--block btn--lg" type="submit">Check My Offers</button></div>
          </form>
        </FormErrorsProvider>
      )}
      </div>
    </Modal>
  );
}
