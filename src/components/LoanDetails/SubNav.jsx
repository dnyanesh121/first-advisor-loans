import { useEffect, useRef, useState } from "react";

/** Sticky in-page navigation with scroll-spy. sections: [[id, label]] */
export default function SubNav({ sections }) {
  const [active, setActive] = useState(sections[0][0]);
  const barRef = useRef(null);

  useEffect(() => {
    const spy = () => {
      const bar = barRef.current;
      if (!bar) return;
      const lim = bar.getBoundingClientRect().bottom + 90;
      let cur = sections[0][0];
      sections.forEach(([id]) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < lim) cur = id; });
      setActive(cur);
    };
    window.addEventListener("scroll", spy, { passive: true });
    return () => window.removeEventListener("scroll", spy);
  }, [sections]);

  // keep the active link visible in the horizontally scrolling bar
  useEffect(() => {
    const bar = barRef.current, a = bar?.querySelector(`a[href="#${active}"]`);
    if (a && bar.scrollTo) bar.scrollTo({ left: a.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className="subnav" aria-label="On this page">
      <div className="container">
        <div className="subnav-in" ref={barRef}>
          {sections.map(([id, label]) => <a key={id} href={`#${id}`} className={id === active ? "is-active" : undefined} onClick={(e) => go(e, id)}>{label}</a>)}
        </div>
      </div>
    </nav>
  );
}
