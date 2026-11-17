import SvgArt from "./SvgArt";
import { emptySVG } from "../../utils/art";

const ART = emptySVG();

/** Friendly empty result with an optional call to action (children). */
export default function EmptyState({ title, text, children }) {
  return (
    <div className="empty">
      <SvgArt html={ART} />
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
