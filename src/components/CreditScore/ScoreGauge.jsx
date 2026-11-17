import { SCORE_BANDS as B } from "../../data/content";

export const bandOf = (s) => B.find((b) => s >= b.from && s <= b.to);

const cx = 160, cy = 160, R = 130, r = 92;
const P = (a, rad) => (cx + rad * Math.cos(a)).toFixed(1) + "," + (cy - rad * Math.sin(a)).toFixed(1);
const ang = (v) => Math.PI * (1 - (v - 300) / 600);

/** 300–900 credit score gauge with coloured bands and a needle. */
export default function ScoreGauge({ score }) {
  const band = bandOf(score), a = ang(score);
  return (
    <svg viewBox="0 0 320 236" role="img" aria-label={`Credit score ${score}`}>
      {B.map((b) => {
        const a0 = ang(b.from), a1 = ang(b.to + (b.to === 900 ? 0 : 1));
        return <path key={b.label} d={`M${P(a0, R)} A${R},${R} 0 0 1 ${P(a1, R)} L${P(a1, r)} A${r},${r} 0 0 0 ${P(a0, r)}Z`} fill={b.color} opacity={band === b ? 1 : 0.3} stroke="#fff" strokeWidth="2" />;
      })}
      <line x1={cx} y1={cy} x2={(cx + 110 * Math.cos(a)).toFixed(1)} y2={(cy - 110 * Math.sin(a)).toFixed(1)} stroke="#1B2333" strokeWidth="5" strokeLinecap="round" className="needle" />
      <circle cx={cx} cy={cy} r="9" fill="#1B2333" />
      <text x={cx} y={cy + 58} textAnchor="middle" className="g-num">{score}</text>
      <text x="30" y="182" textAnchor="middle" className="g-end">300</text>
      <text x="290" y="182" textAnchor="middle" className="g-end">900</text>
    </svg>
  );
}
