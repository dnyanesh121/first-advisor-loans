/** Labelled range slider with live value and min/max captions (.slider-field). */
export default function RangeField({ id, label, min, max, step, value, format, ends, onChange }) {
  return (
    <div className="slider-field">
      <div className="top"><label htmlFor={id}>{label}</label><b className="num" style={{ color: "var(--navy)" }}>{format(value)}</b></div>
      <input type="range" id={id} min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
      {ends && <div className="ends"><span>{ends[0]}</span><span>{ends[1]}</span></div>}
    </div>
  );
}
