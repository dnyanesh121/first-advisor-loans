import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import { BUSINESS_GROUPS } from "../../data/loans";
import { amountRange, rate } from "../../utils/format";
import { getLoan, loanUrl } from "../../utils/lookup";

/** "Loans for Business": category tabs with an intro card and sub-product links. */
export default function BusinessLoans() {
  const [key, setKey] = useState(BUSINESS_GROUPS[0].key);
  const g = BUSINESS_GROUPS.find((x) => x.key === key), main = getLoan(g.items[0][1]);
  return (
    <>
      <div className="cat-tabs reveal" role="tablist" aria-label="Business loan categories">
        {BUSINESS_GROUPS.map((x) => (
          <button type="button" role="tab" key={x.key} aria-selected={x.key === key} onClick={() => setKey(x.key)}><Icon name={x.icon} />{x.name}</button>
        ))}
      </div>
      <div role="tabpanel">
        <div className="cat-panel">
          <div className="cat-intro">
            <span className="num-big num">{rate(main.rate)}</span><span style={{ opacity: 0.8, fontSize: 13 }}> p.a. onwards*</span>
            <h3 style={{ marginTop: 10 }}>{g.name}</h3>
            <p>{g.text}</p>
            <Link className="btn btn--white btn--sm" to={loanUrl(main)}>Explore {main.name}</Link>
          </div>
          <div className="subgrid">
            {g.items.map(([label, k]) => {
              const l = getLoan(k);
              return <Link className="sublink" key={label} to={loanUrl(l)}><span>{label}<small>{amountRange(l)}</small></span><Icon name="arrow" /></Link>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
