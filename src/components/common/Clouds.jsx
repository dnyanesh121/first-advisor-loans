import { memo } from "react";
import { rng } from "../../utils/art";

/** Slow drifting clouds behind hero sections (deterministic layout per n). */
function Clouds({ n = 6 }) {
  const R = rng(n || 5);
  const items = Array.from({ length: n || 6 }, () => ({
    left: (R() * 95 - 5).toFixed(1) + "%",
    top: (R() * 85).toFixed(1) + "%",
    width: (140 + R() * 260 | 0) + "px",
    height: (50 + R() * 70 | 0) + "px",
    animationDuration: (30 + R() * 30 | 0) + "s",
    animationDelay: "-" + (R() * 20 | 0) + "s"
  }));
  return (
    <div className="clouds" aria-hidden="true">
      {items.map((style, i) => <span key={i} className="cloud" style={style} />)}
    </div>
  );
}
export default memo(Clouds);
