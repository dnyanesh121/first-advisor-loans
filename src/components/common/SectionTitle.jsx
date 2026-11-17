/**
 * Two-tone section heading: <SectionTitle title={<>Apply for a <em>Loan Online</em></>} subtitle="…" />
 * left → left-aligned variant; note → small "sample data" pill.
 */
export default function SectionTitle({ title, subtitle, note, left, style }) {
  return (
    <div className={"sec-title" + (left ? " sec-title--left" : " reveal")} style={style}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {note && <span className="sample-note">{note}</span>}
    </div>
  );
}
