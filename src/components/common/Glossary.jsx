import { GLOSSARY } from "../../data/content";

/** Loan terms as a definition grid. */
export default function Glossary() {
  return (
    <dl className="gloss reveal">
      {GLOSSARY.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
    </dl>
  );
}
