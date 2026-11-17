import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import Clouds from "../components/common/Clouds";
import SvgArt from "../components/common/SvgArt";
import SectionTitle from "../components/common/SectionTitle";
import SubscribeBox from "../components/common/SubscribeBox";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import NotFound from "./NotFound";
import { ARTICLES } from "../data/content";
import { financeArt } from "../utils/art";
import { date } from "../utils/format";
import { articleUrl } from "../utils/lookup";
import { useApp } from "../context/AppContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

/** Guide: body, table of contents with scroll-spy, reading progress, share, related guides. */
function ArticleView({ a }) {
  useDocumentTitle(`${a.title} | First Advisors Loans`, true);
  const { copy, openConsult } = useApp();
  const bodyRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const art = useMemo(() => financeArt(a.art, a.id), [a]);
  const i = ARTICLES.indexOf(a), prev = ARTICLES[i - 1], next = ARTICLES[i + 1];
  const related = ARTICLES.filter((x) => x.id !== a.id).sort((x, y) => (y.cat === a.cat) - (x.cat === a.cat)).slice(0, 3);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const u = encodeURIComponent(url);

  useEffect(() => {
    const onScroll = () => {
      const body = bodyRef.current;
      if (!body) return;
      const r = body.getBoundingClientRect(), h = r.height - window.innerHeight * 0.6;
      setProgress(Math.max(0, Math.min(100, (-r.top / h) * 100)));
      let cur = 0;
      body.querySelectorAll("h2").forEach((hd, k) => { if (hd.getBoundingClientRect().top < 140) cur = k; });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (e, k) => {
    e.preventDefault();
    document.getElementById("s" + k)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="progress" style={{ width: progress + "%" }} />
      <section className="page-hero">
        <Clouds n={5} />
        <div className="container">
          <nav className="crumbs rise" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span className="sep">/</span><Link to="/learn">Learn</Link><span className="sep">/</span><Link to={`/learn?cat=${encodeURIComponent(a.cat)}`}>{a.cat}</Link>
          </nav>
          <span className="badge badge--accent rise d1" style={{ marginTop: 16 }}>{a.cat}</span>
          <h1 className="rise d1" style={{ maxWidth: "26ch" }}>{a.title}</h1>
          <p className="muted rise d2" style={{ marginTop: 10 }}>{date(a.date)} · {a.read} min read · First Advisors Research Desk</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="article-hero reveal zoom" style={{ marginTop: -24 }}><SvgArt html={art} /></div>
          <div className="blog-layout" style={{ marginTop: 36 }}>
            <article>
              <div className="article" ref={bodyRef}>
                <p style={{ fontSize: 18.5, color: "var(--ink)" }}>{a.excerpt}</p>
                {a.body.map(([h, p], k) => (
                  <Fragment key={k}><h2 id={"s" + k}>{h}</h2><p>{p}</p></Fragment>
                ))}
                <div className="callout"><b style={{ color: "var(--accent)" }}>Want this applied to your situation?</b> An advisor can walk you through it for your own income, credit profile and loan offers. <Link className="link" to="/contact">Request a callback →</Link></div>
                <p className="muted" style={{ fontSize: 12.5, marginTop: 18 }}>This guide is for general information and is not financial, tax or legal advice. Loans are subject to the lender's credit assessment and terms; read the sanction letter and Key Fact Statement carefully.</p>
              </div>
              <div className="flex between" style={{ borderTop: "1px solid var(--line)", paddingTop: 18, marginTop: 10 }}>
                <div className="flex">
                  {[a.cat, "Loans", "Personal finance"].map((t) => <span className="chip" key={t} style={{ fontSize: 12, padding: "3px 10px" }}>#{t}</span>)}
                </div>
                <div className="share">
                  <span className="muted" style={{ fontSize: 13 }}>Share:</span>
                  <button type="button" className="icon-btn" aria-label="Copy link" onClick={() => copy(window.location.href, "Link copied")}><Icon name="link" /></button>
                  <a className="icon-btn" href={"https://wa.me/?text=" + encodeURIComponent(a.title + " ") + u} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><Icon name="whats" /></a>
                  <a className="icon-btn" href={"https://www.linkedin.com/sharing/share-offsite/?url=" + u} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Icon name="in" /></a>
                </div>
              </div>
              <div className="flex between mt-8">
                {prev ? <Link className="btn btn--ghost" to={articleUrl(prev)}>← Previous guide</Link> : <span />}
                {next && <Link className="btn btn--ghost" to={articleUrl(next)}>Next guide →</Link>}
              </div>
            </article>
            <aside className="blog-side">
              <div className="panel toc">
                <h2 style={{ fontSize: 17 }}>In this <em>guide</em></h2>
                <ol>{a.body.map(([h], k) => <li key={k}><a href={"#s" + k} className={k === active ? "is-active" : undefined} onClick={(e) => goTo(e, k)}>{h}</a></li>)}</ol>
              </div>
              <div className="panel">
                <b style={{ color: "var(--navy)", fontSize: 16 }}>Talk to an advisor</b>
                <p className="muted" style={{ fontSize: 13, margin: "6px 0 12px" }}>Questions about your own loan? We'll call you back.</p>
                <button type="button" className="btn btn--primary btn--sm btn--block" onClick={() => openConsult()}>Request a Callback</button>
              </div>
              <SubscribeBox id="art-email" />
            </aside>
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Related <em>Guides</em></>} />
          <div className="grid grid-3">{related.map((x, k) => <ArticleCard key={x.id} article={x} index={k} />)}</div>
        </div>
      </section>
    </>
  );
}

export default function Article() {
  const { id } = useParams();
  const a = ARTICLES.find((x) => x.id === Number(id));
  if (!a) return <NotFound />;
  return <ArticleView key={a.id} a={a} />;
}
