/* Number, currency, rate, tenure and date formatting (Indian conventions). */

/** ₹1,23,456 */
export const inr = (n, dec = 0) =>
  "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec });

/** ₹12.5 L / ₹1.2 Cr */
export function short(n) {
  if (n >= 1e7) return "₹" + (n / 1e7).toFixed(2).replace(/\.?0+$/, "") + " Cr";
  if (n >= 1e5) return "₹" + (n / 1e5).toFixed(2).replace(/\.?0+$/, "") + " L";
  return inr(n);
}

/** 10.5 → "10.50%" */
export const rate = (r) => Number(r).toFixed(2) + "%";

/** 6 Nov 2026 */
export const date = (d) =>
  new Date(typeof d === "string" && d.length === 10 ? d + "T00:00:00" : d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** months → "5 years" / "18 months" / "1 year" */
export function tenure(m) {
  if (m < 12) return m + (m === 1 ? " month" : " months");
  if (m % 12 === 0) return m / 12 + (m === 12 ? " year" : " years");
  return m + " months";
}

/** "1–6 years" / "Up to 1 year" */
export const tenureRange = (l) =>
  l.tMin < 12 && l.tMax <= 12 ? "Up to " + tenure(l.tMax) : tenure(l.tMin).replace(/ years?| months?/, "") + "–" + tenure(l.tMax);

/** "Up to ₹40 L" */
export const amountRange = (l) => "Up to " + short(l.max);

/** month i from now (1st of the month) as a timestamp — for schedules and charts */
export const monthFromNow = (i) => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + i); return d.getTime(); };

/** "Dec 2026" */
export const monthYear = (t) => new Date(t).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
