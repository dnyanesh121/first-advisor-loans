import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Logo from "../../assets/icons/Logo";
import { CONFIG } from "../../data/config";
import { loansBySeg, loanUrl } from "../../utils/lookup";
import { useApp } from "../../context/AppContext";
import useKeydown from "../../hooks/useKeydown";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

/** Mobile slide-in menu. */
export default function Drawer({ open, onClose }) {
  const { openLogin } = useApp();
  useLockBodyScroll(open);
  useKeydown((e) => e.key === "Escape" && onClose(), open);
  const group = (seg) => <ul>{loansBySeg(seg).map((l) => <li key={l.key}><Link to={loanUrl(l)} onClick={onClose}>{l.name}</Link></li>)}</ul>;
  return (
    <div className={`drawer${open ? " is-open" : ""}`} id="drawer" aria-hidden={!open}>
      <div className="scrim" onClick={onClose} />
      <div className="panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="panel-head">
          <Link className="logo" to="/" onClick={onClose}><Logo /></Link>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu"><Icon name="x" /></button>
        </div>
        <nav>
          <Link className="dlink" to="/" onClick={onClose}>Home</Link>
          <details open><summary>Loans for You<Icon name="chevron" /></summary>{group("you")}</details>
          <details><summary>Loans for Business<Icon name="chevron" /></summary>{group("business")}</details>
          <Link className="dlink" to="/calculators" onClick={onClose}>EMI Calculator</Link>
          <Link className="dlink" to="/rates" onClick={onClose}>Interest Rates &amp; Charges</Link>
          <Link className="dlink" to="/credit-score" onClick={onClose}>Check Credit Score</Link>
          <Link className="dlink" to="/apply/track" onClick={onClose}>Track Application</Link>
          <Link className="dlink" to="/learn" onClick={onClose}>Learn</Link>
          <Link className="dlink" to="/contact" onClick={onClose}>Contact</Link>
          <div className="cta-row">
            <Link className="btn btn--primary" to="/apply" onClick={onClose}>Apply Now</Link>
            <button type="button" className="btn btn--outline" onClick={() => { onClose(); openLogin(); }}>Login</button>
            <a className="btn btn--ghost" href={`tel:${CONFIG.phoneRaw}`}><Icon name="phone" />{CONFIG.phone}</a>
          </div>
        </nav>
      </div>
    </div>
  );
}
