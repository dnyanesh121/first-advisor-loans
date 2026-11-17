import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";

/**
 * Responsive rate table (.rate-table): cards on mobile via data-label.
 * columns: [{ h, label?, cell(l), num?, style? }] · groups: [{ title?, loans }]
 */
export default function RateTable({ columns, groups, rowHead, action, id }) {
  return (
    <div className="rt-wrap reveal">
      <table className="rate-table" id={id}>
        <thead>
          <tr>
            <th>Loan</th>
            {columns.map((c) => <th key={c.h}>{c.h}</th>)}
            <th><span className="sr-only">Apply</span></th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => [
            g.title && <tr className="grp" key={"g" + g.title}><th colSpan={columns.length + 2}>{g.title}</th></tr>,
            ...g.loans.map((l) => (
              <tr key={l.key}>
                <th scope="row"><Link to={rowHead(l)}><Icon name={l.icon} />{l.name}</Link></th>
                {columns.map((c) => <td key={c.h} className={c.num ? "num" : undefined} data-label={c.label || c.h} style={c.style}>{c.cell(l)}</td>)}
                <td><Link className="btn btn--outline btn--sm" to={action(l)}>Apply</Link></td>
              </tr>
            ))
          ])}
        </tbody>
      </table>
    </div>
  );
}
