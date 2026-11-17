import { useMemo, useState } from "react";
import Icon from "../../assets/icons/Icon";
import LineChart from "../charts/LineChart";
import { yearly } from "../../utils/loanMath";
import { inr, monthFromNow, monthYear } from "../../utils/format";
import { useApp } from "../../context/AppContext";

const axis = (v) => (v >= 1e7 ? (v / 1e7).toFixed(1) + " Cr" : v >= 1e5 ? Math.round(v / 1e5) + " L" : Math.round(v / 1000) + "k");

/**
 * "Repayment Over Time": balance chart (+ cumulative interest, or the
 * no-prepayment balance when `base` is given) and the amortisation schedule
 * with yearly / monthly views and CSV download.
 */
export default function ScheduleChart({ amount, sched, base, loanKey }) {
  const { toast } = useApp();
  const [view, setView] = useState("year");

  const series = useMemo(() => {
    const start = { t: monthFromNow(0), v: amount };
    const s = [{ data: [start, ...sched.rows.map((r) => ({ t: monthFromNow(r.m), v: r.balance }))], color: "#003986", name: base ? "Balance with prepayment" : "Outstanding balance", area: true }];
    if (base) s.push({ data: [start, ...base.rows.map((r) => ({ t: monthFromNow(r.m), v: r.balance }))], color: "#8FB3E0", name: "Balance without prepayment", dash: true });
    else {
      let cum = 0;
      s.push({ data: [{ t: monthFromNow(0), v: 0 }, ...sched.rows.map((r) => { cum += r.interest; return { t: monthFromNow(r.m), v: cum }; })], color: "#F05E3B", name: "Interest paid so far" });
    }
    return s;
  }, [amount, sched, base]);

  const hasPP = sched.rows.some((r) => r.prepaid);
  const rows = view === "year"
    ? yearly(sched.rows).map((y) => ({ k: "Year " + y.year, ...y }))
    : sched.rows.map((r) => ({ k: monthYear(monthFromNow(r.m)), ...r }));

  const download = () => {
    const lines = [["Month", "EMI", "Principal", "Interest", "Prepaid", "Balance"]].concat(sched.rows.map((r) => [r.m, r.emi.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), (r.prepaid || 0).toFixed(2), r.balance.toFixed(2)]));
    const blob = new Blob([lines.map((r) => r.join(",")).join("\n")], { type: "text/csv" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `emi-schedule-${loanKey}.csv`; document.body.appendChild(a); a.click(); a.remove();
    toast("Schedule downloaded");
  };

  return (
    <div className="panel mt-8 reveal is-in" id="schedPanel">
      <div className="flex between" style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Repayment <em>Over Time</em></h2>
        <div className="chart-legend">{series.map((s) => <span key={s.name}><i style={{ background: s.color }} />{s.name}</span>)}</div>
      </div>
      <LineChart id="balChart" className="growth-chart" series={series} height={260} zeroBase label="Loan balance over time" yFormat={axis}
        tooltip={(p, s) => <><b>{monthYear(p[0].t)}</b>{p.map((x, i) => <span key={i}><i style={{ background: s[i].color }} />{s[i].name} {inr(x.v)}</span>)}</>} />
      <div className="sched-head">
        <h3>Amortisation schedule</h3>
        <div className="flex">
          <div className="seg" role="group" aria-label="Schedule view">
            <button type="button" aria-pressed={view === "year"} onClick={() => setView("year")}>Yearly</button>
            <button type="button" aria-pressed={view === "month"} onClick={() => setView("month")}>Monthly</button>
          </div>
          <button type="button" className="btn btn--ghost btn--sm" id="csv" onClick={download}><Icon name="doc" />Download CSV</button>
        </div>
      </div>
      <div className="table-scroll" style={{ maxHeight: 440 }}>
        <table className="amort-table num" id="sched">
          <thead><tr><th>{view === "year" ? "Year" : "Month"}</th><th>EMI paid</th><th>Principal</th><th>Interest</th>{hasPP && <th>Prepaid</th>}<th>Balance</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k + r.balance}>
                <td>{r.k}</td><td>{inr(r.emi)}</td><td>{inr(r.principal)}</td><td>{inr(r.interest)}</td>
                {hasPP && <td className="pp">{r.prepaid ? inr(r.prepaid) : "—"}</td>}
                <td>{inr(r.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
