import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import { amountRange, rate } from "../../utils/format";
import { loanUrl } from "../../utils/lookup";

/** Compact product tile (icon + name + one-line figure). */
export default function LoanTile({ loan: l, index = 0 }) {
  return (
    <Link className="ltile reveal" style={{ "--d": (index % 6) * 0.05 + "s" }} to={loanUrl(l)}>
      <span className="ic"><Icon name={l.icon} /></span>
      <b>{l.name}</b>
      <small className="num">From {rate(l.rate)} · {amountRange(l)}</small>
    </Link>
  );
}
