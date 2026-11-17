import { useEffect, useRef } from "react";
import Icon from "../../assets/icons/Icon";
import useKeydown from "../../hooks/useKeydown";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

/**
 * Accessible dialog: scrim, Escape to close, focus moves in on open and back on close.
 * Uses the site's .modal / .box styles (fade + pop-in keyframes in components.css).
 */
export default function Modal({ open, onClose, id, title, subtitle, children }) {
  const boxRef = useRef(null);
  const lastFocus = useRef(null);
  useLockBodyScroll(open);
  useKeydown((e) => e.key === "Escape" && onClose(), open);

  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    const t = setTimeout(() => boxRef.current?.querySelector("input:not([type=hidden]),select,button:not(.close)")?.focus(), 60);
    return () => { clearTimeout(t); lastFocus.current?.focus?.(); };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal is-open" id={id}>
      <div className="scrim" onClick={onClose} />
      <div className="box" role="dialog" aria-modal="true" aria-labelledby={`${id}-t`} ref={boxRef}>
        <button type="button" className="icon-btn close" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        <h3 id={`${id}-t`}>{title}</h3>
        {subtitle && <p className="muted" style={{ margin: "6px 0 20px", fontSize: 14 }}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
