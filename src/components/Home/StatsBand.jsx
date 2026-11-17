import { CONFIG } from "../../data/config";
import useCountUp from "../../hooks/useCountUp";

function Stat({ stat, index }) {
  const [ref, value] = useCountUp(stat.value);
  return (
    <div className="stat reveal" style={{ "--d": index * 0.08 + "s" }}>
      <b className="num" ref={ref}>{stat.value ? value.toLocaleString("en-IN") + (stat.suffix || "") : stat.text}</b>
      <span>{stat.label}</span>
    </div>
  );
}

/** Navy "at a glance" band; numeric stats count up when scrolled into view. */
export default function StatsBand() {
  return (
    <section className="stats-band" aria-label="At a glance">
      <div className="container">
        <div className="stats">{CONFIG.stats.map((s, i) => <Stat key={s.label} stat={s} index={i} />)}</div>
      </div>
    </section>
  );
}
