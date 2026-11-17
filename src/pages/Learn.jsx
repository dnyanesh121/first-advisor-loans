import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import PageHero from "../components/common/PageHero";
import EmptyState from "../components/common/EmptyState";
import SectionTitle from "../components/common/SectionTitle";
import Glossary from "../components/common/Glossary";
import SubscribeBox from "../components/common/SubscribeBox";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import { ARTICLES, ARTICLE_CATS } from "../data/content";
import useDocumentTitle from "../hooks/useDocumentTitle";

const FEATURED = ARTICLES[0];

/** Guides with category filter and search, plus the glossary. */
export default function Learn() {
  useDocumentTitle("Learn — Loan Guides | First Advisors Loans", true);
  const [qp] = useSearchParams();
  const [cat, setCat] = useState(() => (ARTICLE_CATS.includes(qp.get("cat")) ? qp.get("cat") : "All"));
  const [q, setQ] = useState("");
  const s = q.toLowerCase();
  const list = ARTICLES.filter((a) => (cat === "All" || a.cat === cat) && (!s || (a.title + " " + a.excerpt + " " + a.cat).toLowerCase().includes(s)) && (cat !== "All" || s || a !== FEATURED));

  return (
    <>
      <PageHero title={<>Learn <em>Borrowing</em></>} crumbs={[["Learn"]]} lead="Short, practical guides on credit scores, interest rates and choosing the right loan." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}><ArticleCard article={FEATURED} wide /></div>
          <div className="blog-layout">
            <div>
              <div className="toolbar learn-cats">
                <span className="count"><b className="num">{list.length}</b> {list.length === 1 ? "guide" : "guides"}{cat !== "All" ? " in " + cat : ""}</span>
                <div className="opts flex" style={{ gap: 6 }}>
                  {ARTICLE_CATS.map((c) => <button type="button" className="chip" key={c} aria-pressed={c === cat} style={{ fontSize: 12.5, padding: "4px 12px" }} onClick={() => setCat(c)}>{c}</button>)}
                </div>
              </div>
              <div className="grid grid-2">
                {list.length ? list.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />) : (
                  <div style={{ gridColumn: "1/-1" }}><EmptyState title="No guides found" text="Try a different word or category." /></div>
                )}
              </div>
            </div>
            <aside className="blog-side">
              <div className="panel">
                <div className="faq-search" style={{ margin: 0 }}>
                  <Icon name="search" />
                  <input className="input" type="search" placeholder="Search guides" aria-label="Search guides" style={{ minHeight: 46, boxShadow: "none", borderColor: "var(--line-2)" }} value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
              </div>
              <div className="panel">
                <h2 style={{ fontSize: 17 }}>Tools</h2>
                <div style={{ display: "grid", gap: 10, fontSize: 14, justifyItems: "start" }}>
                  <Link className="link-arrow" to="/calculators">EMI calculator <Icon name="arrow" /></Link>
                  <Link className="link-arrow" to="/calculators?type=eligibility">Eligibility calculator <Icon name="arrow" /></Link>
                  <Link className="link-arrow" to="/credit-score">Check credit score <Icon name="arrow" /></Link>
                  <Link className="link-arrow" to="/rates">Interest rates &amp; charges <Icon name="arrow" /></Link>
                  <Link className="link-arrow" to="/faq">FAQs <Icon name="arrow" /></Link>
                </div>
              </div>
              <SubscribeBox id="side-email" />
            </aside>
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Loan <em>Glossary</em></>} subtitle="Key terms in one line each" />
          <Glossary />
        </div>
      </section>
    </>
  );
}
