import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import LoanTile from "../components/loan/LoanTile";
import EmiDonut from "../components/loan/EmiDonut";
import RangeField from "../components/loan/RangeField";
import CalcResult from "../components/Calculators/CalcResult";
import ScheduleChart from "../components/Calculators/ScheduleChart";
import { LOANS } from "../data/loans";
import { emi, principalFor, schedule, amountStep, tenureStep } from "../utils/loanMath";
import { inr, short, tenure } from "../utils/format";
import { getLoan, loanUrl } from "../utils/lookup";
import useDocumentTitle from "../hooks/useDocumentTitle";

const TYPES = [["emi", "calc", "EMI Calculator", "EMI & repayment schedule"], ["eligibility", "user2", "Eligibility", "How much can I borrow?"], ["transfer", "repeat", "Balance Transfer", "Savings from a lower rate"], ["prepay", "trend", "Prepayment", "Interest saved by part-paying"]];
const TILES = ["personal", "home", "lap", "business", "new-car", "used-car", "two-wheeler", "education"];
const pct = (v) => (+v).toFixed(2) + "%";

/** starting values for a loan */
function startFor(l) {
  return {
    amt: l.def.amt, rate: l.rate, t: l.def.t, income: 100000, other: 0, foir: 50,
    out: Math.min(l.max, Math.max(l.min, Math.round((l.def.amt * 0.8) / 10000) * 10000)), cur: +(l.rate + 1.25).toFixed(2),
    left: Math.max(l.tMin, Math.round((l.def.t * 0.8) / 12) * 12) || l.def.t, nrate: l.rate, cost: 0.5,
    ppAt: 12, ppAmt: Math.round((l.def.amt * 0.1) / 10000) * 10000 || 50000, mode: "tenure"
  };
}
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/** Calculators: EMI (with amortisation), eligibility, balance transfer, prepayment. ?type=…&loan=… */
export default function Calculators() {
  useDocumentTitle("Loan Calculators — EMI, Eligibility, Balance Transfer & Prepayment | First Advisors Loans", true);
  const [qp, setQp] = useSearchParams();
  const type = TYPES.some(([t]) => t === qp.get("type")) ? qp.get("type") : "emi";
  const loan = getLoan(qp.get("loan")) || getLoan("home");
  const [state, setState] = useState(() => ({ key: loan.key, st: startFor(loan) }));
  // reset inputs whenever the loan changes (from the select or the URL)
  const st = state.key === loan.key ? state.st : startFor(loan);
  const set = (k) => (v) => setState({ key: loan.key, st: { ...st, [k]: v } });
  const go = (t, l) => setQp({ type: t, loan: l.key }, { replace: true });

  const l = loan, s = amountStep(l), ts = tenureStep(l), tMin = Math.max(l.tMin, ts === 12 ? 12 : l.tMin);
  const rMin = Math.max(5, Math.floor(l.rate) - 1), rMax = Math.ceil(l.rateTo);
  const ppMax = Math.max(2, st.t - 1), ppAmtMax = Math.max(20000, Math.round((st.amt * 0.9) / 10000) * 10000);
  // keep values inside the current slider ranges (as the original page does)
  const v = {
    ...st,
    amt: clamp(st.amt, l.min, l.max), t: clamp(st.t, tMin, l.tMax), rate: clamp(st.rate, rMin, rMax),
    out: clamp(st.out, l.min, l.max), cur: clamp(st.cur, rMin, rMax + 3), left: clamp(st.left, tMin, l.tMax), nrate: clamp(st.nrate, rMin, rMax),
    ppAt: clamp(st.ppAt, 1, ppMax), ppAmt: clamp(st.ppAmt, 10000, ppAmtMax)
  };

  const amountF = (k, label) => <RangeField id={`in-${k}`} label={label} min={l.min} max={l.max} step={s} value={v[k]} format={inr} ends={[short(l.min), short(l.max)]} onChange={set(k)} />;
  const rateF = (k, label, max = rMax) => <RangeField id={`in-${k}`} label={label} min={rMin} max={max} step={0.05} value={v[k]} format={pct} ends={[rMin + "%", max + "%"]} onChange={set(k)} />;
  const tenureF = (k, label) => <RangeField id={`in-${k}`} label={label} min={tMin} max={l.tMax} step={ts} value={v[k]} format={tenure} ends={[tenure(tMin), tenure(l.tMax)]} onChange={set(k)} />;

  /* ---------- results ---------- */
  const r = useMemo(() => {
    if (type === "emi") {
      const sc = schedule(v.amt, v.rate, v.t);
      return { label: "Monthly EMI", big: inr(sc.emi), middle: <EmiDonut principal={v.amt} interest={sc.totalInterest} format={short} />, rows: [["Principal amount", inr(v.amt)], ["Total interest", inr(sc.totalInterest)], ["Total amount payable", inr(v.amt + sc.totalInterest)]], sched: sc };
    }
    if (type === "eligibility") {
      const maxEmi = Math.max(0, (v.income * v.foir) / 100 - v.other), p = Math.min(l.max, principalFor(maxEmi, v.rate, v.t));
      const ok = p >= l.min, used = v.income ? Math.min(100, (v.other / v.income) * 100) : 0;
      return {
        label: "You could be eligible for", big: ok ? inr(Math.floor(p / 1000) * 1000) : "₹0",
        sub: ok ? `At ${v.rate.toFixed(2)}% for ${tenure(v.t)}${p >= l.max ? ` — capped at the ${l.name.toLowerCase()} maximum.` : "."}` : "Your existing EMIs leave no room for a new EMI at this level. Try a longer tenure or reduce existing EMIs.",
        middle: (
          <div className="elig-meter">
            <div className="bar"><i style={{ width: Math.min(100, (used / v.foir) * 100).toFixed(0) + "%" }} /></div>
            <div className="lab"><span>Existing EMIs use {used.toFixed(0)}% of income</span><span>Limit {v.foir}%</span></div>
          </div>
        ),
        rows: [["Maximum EMI you can afford", inr(maxEmi)], ["Loan range for this product", short(l.min) + " – " + short(l.max)]]
      };
    }
    if (type === "transfer") {
      const e1 = emi(v.out, v.cur, v.left), e2 = emi(v.out, v.nrate, v.left), i1 = e1 * v.left - v.out, i2 = e2 * v.left - v.out, cost = (v.out * v.cost) / 100, net = i1 - i2 - cost;
      const good = net > 0 && v.nrate < v.cur;
      return {
        label: good ? "Net saving after costs" : "Not worth switching", big: inr(Math.max(0, net)),
        sub: good ? `Your EMI falls by ${inr(e1 - e2)} a month for ${tenure(v.left)}.` : "The new rate must be low enough to recover the transfer costs. Ask your current lender for a rate reduction first.",
        rows: [["Current EMI", inr(e1)], ["New EMI", inr(e2)], ["Interest saved", inr(Math.max(0, i1 - i2))], ["Transfer costs", inr(cost)]],
        bars: [[`Stay with current lender (${v.cur.toFixed(2)}%)`, i1, "#B6C2D2"], [`Transfer (${v.nrate.toFixed(2)}%) incl. costs`, i2 + cost, "var(--grad-navy)"]]
      };
    }
    const base = schedule(v.amt, v.rate, v.t), pp = schedule(v.amt, v.rate, v.t, { month: v.ppAt, amount: v.ppAmt, mode: v.mode });
    const saved = base.totalInterest - pp.totalInterest, after = pp.rows[v.ppAt] ? pp.rows[v.ppAt].emi : 0;
    return {
      label: "Interest you save", big: inr(Math.max(0, saved)),
      sub: v.mode === "tenure" ? `Loan closes ${tenure(Math.max(0, base.months - pp.months)).replace(/^0 months$/, "no")} earlier (${pp.months} EMIs instead of ${base.months}).` : `EMI falls from ${inr(base.emi)} to ${inr(after)} after the prepayment.`,
      middle: <EmiDonut principal={v.amt} interest={pp.totalInterest} format={short} />,
      rows: [["Interest without prepayment", inr(base.totalInterest)], ["Interest with prepayment", inr(pp.totalInterest)], ["Prepayment charges", l.secured && l.seg === "you" ? "Nil on floating rate*" : "As per lender"]],
      sched: pp, base
    };
  }, [type, l, v.amt, v.rate, v.t, v.income, v.other, v.foir, v.out, v.cur, v.left, v.nrate, v.cost, v.ppAt, v.ppAmt, v.mode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PageHero title={<>Loan <em>Calculators</em></>} crumbs={[["Calculators"]]} art="calc" lead="Work out your EMI, how much you can borrow, what a balance transfer saves and how much a prepayment cuts your interest." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="calc-tabs reveal" role="tablist" aria-label="Calculators">
            {TYPES.map(([t, icon, b, sub]) => (
              <button type="button" role="tab" key={t} id={`t-${t}`} aria-selected={t === type} onClick={() => go(t, l)}><Icon name={icon} /><div><b>{b}</b><span>{sub}</span></div></button>
            ))}
          </div>
          <div className="calc reveal" role="tabpanel" aria-live="polite">
            <div className="panel" id="inputs">
              <div className="field" style={{ marginBottom: 20 }}>
                <label htmlFor="in-loan">Loan type</label>
                <select className="select" id="in-loan" value={l.key} onChange={(e) => go(type, getLoan(e.target.value))}>
                  {LOANS.map((x) => <option key={x.key} value={x.key}>{x.name}</option>)}
                </select>
              </div>
              {type === "emi" && <>{amountF("amt", "Loan amount")}{rateF("rate", "Interest rate (p.a.)")}{tenureF("t", "Tenure")}</>}
              {type === "eligibility" && (
                <>
                  <RangeField id="in-income" label="Net monthly income" min={10000} max={1000000} step={5000} value={v.income} format={inr} ends={["₹10,000", "₹10 L"]} onChange={set("income")} />
                  <RangeField id="in-other" label="Existing EMIs per month" min={0} max={300000} step={1000} value={v.other} format={inr} ends={["₹0", "₹3 L"]} onChange={set("other")} />
                  {rateF("rate", "Interest rate (p.a.)")}{tenureF("t", "Tenure")}
                  <RangeField id="in-foir" label="EMIs allowed up to" min={30} max={70} step={5} value={v.foir} format={(x) => x + "% of income"} ends={["30%", "70%"]} onChange={set("foir")} />
                </>
              )}
              {type === "transfer" && (
                <>
                  {amountF("out", "Outstanding loan amount")}{rateF("cur", "Current interest rate", rMax + 3)}{tenureF("left", "Remaining tenure")}{rateF("nrate", "New interest rate")}
                  <RangeField id="in-cost" label="Transfer costs (fees, legal, stamp duty)" min={0} max={3} step={0.1} value={v.cost} format={(x) => x + "% of outstanding"} ends={["0%", "3%"]} onChange={set("cost")} />
                </>
              )}
              {type === "prepay" && (
                <>
                  {amountF("amt", "Loan amount")}{rateF("rate", "Interest rate (p.a.)")}{tenureF("t", "Tenure")}
                  <RangeField id="in-ppAt" label="Prepay after" min={1} max={ppMax} step={1} value={v.ppAt} format={(x) => "After " + x + " EMIs"} ends={["1 EMI", ppMax + " EMIs"]} onChange={set("ppAt")} />
                  <RangeField id="in-ppAmt" label="Prepayment amount" min={10000} max={ppAmtMax} step={10000} value={v.ppAmt} format={inr} ends={["₹10,000", short(ppAmtMax)]} onChange={set("ppAmt")} />
                  <div className="seg-row">
                    <span className="label" style={{ display: "block", marginBottom: 8 }}>After prepaying, reduce my</span>
                    <div className="seg" role="group" aria-label="Prepayment option">
                      <button type="button" aria-pressed={v.mode === "tenure"} onClick={() => set("mode")("tenure")}>Tenure</button>
                      <button type="button" aria-pressed={v.mode === "emi"} onClick={() => set("mode")("emi")}>EMI</button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <CalcResult label={r.label} big={r.big} sub={r.sub} middle={r.middle} rows={r.rows} loan={l} />
          </div>

          <div>
            {(type === "emi" || type === "prepay") && <ScheduleChart amount={v.amt} sched={r.sched} base={r.base} loanKey={l.key} />}
            {type === "eligibility" && (
              <div className="ex-grid">
                <div className="panel reveal is-in">
                  <h2>How lenders check <em>eligibility</em></h2>
                  <ul className="doc-list">
                    {["Net income after tax and deductions, and how stable it is", "Existing EMIs — most lenders cap total EMIs at 50–60% of income (FOIR)", "Credit score and repayment history", "Age, so the loan ends before retirement or the lender's age limit", l.secured ? "Value of the security (loan-to-value limits)" : "Employer category or business vintage"].map((x) => <li key={x}><Icon name="checkbox" /><span>{x}</span></li>)}
                  </ul>
                </div>
                <div className="panel reveal is-in">
                  <h2>Ways to <em>increase it</em></h2>
                  <ul className="doc-list">
                    {["Add an earning co-applicant", "Choose a longer tenure", "Close small loans or credit card dues first", "Declare all regular income, such as rent or variable pay", "Improve your credit score to qualify for a lower rate"].map((x) => <li key={x}><Icon name="trend" /><span>{x}</span></li>)}
                  </ul>
                  <Link className="btn btn--outline btn--sm mt-4" to={loanUrl(l) + "#eligibility"}>{l.name} eligibility &amp; documents</Link>
                </div>
              </div>
            )}
            {type === "transfer" && (
              <div className="panel mt-8 reveal is-in">
                <h2>Interest you will <em>pay</em></h2>
                <div className="calc-compare num">
                  {r.bars.map(([label, val, color]) => {
                    const mx = Math.max(r.bars[0][1], r.bars[1][1], 1);
                    return <div key={label}><span>{label}</span><b>{inr(val)}</b><span className="bar"><i style={{ width: ((val / mx) * 100).toFixed(1) + "%", background: color }} /></span></div>;
                  })}
                </div>
                <p className="muted" style={{ fontSize: 12.5, margin: "14px 0 0" }}>Rule of thumb: a transfer usually pays off when the rate gap is 0.5% or more and more than half the tenure remains. <Link className="link" to="/learn/3">Read the guide</Link>.</p>
              </div>
            )}
          </div>
          <p className="muted center mt-6" style={{ fontSize: 12.5, maxWidth: "72ch", marginInline: "auto" }}>Results are estimates on a reducing balance and assume the rate stays the same for the full tenure. Your lender's sanction letter and Key Fact Statement give the exact EMI, APR and repayment schedule.</p>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Ready to <em>Apply?</em></>} subtitle="Pick a loan to see its eligibility, documents and charges" />
          <div className="tile-grid tile-grid--4">{TILES.map((k, i) => <LoanTile key={k} loan={getLoan(k)} index={i} />)}</div>
        </div>
      </section>
    </>
  );
}
