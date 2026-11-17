/** Principal vs interest donut used in navy result cards. */
export default function EmiDonut({ principal, interest, labels = ["Principal", "Interest"], format }) {
  const p = (principal / (principal + interest)) * 100;
  return (
    <div className="donut-row">
      <svg className="donut" viewBox="0 0 42 42" aria-hidden="true">
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#F05E3B" strokeWidth="6" />
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#fff" strokeWidth="6" strokeDasharray={`${p.toFixed(1)} ${(100 - p).toFixed(1)}`} strokeDashoffset="25" style={{ transition: "stroke-dasharray .6s var(--ease)" }} />
      </svg>
      <div className="legend num">
        <div><span><i style={{ background: "#fff" }} />{labels[0]}</span><b>{format(principal)}</b></div>
        <div><span><i style={{ background: "#F05E3B" }} />{labels[1]}</span><b>{format(interest)}</b></div>
      </div>
    </div>
  );
}
