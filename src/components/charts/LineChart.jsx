import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { date as fmtFullDate } from "../../utils/format";

/* ==========================================================================
   Lightweight SVG line/area chart with hover cursor + tooltip. No library.
   Re-renders when its container is resized by more than 4px.
   series: [{ data: [{t, v}], name, color, area, dash, width }]
   ========================================================================== */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function niceTicks(min, max, count) {
  let step = Math.pow(10, Math.floor(Math.log10((max - min || 1) / count)));
  const err = (max - min || 1) / count / step;
  step *= err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
  const out = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}
function downsample(data, max) {
  if (data.length <= max) return data;
  const step = data.length / max, out = [];
  for (let i = 0; i < max; i++) out.push(data[Math.floor(i * step)]);
  out.push(data[data.length - 1]);
  return out;
}
function fmtDate(t, spanDays) {
  const d = new Date(t);
  return spanDays > 400 ? MONTHS[d.getMonth()] + " '" + String(d.getFullYear()).slice(2) : d.getDate() + " " + MONTHS[d.getMonth()];
}
function nearest(data, t) {
  let lo = 0, hi = data.length - 1;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (data[mid].t < t) lo = mid; else hi = mid; }
  return Math.abs(data[lo].t - t) < Math.abs(data[hi].t - t) ? data[lo] : data[hi];
}
const defaultY = (v) => v.toFixed(v < 100 ? 1 : 0);

export default function LineChart({ series, height = 280, hideX, hideY, zeroBase, label = "Chart", yFormat = defaultY, tooltip, className, id }) {
  const ref = useRef(null);
  const tipRef = useRef(null);
  const uid = useId().replace(/:/g, "");
  const [W, setW] = useState(0);
  const [hoverState, setHover] = useState(null); // { x, pts, series }
  const hover = hoverState && hoverState.series === series ? hoverState : null; // stale after data changes
  const [tipLeft, setTipLeft] = useState(0);

  // measure + watch container width
  useLayoutEffect(() => {
    const el = ref.current;
    let last = el.clientWidth;
    setW(Math.max(280, last));
    if (!("ResizeObserver" in window)) return undefined;
    const ro = new ResizeObserver(() => {
      if (Math.abs(el.clientWidth - last) > 4) { last = el.clientWidth; setW(Math.max(280, last)); }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const H = height;
  const geo = useMemo(() => {
    if (!W) return null;
    const pad = { l: hideY ? 8 : 56, r: 14, t: 14, b: hideX ? 8 : 30 };
    const ser = series.map((s) => ({ ...s, pts: downsample(s.data, Math.min(420, Math.floor(W))) }));
    const all = ser.flatMap((s) => s.pts);
    if (!all.length) return null;
    let t0 = Infinity, t1 = -Infinity, vmin = Infinity, vmax = -Infinity;
    all.forEach((p) => { t0 = Math.min(t0, p.t); t1 = Math.max(t1, p.t); vmin = Math.min(vmin, p.v); vmax = Math.max(vmax, p.v); });
    const vpad = (vmax - vmin) * 0.08 || Math.abs(vmax) * 0.02 || 1;
    vmin -= vpad; vmax += vpad;
    if (zeroBase) vmin = Math.min(0, vmin);
    const X = (t) => pad.l + (t - t0) / ((t1 - t0) || 1) * (W - pad.l - pad.r);
    const Y = (v) => pad.t + (1 - (v - vmin) / (vmax - vmin)) * (H - pad.t - pad.b);
    const yTicks = hideY ? [] : niceTicks(vmin, vmax, 4).map((v) => ({ v, y: Y(v) })).filter((k) => k.y >= pad.t - 1 && k.y <= H - pad.b + 1);
    const n = W < 520 ? 3 : 5, span = (t1 - t0) / 864e5;
    const xTicks = hideX ? [] : Array.from({ length: n + 1 }, (_, i) => { const t = t0 + (t1 - t0) * i / n; return { x: X(t), text: fmtDate(t, span), anchor: i === 0 ? "start" : i === n ? "end" : "middle" }; });
    const paths = ser.map((s) => {
      const d = s.pts.map((p, k) => (k ? "L" : "M") + X(p.t).toFixed(1) + "," + Y(p.v).toFixed(1)).join("");
      const area = s.area ? d + "L" + X(s.pts[s.pts.length - 1].t).toFixed(1) + "," + (H - pad.b) + "L" + X(s.pts[0].t).toFixed(1) + "," + (H - pad.b) + "Z" : null;
      return { d, area };
    });
    return { pad, ser, t0, t1, X, Y, yTicks, xTicks, paths };
  }, [series, W, H, hideX, hideY, zeroBase]);

  // keep the tooltip inside the chart
  useLayoutEffect(() => {
    if (!hover || !tipRef.current || !ref.current) return;
    const svg = ref.current.querySelector("svg"), r = svg.getBoundingClientRect(), tw = tipRef.current.offsetWidth;
    const left = hover.x * (r.width / W);
    setTipLeft(Math.min(Math.max(left - tw / 2, 0), r.width - tw));
  }, [hover, W]);

  const move = (e) => {
    if (!geo) return;
    const { pad, t0, t1, X } = geo, r = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const x = (e.clientX - r.left) * (W / r.width), t = t0 + (x - pad.l) / (W - pad.l - pad.r) * (t1 - t0);
    const pts = series.map((s) => nearest(s.data, t));
    setHover({ x: X(pts[0].t), pts, series });
  };

  const tip = hover && (tooltip ? tooltip(hover.pts, series) : (
    <>
      <b>{fmtFullDate(hover.pts[0].t)}</b>
      {hover.pts.map((p, i) => <span key={i}><i style={{ background: series[i].color }} />{(series[i].name || "") + " " + yFormat(p.v)}</span>)}
    </>
  ));

  return (
    <div ref={ref} id={id} className={["chart", className, hover && "is-hover"].filter(Boolean).join(" ")}>
      {geo && (
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={label}>
          <defs>
            {geo.ser.map((s, i) => (
              <linearGradient key={i} id={`cg${i}${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={s.color} stopOpacity=".22" /><stop offset="1" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {geo.yTicks.map((k) => (
            <g key={k.v}>
              <line x1={geo.pad.l} x2={W - geo.pad.r} y1={k.y} y2={k.y} className="grid" />
              <text x={geo.pad.l - 8} y={k.y + 4} textAnchor="end" className="axis">{yFormat(k.v)}</text>
            </g>
          ))}
          {geo.xTicks.map((k, i) => <text key={i} x={k.x} y={H - 8} textAnchor={k.anchor} className="axis">{k.text}</text>)}
          {geo.ser.map((s, i) => (
            <g key={i}>
              {geo.paths[i].area && <path d={geo.paths[i].area} fill={`url(#cg${i}${uid})`} />}
              <path d={geo.paths[i].d} fill="none" stroke={s.color} strokeWidth={s.width || 2.2} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dash ? "5 5" : undefined} />
            </g>
          ))}
          <line className="cursor" y1={geo.pad.t} y2={H - geo.pad.b} x1={hover ? hover.x : -10} x2={hover ? hover.x : -10} />
          {geo.ser.map((s, i) => (
            <circle key={i} className="dot" r="4.5" cx={hover ? geo.X(hover.pts[i].t) : -10} cy={hover ? geo.Y(hover.pts[i].v) : -10} fill="#fff" stroke={s.color} strokeWidth="2.5" />
          ))}
          <rect className="hit" x={geo.pad.l} y="0" width={W - geo.pad.l - geo.pad.r} height={H} fill="transparent"
            onPointerMove={move} onPointerDown={move} onPointerLeave={() => setHover(null)} />
        </svg>
      )}
      <div className="chart-tip" ref={tipRef} hidden={!hover} style={{ left: tipLeft }}>{tip}</div>
    </div>
  );
}
