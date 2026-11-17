import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import { amountRange, rate } from "../../utils/format";
import { applyUrl, loanUrl } from "../../utils/lookup";

/** Loan product card: icon, name, tagline, starting rate, amount and actions. */
export default function LoanCard({ loan: l, index = 0 }) {
  return (
    <article className="lcard reveal" style={{ "--d": (index % 4) * 0.06 + "s" }}>
      <Link className="lcard-hd" to={loanUrl(l)}><span className="ic"><Icon name={l.icon} /></span><h3>{l.name}</h3></Link>
      <p>{l.tagline}</p>
      <dl className="lcard-kv num">
        <div><dt>Rate from</dt><dd>{rate(l.rate)}<small> p.a.*</small></dd></div>
        <div><dt>Amount</dt><dd>{amountRange(l)}</dd></div>
      </dl>
      <div className="lcard-foot">
        <Link className="btn btn--primary btn--sm" to={applyUrl(l)}>Apply Now</Link>
        <Link className="link-arrow" to={loanUrl(l)}>Know more <Icon name="arrow" /></Link>
      </div>
    </article>
  );
}
