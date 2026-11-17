/* Navigation: the two mega menus (also used by the mobile drawer and footer). */
import { BUSINESS_GROUPS, LOANS } from "./loans";
import { calcUrl, loanUrl } from "../utils/lookup";

const icon = (key) => LOANS.find((l) => l.key === key).icon;

export const MENU_YOU = [
  { h: "Personal", items: [["Personal Loan", loanUrl("personal"), "wallet"], ["Education Loan", loanUrl("education"), "cap"], ["Loan Against Securities", loanUrl("las"), "chart"], ["Check Credit Score", "/credit-score", "gauge"]] },
  { h: "Home & Property", items: [["Home Loan", loanUrl("home"), "home"], ["Home Loan Balance Transfer", calcUrl("transfer", "home"), "repeat"], ["Loan Against Property", loanUrl("lap"), "building"], ["Business Loan", loanUrl("business"), "briefcase"]] },
  { h: "Vehicle", items: [["New Car Loan", loanUrl("new-car"), "car"], ["Used Car Loan", loanUrl("used-car"), "car"], ["Two Wheeler Loan", loanUrl("two-wheeler"), "bike"]] },
  { h: "Tools", items: [["EMI Calculator", "/calculators", "calc"], ["Eligibility Calculator", calcUrl("eligibility"), "user2"], ["Interest Rates & Charges", "/rates", "percent"], ["All Loans", "/loans", "grid"]] }
];

export const MENU_BIZ = BUSINESS_GROUPS.map((g) => ({ h: g.name, items: g.items.map(([label, key]) => [label, loanUrl(key), icon(key)]) }));
