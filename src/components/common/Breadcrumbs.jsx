import { Fragment } from "react";
import { Link } from "react-router-dom";

/** crumbs: [["Label", "/path"], ["Current page"]] */
export default function Breadcrumbs({ crumbs = [], className }) {
  return (
    <nav className={className ? `crumbs ${className}` : "crumbs"} aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {crumbs.map(([label, to], i) => (
        <Fragment key={i}>
          <span className="sep">/</span>
          {to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
