import { useState } from "react";
import Icon from "../assets/icons/Icon";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Clouds from "../components/common/Clouds";
import Accordion from "../components/common/Accordion";
import EmptyState from "../components/common/EmptyState";
import { FAQS, FAQ_CATS } from "../data/content";
import { CONFIG } from "../data/config";
import { useApp } from "../context/AppContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const count = (c) => (c === "All" ? FAQS.length : FAQS.filter((f) => f.cat === c).length);

/** FAQ: categories + live search with highlighting. */
export default function Faq() {
  useDocumentTitle("Loan FAQs | First Advisors Loans", true);
  const { openConsult } = useApp();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  const list = FAQS.filter((f) => (cat === "All" || f.cat === cat) && (!s || (f.q + " " + f.a).toLowerCase().includes(s)));

  return (
    <>
      <section className="page-hero center">
        <Clouds n={7} />
        <div className="container">
          <Breadcrumbs className="rise" crumbs={[["FAQs"]]} />
          <h1 className="rise d1">Frequently Asked <em>Questions</em></h1>
          <p className="lead rise d2">Quick answers on applying, eligibility, interest, repayment and safety.</p>
          <div className="faq-search rise d3">
            <Icon name="search" />
            <input className="input" type="search" placeholder="Search, e.g. prepayment, CIBIL, documents" aria-label="Search FAQs" value={q} onChange={(e) => { setQ(e.target.value); if (e.target.value) setCat("All"); }} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container faq-layout">
          <nav className="faq-cats panel" aria-label="FAQ categories" style={{ padding: 14 }}>
            <ul className="cat-list">
              {FAQ_CATS.map((c) => <li key={c}><button type="button" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}<span className="num">{count(c)}</span></button></li>)}
            </ul>
          </nav>
          <div>
            <p className="muted" style={{ margin: "0 0 14px" }}>
              <b className="num" style={{ color: "var(--navy)" }}>{list.length}</b> {list.length === 1 ? "question" : "questions"}{s ? ` matching “${q}”` : cat !== "All" ? " in " + cat : ""}
            </p>
            {list.length ? <Accordion key={cat + "|" + s} items={list} q={s} /> : (
              <div className="acc">
                <EmptyState title="No matching questions" text="Try different words, or ask us directly.">
                  <button type="button" className="btn btn--primary" onClick={() => openConsult()}>Ask an advisor</button>
                </EmptyState>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <div className="grid grid-3">
            <div className="info-card reveal"><span className="ic"><Icon name="phone" /></span><div><b>Call us</b><a href={`tel:${CONFIG.phoneRaw}`}>{CONFIG.phone} (toll free)</a></div></div>
            <div className="info-card reveal" style={{ "--d": ".08s" }}><span className="ic"><Icon name="mail" /></span><div><b>Email us</b><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></div></div>
            <div className="info-card reveal" style={{ "--d": ".16s" }}><span className="ic"><Icon name="clock" /></span><div><b>Still have a question?</b><a href="#" onClick={(e) => { e.preventDefault(); openConsult(); }}>Request a callback →</a></div></div>
          </div>
        </div>
      </section>
    </>
  );
}
