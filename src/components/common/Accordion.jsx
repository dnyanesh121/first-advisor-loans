import { useId, useState } from "react";
import Icon from "../../assets/icons/Icon";

/** wraps every match of `q` in <mark> */
function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

function AccItem({ item, open, onToggle, q }) {
  const id = "faq-" + useId().replace(/:/g, "");
  return (
    <div className={`acc-item${open ? " is-open" : ""}`}>
      <button type="button" className="acc-btn" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span>{highlight(item.q, q)}</span>
        <span className="pm"><Icon name="plus" /></span>
      </button>
      <div className="acc-panel" id={id} role="region"><div><p>{highlight(item.a, q)}</p></div></div>
    </div>
  );
}

/**
 * FAQ accordion: one item open at a time, first item open by default.
 * items: [{ q, a }] · q (optional) highlights matches.
 */
export default function Accordion({ items, q = "", firstOpen = true }) {
  const [open, setOpen] = useState(firstOpen ? 0 : -1);
  return (
    <div className="acc">
      {items.map((it, i) => (
        <AccItem key={it.q} item={it} q={q} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </div>
  );
}
