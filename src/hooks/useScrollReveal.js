import { useEffect } from "react";

/**
 * Scroll reveal for every `.reveal` element (styles in animations.css).
 * Watches the DOM for new `.reveal` nodes, adds `.is-in` when they enter the
 * viewport, and keeps `.is-in` if React later rewrites the element's class.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const shown = new WeakSet();
    if (!("IntersectionObserver" in window)) {
      const showAll = () => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        shown.add(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    const watched = new WeakSet();
    const scan = () => {
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
        if (shown.has(el)) { el.classList.add("is-in"); return; }
        if (!watched.has(el)) { watched.add(el); io.observe(el); }
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    return () => { mo.disconnect(); io.disconnect(); };
  }, []);
}
