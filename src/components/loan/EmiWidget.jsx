import { useState } from "react";
import { Link } from "react-router-dom";
import RangeField from "./RangeField";
import EmiDonut from "./EmiDonut";
import { LOANS } from "../../data/loans";
import { emi, amountStep, tenureStep } from "../../utils/loanMath";
import { inr, short, tenure } from "../../utils/format";
import { applyUrl, calcUrl, getLoan } from "../../utils/lookup";

const startFor = (l) => ({ amt: l.def.amt, rate: l.rate, t: l.def.t });

/**
 * EMI calculator: sliders for amount / rate / tenure and a navy result card.
 * picker → loan type select (loans for you) · compact → single column.
 */
export default function EmiWidget({ loan: initial, picker, compact }) {
  const [loan, setLoan] = useState(initial || getLoan("personal"));
  const [st, setSt] = useState(() => startFor(loan));
  const set = (k) => (v) => setSt((s) => ({ ...s, [k]: v }));

  const ts = tenureStep(loan), tMin = Math.max(loan.tMin, ts === 12 ? 12 : loan.tMin);
  const rMin = Math.max(5, Math.floor(loan.rate) - 1), rMax = Math.ceil(loan.rateTo);
  const e = emi(st.amt, st.rate, st.t), tot = e * st.t, int = tot - st.amt;

  return (
    <div className={"calc" + (compact ? " calc--compact" : "")}>
      <div className="panel">
        {picker && (
          <div className="field" style={{ marginBottom: 18 }}>
            <label htmlFor="ew-type">Loan type</label>
            <select className="select" id="ew-type" value={loan.key} onChange={(ev) => { const l = getLoan(ev.target.value); setLoan(l); setSt(startFor(l)); }}>
              {LOANS.filter((x) => x.seg === "you").map((x) => <option key={x.key} value={x.key}>{x.name}</option>)}
            </select>
          </div>
        )}
        <div>
          <RangeField id="ew-amt" label="Loan amount" min={loan.min} max={loan.max} step={amountStep(loan)} value={st.amt} format={inr} ends={[short(loan.min), short(loan.max)]} onChange={set("amt")} />
          <RangeField id="ew-rate" label="Interest rate (p.a.)" min={rMin} max={rMax} step={0.05} value={st.rate} format={(v) => v.toFixed(2) + "%"} ends={[rMin + "%", rMax + "%"]} onChange={set("rate")} />
          <RangeField id="ew-t" label="Tenure" min={tMin} max={loan.tMax} step={ts} value={st.t} format={tenure} ends={[tenure(tMin), tenure(loan.tMax)]} onChange={set("t")} />
        </div>
      </div>
      <div className="result-card" aria-live="polite">
        <div className="lbl">Monthly EMI</div>
        <div className="big num">{inr(e)}</div>
        <EmiDonut principal={st.amt} interest={int} format={short} />
        <div className="rows num"><div><span>Total amount payable</span><b>{inr(tot)}</b></div></div>
        <div className="flex mt-6">
          <Link className="btn btn--primary" to={applyUrl(loan)}>Apply Now</Link>
          <Link className="btn btn--white" to={calcUrl("emi", loan)}>Full calculator</Link>
        </div>
      </div>
    </div>
  );
}
