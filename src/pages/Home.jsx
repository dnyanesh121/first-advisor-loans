import { Link } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import HomeHero from "../components/Home/HomeHero";
import StatsBand from "../components/Home/StatsBand";
import BusinessLoans from "../components/Home/BusinessLoans";
import SectionTitle from "../components/common/SectionTitle";
import Accordion from "../components/common/Accordion";
import Slider from "../components/common/Slider";
import InfoCard from "../components/common/InfoCard";
import LoanCard from "../components/loan/LoanCard";
import EmiWidget from "../components/loan/EmiWidget";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import TestimonialCard from "../components/Testimonials/TestimonialCard";
import ValidatedForm, { SubmitButton } from "../components/Forms/ValidatedForm";
import Field, { CheckLabel } from "../components/Forms/Field";
import { CONFIG as C } from "../data/config";
import { LOANS } from "../data/loans";
import { ARTICLES, FAQS, TESTIMONIALS } from "../data/content";
import { getLoan, loansBySeg } from "../utils/lookup";
import { useApp } from "../context/AppContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const LOAN_NAMES = LOANS.map((l) => l.name);
const WHY = [
  ["scale", "Compare, then choose", "Offers from several banks and NBFCs side by side — rate, fees, APR and total cost."],
  ["doc", "Every charge in writing", "We walk you through the Key Fact Statement before you sign."],
  ["home", "Doorstep service", "Document pick-up and digital KYC, so you don't have to visit a branch."],
  ["handshake", "With you till closure", "Help with part-payments, rate resets, top-ups and your closure NOC."]
];
const STEPS = [
  ["user2", "Share your requirement", "Tell us the amount and purpose online, on a call or on WhatsApp."],
  ["scale", "Compare offers", "We check eligibility with suitable lenders and show you the rate, fees and EMI."],
  ["doc", "Submit documents", "Upload documents or have them collected from your doorstep."],
  ["rupee", "Get disbursed", "Sign the agreement and the lender transfers funds to your account."]
];
const ASK = [
  ["What is the APR, not just the interest rate?", "APR includes the processing fee and other charges, so it shows the real yearly cost."],
  ["What is the total amount I will repay?", "Multiply the EMI by the number of months and add any fees."],
  ["Is the rate fixed or floating?", "If floating, ask which benchmark it follows and how often it resets."],
  ["What are the prepayment and foreclosure charges?", "Floating-rate loans to individuals carry none, as per RBI rules."],
  ["Can I see the Key Fact Statement before signing?", "Every regulated lender must give you one."],
  ["Is the lender regulated by RBI?", "Check the bank or NBFC name and the lending app before sharing documents."],
  ["Can I afford the EMI?", "Keep total EMIs within 40–50% of your take-home income."]
];

export default function Home() {
  useDocumentTitle("First Advisors Loans — Personal, Home, Business & Vehicle Loans", true);
  const { openConsult, openLogin } = useApp();
  return (
    <>
      <HomeHero />
      <StatsBand />

      {/* LOANS FOR YOU */}
      <section className="section">
        <div className="container">
          <SectionTitle title={<>Apply for a <em>Loan Online</em></>} subtitle="Loans for every plan and every stage of life" />
          <div className="loan-grid">{loansBySeg("you").map((l, i) => <LoanCard key={l.key} loan={l} index={i} />)}</div>
          <div className="center mt-8"><Link className="btn btn--outline" to="/loans">View all loans</Link></div>
        </div>
      </section>

      {/* LOANS FOR BUSINESS */}
      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Loans for <em>Business</em></>} subtitle="Working capital, term loans, equipment and vehicle finance for MSMEs and corporates" />
          <BusinessLoans />
        </div>
      </section>

      {/* INSTANT OFFER */}
      <section className="section" style={{ paddingBlock: 0 }}>
        <div className="container">
          <div className="offer-band reveal">
            <div className="ob-text">
              <span className="badge badge--glass">Pre-approved offers</span>
              <h2>Check your <em>instant loan offer</em></h2>
              <p>Existing customers of many of our partner lenders have pre-approved personal and business loan offers. Share your details and we'll check them for you.</p>
              <Link className="link-arrow" to="/apply/track" style={{ color: "#fff" }}>Track your application <Icon name="arrow" /></Link>
            </div>
            <ValidatedForm className="ob-form" successTitle="Request received" success="We'll check pre-approved offers across our partners and call you within one working day.">
              <Field id="ob-name" label="Full name" name="name" required autoComplete="name" />
              <Field id="ob-phone" label="Mobile number" phone required autoComplete="tel" />
              <Field id="ob-type" label="Loan type" as="select" options={LOAN_NAMES} />
              <CheckLabel id="ob-consent" required>I agree to be contacted about loan offers.</CheckLabel>
              <SubmitButton className="btn btn--primary btn--block">Get My Offer</SubmitButton>
            </ValidatedForm>
          </div>
        </div>
      </section>

      {/* EMI CALCULATOR */}
      <section className="section">
        <div className="container">
          <SectionTitle title={<>Calculate Your <em>EMI</em></>} subtitle="Pick a loan, move the sliders and see your monthly EMI and total interest" />
          <div className="reveal"><EmiWidget loan={getLoan("personal")} picker /></div>
        </div>
      </section>

      {/* WHY */}
      <section className="section section--soft">
        <div className="container">
          <div className="why">
            <div className="reveal from-left">
              <SectionTitle left style={{ marginBottom: 18 }} title={<>Why Borrow Through <em>First Advisors</em>?</>} subtitle="One advisor, many lenders, no surprises" />
              <p className="muted" style={{ maxWidth: "52ch" }}>Every lender prices risk differently. We know which partner is likely to give your profile the best rate and terms, so you apply once, with the right lender, and avoid unnecessary credit enquiries.</p>
              <div className="flex mt-6"><Link className="btn btn--primary" to="/apply">Apply Now</Link><button type="button" className="btn btn--outline" onClick={openConsult}>Talk to an Advisor</button></div>
            </div>
            <div className="list">
              {WHY.map(([icon, b, s], i) => (
                <div className="feat reveal from-right" key={b} style={{ "--d": i * 0.1 + "s" }}><span className="ic"><Icon name={icon} /></span><div className="t"><b>{b}</b><span>{s}</span></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Get Your Loan in <em>4 Simple Steps</em></>} />
          <div className="steps steps--4">
            {STEPS.map(([icon, b, p], i) => <div className="step reveal" key={b} style={{ "--d": i * 0.1 + "s" }}><Icon name={icon} /><b>{b}</b><p>{p}</p></div>)}
          </div>
        </div>
      </section>

      {/* ASK BEFORE YOU BORROW */}
      <section className="section">
        <div className="container">
          <div className="ask">
            <div className="ask-intro reveal from-left">
              <span className="eyebrow">Sawaal karo</span>
              <h2>Loan lene se pehle <em>sawaal kiya?</em></h2>
              <p>Ask these questions before you sign any loan agreement. A good lender — and a good advisor — will answer every one of them in writing.</p>
              <Link className="btn btn--navy" to="/learn/2">Read: understanding APR &amp; KFS</Link>
            </div>
            <ol className="ask-list">
              {ASK.map(([b, s], i) => <li className="reveal" key={b} style={{ "--d": (i % 4) * 0.06 + "s" }}><b>{b}</b><span>{s}</span></li>)}
            </ol>
          </div>
        </div>
      </section>

      {/* REACH US */}
      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Access Your <em>Loan Information</em></>} subtitle="Track applications, get statements and raise requests the way you prefer" />
          <div className="grid grid-3">
            <InfoCard icon="phone" title="Call us" index={0}><a href={`tel:${C.phoneRaw}`}>{C.phone} (toll free)</a></InfoCard>
            <InfoCard icon="whats" title="WhatsApp" index={1}><a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat with an advisor</a></InfoCard>
            <InfoCard icon="mail" title="Email" index={2}><a href={`mailto:${C.email}`}>{C.email}</a></InfoCard>
            <InfoCard icon="search" title="Track application" index={3}><Link to="/apply/track">Check status with your reference</Link></InfoCard>
            <InfoCard icon="doc" title="Statements & NOC" index={4}><a href="#" onClick={(e) => { e.preventDefault(); openLogin(); }}>Request after login</a></InfoCard>
            <InfoCard icon="pin" title="Visit a branch" index={5}><Link to="/contact#branches">Find a branch near you</Link></InfoCard>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <SectionTitle title={<>What Our <em>Customers Say</em></>} subtitle="Stories from people who borrowed with First Advisors" note="Sample testimonials — replace with verified reviews" />
          <Slider className="reveal" autoplay={6000} label="testimonial">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </Slider>
        </div>
      </section>

      {/* LEARN */}
      <section className="section section--white">
        <div className="container">
          <SectionTitle title={<>Borrow <em>Smarter</em></>} subtitle="Guides on credit scores, interest rates and choosing the right loan" />
          <div className="grid grid-3">{ARTICLES.slice(0, 3).map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}</div>
          <div className="center mt-8"><Link className="btn btn--outline" to="/learn">All guides</Link></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container narrow">
          <SectionTitle title={<>Frequently Asked <em>Questions</em></>} />
          <Accordion items={FAQS.slice(0, 6)} />
          <div className="center mt-8"><Link className="link-arrow" to="/faq">See all FAQs <Icon name="arrow" /></Link></div>
        </div>
      </section>

      {/* ENQUIRY */}
      <section className="section section--white" id="enquire">
        <div className="container narrow">
          <div className="disclaimer reveal"><b>Important</b>First Advisors is not a lender. Loans are sanctioned by our partner banks and NBFCs at their sole discretion. Interest rates and charges shown are indicative and vary by lender and profile; the lender's sanction letter and Key Fact Statement are final. We never ask for any upfront payment to approve a loan.</div>
          <SectionTitle style={{ marginTop: 36 }} title={<>Speak to a <em>Loan Advisor</em></>} subtitle="Tell us what you need and we'll call you with the best options." />
          <div className="form-card reveal zoom">
            <ValidatedForm className="form-grid" successTitle="Thank you" success="A loan advisor will call you within one working day.">
              <Field id="f-name" label="Full Name" name="name" required autoComplete="name" />
              <Field id="f-phone" label="Mobile Number" phone required autoComplete="tel" />
              <Field id="f-email" label="Email Address" type="email" required autoComplete="email" />
              <Field id="f-loan" label="Loan Type" as="select" options={LOAN_NAMES} />
              <Field id="f-amt" label="Loan Amount" as="select" options={["Under ₹5 lakh", "₹5 – ₹25 lakh", "₹25 lakh – ₹1 crore", "Above ₹1 crore"]} />
              <Field id="f-emp" label="Employment" as="select" options={["Salaried", "Self-employed professional", "Business owner", "Company / firm"]} />
              <div className="full submit-row">
                <SubmitButton className="btn btn--primary btn--lg">Submit Enquiry</SubmitButton>
                <span className="muted" style={{ fontSize: 12.5 }}>By submitting you agree to be contacted by First Advisors and its lending partners.</span>
              </div>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </>
  );
}
