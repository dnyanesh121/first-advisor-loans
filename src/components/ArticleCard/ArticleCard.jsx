import { useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import SvgArt from "../common/SvgArt";
import { financeArt } from "../../utils/art";
import { date } from "../../utils/format";
import { articleUrl } from "../../utils/lookup";

/** Guide card with illustration; `wide` is the featured layout on Learn. */
export default function ArticleCard({ article: a, index = 0, wide }) {
  const href = articleUrl(a);
  const art = useMemo(() => financeArt(a.art, a.id), [a.art, a.id]);
  return (
    <article className={"bcard reveal" + (wide ? " bcard--wide" : "")} style={{ "--d": (index % 3) * 0.08 + "s" }}>
      <Link className="media" to={href} tabIndex={-1} aria-hidden="true">
        <SvgArt html={art} />
        <span className="badge badge--accent">{a.cat}</span>
      </Link>
      <div className="body">
        <div className="meta"><span>{date(a.date)}</span><span>·</span><span>{a.read} min read</span></div>
        <h3><Link to={href}>{a.title}</Link></h3>
        <p>{a.excerpt}</p>
        <Link className="link-arrow" to={href}>Read article <Icon name="arrow" /></Link>
      </div>
    </article>
  );
}
