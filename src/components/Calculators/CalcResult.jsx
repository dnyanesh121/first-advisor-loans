import { Link } from "react-router-dom";
import { applyUrl } from "../../utils/lookup";
import { useApp } from "../../context/AppContext";

/** Navy result card for the calculators page. */
export default function CalcResult({ label, big, sub, middle, rows, loan }) {
  const { openConsult } = useApp();
  return (
    <div className="result-card" id="result">
      <div className="lbl">{label}</div>
      <div className="big num">{big}</div>
      {sub && <p className="note">{sub}</p>}
      {middle}
      <div className="rows num">{rows.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}</div>
      <div className="flex mt-6">
        <Link className="btn btn--primary" to={applyUrl(loan)}>Apply for {loan.name}</Link>
        <button type="button" className="btn btn--white" onClick={openConsult}>Talk to an advisor</button>
      </div>
    </div>
  );
}
