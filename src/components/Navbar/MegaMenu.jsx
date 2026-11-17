import { useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import SvgArt from "../common/SvgArt";
import { financeArt } from "../../utils/art";

/**
 * Mega menu panel: four link columns + a promo card.
 * promo: { art, badge, title, text, to, cta }
 */
export default function MegaMenu({ id, label, menu, promo, onNavigate }) {
  const art = useMemo(() => financeArt(promo.art, 4), [promo.art]);
  return (
    <div className="mega" id={id} role="region" aria-label={label}>
      <div className="container">
        <div className="mega-inner">
          {menu.map((col) => (
            <div key={col.h}>
              <h4>{col.h}</h4>
              <ul>
                {col.items.map(([text, to, icon]) => (
                  <li key={text}><Link to={to} onClick={onNavigate}><Icon name={icon} />{text}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mega-promo">
            <div className="art"><SvgArt html={art} /></div>
            <div className="txt">
              <span className="badge badge--accent">{promo.badge}</span>
              <b style={{ marginTop: 6 }}>{promo.title}</b>
              <span>{promo.text}</span><br />
              <Link className="btn btn--white btn--sm" to={promo.to} onClick={onNavigate}>{promo.cta}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
