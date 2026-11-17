import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Logo from "../../assets/icons/Logo";
import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field from "../Forms/Field";
import { CONFIG as C } from "../../data/config";
import { calcUrl, loansBySeg, loanUrl } from "../../utils/lookup";

/** internal routes use <Link>, external URLs a plain <a> */
function FLink({ to, children }) {
  return /^https?:/.test(to) ? <a href={to}>{children}</a> : <Link to={to}>{children}</Link>;
}
function LinkList({ items }) {
  return <ul>{items.map(([label, to]) => <li key={label}><FLink to={to}>{label}</FLink></li>)}</ul>;
}

const COLUMNS = [
  ["Loans for You", loansBySeg("you").map((l) => [l.name, loanUrl(l)])],
  ["Loans for Business", loansBySeg("business").map((l) => [l.name, loanUrl(l)])],
  ["Tools", [["EMI Calculator", calcUrl("emi")], ["Eligibility Calculator", calcUrl("eligibility")], ["Balance Transfer Calculator", calcUrl("transfer")], ["Prepayment Calculator", calcUrl("prepay")], ["Interest Rates & Charges", "/rates"], ["Check Credit Score", "/credit-score"], ["Track Application", "/apply/track"]]],
  ["Company", [["All Loans", "/loans"], ["Learn", "/learn"], ["FAQs", "/faq"], ["Contact & Branches", "/contact"], ["Grievance Redressal", "/contact#grievance"], ["Insurance", C.groupUrl], ["Mutual Funds", C.groupUrl]]]
];

/** Newsletter, six-column links, not-a-lender disclosure + fraud alert, bottom bar. */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="news">
          <div>
            <h3>Rate updates and offers <em>in your inbox</em></h3>
            <p>Rate changes, festive offers and borrowing tips. One email a month.</p>
          </div>
          <ValidatedForm className="news-form" successTitle="Subscribed" success="You are subscribed to monthly loan updates.">
            <Field id="nl-email" label="Email" hideLabel type="email" required placeholder="Your email address" aria-label="Email" />
            <SubmitButton className="btn btn--primary" style={{ minHeight: 46 }}>Subscribe</SubmitButton>
          </ValidatedForm>
        </div>

        <div className="fgrid fgrid--mf">
          <div>
            <Link to="/" className="logo" style={{ marginBottom: 12 }}><Logo /></Link>
            <p className="legal-txt">{C.irda}</p>
            <p className="legal-txt" style={{ margin: 0 }}>Copyright © 2016–2029 All Rights Reserved First Advisor Insurance Brokers Pvt. Ltd.</p>
            <div className="socials">
              <a href="#" aria-label="Facebook"><Icon name="fb" /></a>
              <a href="#" aria-label="Instagram"><Icon name="ig" /></a>
              <a href="#" aria-label="LinkedIn"><Icon name="in" /></a>
              <a href="#" aria-label="YouTube"><Icon name="yt" /></a>
            </div>
          </div>
          {COLUMNS.map(([h, items]) => <div key={h}><h4>{h}</h4><LinkList items={items} /></div>)}
          <div>
            <h4>Get in touch</h4>
            <ul className="contact">
              <li><Icon name="mail" /><a href={`mailto:${C.email}`}>{C.email}</a></li>
              <li><Icon name="phone" /><a href={`tel:${C.phoneRaw}`}>{C.phone}</a></li>
              <li><Icon name="pin" /><span>Head Office: {C.address}</span></li>
              <li><Icon name="clock" /><span>{C.hours}</span></li>
            </ul>
          </div>
        </div>

        <div className="rera">
          <b>First Advisors arranges loans from partner banks and NBFCs regulated by the Reserve Bank of India. We are not a lender.</b> Loans are sanctioned at the sole discretion of the lending partner, subject to its credit assessment, and the final rate, fees and terms are in the lender's sanction letter and Key Fact Statement. Rates shown are indicative. [add DSA / partner registration details]{" "}
          <br /><b>Fraud alert:</b> We never ask for an upfront payment, OTP or UPI PIN to approve a loan. Report cyber fraud at cybercrime.gov.in or call 1930.
        </div>
        <div className="fbottom">
          <span>© {new Date().getFullYear()} First Advisors Group of Companies</span>
          <span><a href="#">Privacy Policy</a> · <a href="#">Terms of Use</a> · <Link to="/contact#grievance">Grievance Redressal</Link> · <a href="#">Fair Practices Code</a></span>
        </div>
      </div>
    </footer>
  );
}
