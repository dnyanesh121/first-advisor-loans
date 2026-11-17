import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import ApplicationForm from "../components/Apply/ApplicationForm";
import TrackApplication from "../components/Apply/TrackApplication";
import { getLoan } from "../utils/lookup";
import useDocumentTitle from "../hooks/useDocumentTitle";

/** Apply (/apply?type=home) and Track (/apply/track?ref=FAL…) share one page with a switch. */
export default function Apply() {
  useDocumentTitle("Apply for a Loan | First Advisors Loans", true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [qp] = useSearchParams();
  const track = pathname.endsWith("/track");
  const [loan, setLoan] = useState(() => getLoan(qp.get("type")) || getLoan("personal"));

  const show = (which) => navigate(which === "track" ? "/apply/track" : `/apply${qp.get("type") ? `?type=${qp.get("type")}` : ""}`, { replace: true });

  return (
    <>
      <PageHero title={<>Apply for a <em>Loan</em></>} crumbs={[["Apply"]]} art="doc" lead="A short application in four steps. An advisor reviews it, matches you with suitable lenders and calls you with offers." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="seg ap-switch reveal" role="tablist" aria-label="Apply or track">
            <button type="button" role="tab" id="tab-apply" aria-selected={!track} aria-pressed={!track} aria-controls="applyPane" onClick={() => show("apply")}>Apply for a loan</button>
            <button type="button" role="tab" id="tab-track" aria-selected={track} aria-pressed={track} aria-controls="trackPane" onClick={() => show("track")}>Track application</button>
          </div>
          {/* both panes stay mounted so a half-filled application survives switching tabs */}
          <div id="applyPane" role="tabpanel" hidden={track}><ApplicationForm loan={loan} onLoan={setLoan} /></div>
          <div id="trackPane" role="tabpanel" hidden={!track}><TrackApplication key={qp.get("ref") || "t"} initialRef={qp.get("ref")} /></div>
        </div>
      </section>
    </>
  );
}
