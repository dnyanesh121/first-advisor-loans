/* Loan lookups and route builders — every URL in one place. */
import { LOANS } from "../data/loans";

export const getLoan = (key) => LOANS.find((l) => l.key === key);
export const loansBySeg = (seg) => LOANS.filter((l) => l.seg === seg);

export const loanUrl = (l) => `/loans/${l.key || l}`;
export const applyUrl = (l) => `/apply?type=${l.key || l}`;
export const articleUrl = (a) => `/learn/${a.id ?? a}`;
export const calcUrl = (type, loan) => `/calculators?type=${type}${loan ? `&loan=${loan.key || loan}` : ""}`;
