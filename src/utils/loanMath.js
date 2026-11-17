/* ==========================================================================
   Loan maths: EMI on a reducing balance, affordable principal, month-by-month
   amortisation (with an optional prepayment) and a yearly roll-up.
   ========================================================================== */

/** monthly EMI on a reducing balance */
export function emi(P, annualPct, months) {
  const r = annualPct / 12 / 100;
  if (!r) return P / months;
  const k = Math.pow(1 + r, months);
  return (P * r * k) / (k - 1);
}

/** principal that a given EMI can service */
export function principalFor(e, annualPct, months) {
  const r = annualPct / 12 / 100;
  if (!r) return e * months;
  const k = Math.pow(1 + r, months);
  return (e * (k - 1)) / (r * k);
}

/**
 * Month-by-month schedule. Optional prepay { month, amount, mode: "tenure" | "emi" }.
 * Returns { rows:[{ m, emi, interest, principal, balance, prepaid? }], totalInterest, months, emi }
 */
export function schedule(P, annualPct, months, prepay) {
  const r = annualPct / 12 / 100, rows = [];
  let bal = P, e = emi(P, annualPct, months), ti = 0, m = 0;
  while (bal > 0.5 && m < 1200) {
    m++;
    const int = bal * r, pr = Math.min(e - int, bal);
    if (pr <= 0) break;
    bal -= pr; ti += int;
    rows.push({ m, emi: pr + int, interest: int, principal: pr, balance: Math.max(0, bal) });
    if (prepay && m === prepay.month && prepay.amount > 0 && bal > 0) {
      const pp = Math.min(prepay.amount, bal);
      bal -= pp;
      rows[rows.length - 1].prepaid = pp;
      rows[rows.length - 1].balance = bal;
      if (prepay.mode === "emi" && bal > 0) e = emi(bal, annualPct, months - m);
    }
  }
  return { rows, totalInterest: ti, months: rows.length, emi: emi(P, annualPct, months) };
}

/** yearly roll-up of a schedule */
export function yearly(rows) {
  const out = [];
  rows.forEach((r) => {
    const y = Math.ceil(r.m / 12);
    const o = out[y - 1] || (out[y - 1] = { year: y, emi: 0, interest: 0, principal: 0, prepaid: 0, balance: 0 });
    o.emi += r.emi; o.interest += r.interest; o.principal += r.principal; o.prepaid += r.prepaid || 0; o.balance = r.balance;
  });
  return out;
}

/** slider steps used by every calculator for a loan */
export const amountStep = (l) => (l.max > 2e7 ? 100000 : l.max > 2e6 ? 10000 : 5000);
export const tenureStep = (l) => (l.tMax > 120 ? 12 : l.tMax <= 12 ? 1 : 6);
