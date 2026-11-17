import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Logo from "../../assets/icons/Logo";
import MegaMenu from "./MegaMenu";
import Drawer from "./Drawer";
import { MENU_BIZ, MENU_YOU } from "../../data/menu";
import { getLoan, loanUrl, rateLabel } from "./navHelpers";
import { useApp } from "../../context/AppContext";
import useScrolled from "../../hooks/useScrolled";
import useKeydown from "../../hooks/useKeydown";

const MEGAS = [
  { id: "megaYou", label: "Loans for You", seg: "you", menu: MENU_YOU,
    promo: { art: "home", badge: "Home loans", title: `Rates from ${rateLabel("home")}*`, text: "Compare offers from our partner banks and NBFCs.", to: loanUrl("home"), cta: "Explore home loans" } },
  { id: "megaBiz", label: "Loans for Business", seg: "business", menu: MENU_BIZ,
    promo: { art: "business", badge: "For MSMEs", title: "Working capital to fit your cycle", text: "Channel finance, invoice discounting and term loans.", to: "/loans?seg=business", cta: "Explore business loans" } }
];

/** Sticky header: logo, two mega menus, primary links, track / login / Apply Now, burger. */
export default function Navbar() {
  const { pathname } = useLocation();
  const [qp] = useSearchParams();
  const { openLogin } = useApp();
  const scrolled = useScrolled(10);
  const [open, setOpen] = useState(null); // id of the open mega menu
  const [drawer, setDrawer] = useState(false);
  const navRef = useRef(null);
  const closeT = useRef();
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  // which mega menu is "active" for the current page
  const seg = pathname === "/loans" ? qp.get("seg") : pathname.startsWith("/loans/") ? (getLoan(pathname.split("/")[2]) || {}).seg : null;

  useEffect(() => { setOpen(null); setDrawer(false); }, [pathname, qp]);
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (!e.target.closest(`[data-mega="${open}"]`)) setOpen(null); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);
  useKeydown((e) => {
    if (e.key !== "Escape") return;
    const btn = navRef.current?.querySelector(`[data-mega="${open}"] > button`);
    setOpen(null); btn?.focus();
  }, !!open);

  const navCls = ({ isActive }) => (isActive ? "is-active" : "");

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`} id="hdr">
        <div className="container bar">
          <Link className="logo" to="/" aria-label="First Advisors Group — Loans home"><Logo /></Link>
          <nav className="nav nav--loans" aria-label="Primary" ref={navRef}>
            {MEGAS.map((m) => (
              <div key={m.id} className={`has-mega${open === m.id ? " is-open" : ""}`} data-mega={m.id}
                {...(canHover ? {
                  onMouseEnter: () => { clearTimeout(closeT.current); setOpen(m.id); },
                  onMouseLeave: () => { closeT.current = setTimeout(() => setOpen((o) => (o === m.id ? null : o)), 180); }
                } : {})}>
                <button type="button" className={seg === m.seg ? "is-active" : ""} aria-expanded={open === m.id} aria-controls={m.id} onClick={() => setOpen(open === m.id ? null : m.id)}>
                  {m.label} <Icon name="chevron" className="caret" />
                </button>
                <MegaMenu id={m.id} label={`${m.label} menu`} menu={m.menu} promo={m.promo} onNavigate={() => setOpen(null)} />
              </div>
            ))}
            <NavLink to="/calculators" end className={navCls}>EMI Calculator</NavLink>
            <NavLink to="/rates" end className={navCls}>Interest Rates</NavLink>
            <NavLink to="/credit-score" end className={navCls}>Credit Score</NavLink>
            <NavLink to="/learn" end className={navCls}>Learn</NavLink>
          </nav>
          <div className="header-actions">
            <Link className="hdr-icon hdr-track" to="/apply/track" aria-label="Track application" title="Track application"><Icon name="search" /></Link>
            <button type="button" className="hdr-login" onClick={openLogin}>Login</button>
            <Link className="btn btn--primary btn--sm hdr-apply" to="/apply">Apply Now</Link>
            <button type="button" className="burger" id="burger" aria-label="Open menu" aria-expanded={drawer} aria-controls="drawer" onClick={() => setDrawer(true)}><span /></button>
          </div>
        </div>
      </header>
      <Drawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
