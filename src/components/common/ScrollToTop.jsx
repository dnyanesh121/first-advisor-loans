import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageKey } from "../../utils/pageKey";

/**
 * On page change: jump to the top (no smooth scroll), or to a #hash target.
 * Lazy-loaded pages may render a moment later, so the hash target is retried briefly.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const key = pageKey(pathname);
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); return undefined; }
    let tries = 0, t;
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else if (tries++ < 20) t = setTimeout(seek, 80);
    };
    t = setTimeout(seek, 80);
    return () => clearTimeout(t);
  }, [key, hash]);
  return null;
}
