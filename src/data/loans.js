/* ==========================================================================
   LOAN PRODUCTS
   First Advisors arranges loans from partner banks and NBFCs (RBI-regulated
   lenders). Rates, amounts and charges are INDICATIVE ranges and must be checked
   against partner lenders' current Key Fact Statements before launch.
   seg: you | business · amounts in ₹ · tenure in months · rate = indicative "from" p.a.
   ========================================================================== */
/* ---------- common building blocks ---------- */
const KYC = "KYC: PAN card and Aadhaar / passport / voter ID / driving licence";
const KYC_CO = "KYC of the business (PAN, GST certificate, Udyam / incorporation certificate) and of promoters / directors";
function charges(o) {
  return [
    ["Interest rate", o.rate],
    ["Processing fee", o.fee],
    ["Prepayment / foreclosure", o.pre || "Nil on floating-rate loans to individuals (RBI). Fixed-rate loans: as per the lender, typically up to 4% of principal outstanding"],
    ["Cheque / mandate bounce", "₹450–₹600 per instance + GST"],
    ["Penal charges on delay", "As per the lender's policy, charged as penal charges (not compounded) in line with RBI guidelines"],
    ["Stamp duty & documentation", "As per state law, at actuals"],
    ["Duplicate statement / NOC", "Soft copy free · physical copy up to ₹500 + GST"]
  ].concat(o.extra || []);
}

export const LOANS = [
  /* ------------------------------ LOANS FOR YOU ------------------------------ */
  {
    key: "personal", seg: "you", name: "Personal Loan", icon: "wallet", art: "personal",
    tagline: "Collateral-free funds for travel, weddings, medical bills or any personal need.",
    rate: 10.5, rateTo: 24, min: 50000, max: 4000000, tMin: 12, tMax: 72, fee: "Up to 3.5% + GST",
    disbursal: "24–72 hours", secured: false, def: { amt: 500000, t: 48 },
    intro: "A personal loan is an unsecured loan you can use for almost any personal purpose. There is no collateral, documentation is light, and you repay in fixed monthly EMIs over one to six years. We compare offers from our partner banks and NBFCs so you see the rate, fees and total cost before you choose.",
    features: [["bolt", "Quick disbursal", "Approval and disbursal within 1–3 working days for complete applications."], ["shield", "No collateral", "No property, gold or guarantor needed for most applicants."], ["calendar", "Flexible tenure", "Choose 12 to 72 months to keep the EMI comfortable."], ["doc", "Minimal paperwork", "KYC, salary slips and bank statements are usually enough."], ["repeat", "Flexi (dropline) option", "Withdraw and repay within a limit; pay interest only on what you use."], ["rupee", "Transparent costs", "Rate, processing fee and APR shown upfront in the Key Fact Statement."]],
    variants: [["Travel Loan", "Holidays in India or abroad, booked when you want.", "globe"], ["Medical Loan", "Treatment and hospital bills not covered by insurance.", "shield"], ["Wedding Loan", "Venue, jewellery and other wedding expenses.", "sparkle"], ["Home Renovation", "Repairs, interiors and upgrades to your home.", "home"], ["Debt Consolidation", "Combine high-cost card dues into one lower EMI.", "layers"], ["Flexi Personal Loan", "A dropline limit with interest only on the amount used.", "repeat"]],
    elig: { "Salaried": [["Age", "21 to 58 years"], ["Monthly income", "₹15,000+ (₹25,000+ in metro cities)"], ["Work experience", "1 year total, 6 months with current employer"], ["Credit score", "700+ preferred"], ["Employer", "Private / public limited company, government or MNC"]],
            "Self-employed": [["Age", "25 to 65 years"], ["Business vintage", "3 years or more"], ["Income proof", "ITR for the last 2 years"], ["Credit score", "700+ preferred"]] },
    docs: { "Salaried": [KYC, "Last 3 months' salary slips", "Last 6 months' salary account statement", "Form 16 or employment certificate", "Passport-size photograph"],
            "Self-employed": [KYC, "ITR with computation of income for 2 years", "Last 12 months' bank statements", "Business proof: GST / Udyam / shop-establishment licence", "Office address proof"] },
    charges: charges({ rate: "10.50% – 24% p.a.", fee: "Up to 3.5% of the loan amount + GST", pre: "Usually allowed after 12 EMIs; nil to 4% of principal outstanding depending on the lender" }),
    faqs: [{ q: "How much personal loan can I get?", a: "Most lenders offer ₹50,000 to ₹40 lakh, based on your income, existing EMIs and credit score. Lenders usually keep total EMIs within 50–60% of your monthly income." },
           { q: "Can I get a personal loan with a low credit score?", a: "It is harder. Some lenders may approve with a co-applicant, a lower amount or a higher rate. Improving your score first usually gets you a better offer." },
           { q: "Is the interest rate fixed?", a: "Most personal loans carry a fixed rate on a reducing balance, so your EMI stays the same for the full tenure." }]
  },
  {
    key: "home", seg: "you", name: "Home Loan", icon: "home", art: "home",
    tagline: "Buy, build or extend your home with long tenures and repo-linked rates.",
    rate: 7.5, rateTo: 11, min: 500000, max: 100000000, tMin: 60, tMax: 360, fee: "0.25% – 1% + GST",
    disbursal: "5–10 working days", secured: true, def: { amt: 5000000, t: 240 },
    intro: "A home loan helps you buy a ready or under-construction home, build on your own plot, or extend and renovate your house. Tenures go up to 30 years, most rates are linked to an external benchmark such as the RBI repo rate, and there is no prepayment charge on floating-rate home loans to individuals.",
    features: [["percent", "Repo-linked rates", "Floating rates that move with the external benchmark, reset at set intervals."], ["calendar", "Up to 30 years", "Long tenures keep the EMI affordable."], ["key", "Up to 90% funding", "Loan-to-value up to 90% for loans up to ₹30 lakh (RBI limits)."], ["repeat", "Balance transfer & top-up", "Move to a lower rate and borrow more on the same property."], ["doc", "Tax benefits", "Deductions on principal and interest under the Income-tax Act, subject to the regime you choose."], ["shield", "Zero prepayment charges", "On floating-rate home loans taken by individuals."]],
    variants: [["Home Purchase", "Ready-to-move or under-construction homes from approved projects.", "home"], ["Home Construction", "Build on land you own, disbursed in stages.", "building"], ["Plot + Construction", "Buy a plot and build on it with one loan.", "pin"], ["Home Extension", "Add a floor or a room to your existing home.", "layers"], ["Balance Transfer", "Shift your home loan to a lower rate and save interest.", "repeat"], ["Top-up Loan", "Extra funds on your existing home loan for any need.", "plus"]],
    elig: { "Salaried": [["Age", "21 to 65 years at loan maturity (some lenders 70)"], ["Monthly income", "₹25,000+"], ["Work experience", "2 years total"], ["Credit score", "725+ preferred"], ["Co-applicant", "Spouse or family member can be added to raise eligibility"]],
            "Self-employed": [["Age", "25 to 70 years at loan maturity"], ["Business vintage", "3 years or more"], ["Income proof", "ITR for the last 2–3 years"], ["Credit score", "725+ preferred"]] },
    docs: { "Salaried": [KYC, "Last 3 months' salary slips and Form 16", "Last 6 months' bank statements", "Property documents: agreement for sale, title chain, approved plan", "Own contribution receipt"],
            "Self-employed": [KYC, "ITR, P&L and balance sheet for 3 years (CA-certified)", "Last 12 months' bank statements", "Business proof", "Property documents: agreement for sale, title chain, approved plan"] },
    charges: charges({ rate: "7.50% – 11% p.a. (floating, repo-linked)", fee: "0.25% – 1% of the loan amount + GST (some lenders cap it)", pre: "Nil on floating-rate home loans to individuals (RBI). Fixed-rate: as per the lender", extra: [["Legal & technical valuation", "At actuals, as per the lender"], ["Conversion fee (switch to lower rate)", "Up to 0.5% of principal outstanding"]] }),
    faqs: [{ q: "How much home loan can I get?", a: "It depends on your income, existing EMIs, age and the property value. Lenders fund up to 90% of the property value for loans up to ₹30 lakh, 80% for ₹30–75 lakh and 75% above ₹75 lakh, as per RBI norms." },
           { q: "Fixed or floating rate?", a: "Most home loans are floating and linked to the repo rate, so your rate falls when rates fall. Fixed rates offer certainty but are usually higher and may carry prepayment charges." },
           { q: "Can I get PMAY benefits?", a: "Eligible first-time buyers may get an interest subsidy under PMAY-Urban 2.0, subject to income limits and scheme rules. We help you check eligibility and apply through a participating lender." }]
  },
  {
    key: "lap", seg: "you", name: "Loan Against Property", icon: "building", art: "property",
    tagline: "Unlock the value of your home or commercial property at home-loan-like rates.",
    rate: 9, rateTo: 14, min: 1000000, max: 100000000, tMin: 12, tMax: 180, fee: "Up to 1% + GST",
    disbursal: "7–12 working days", secured: true, def: { amt: 3000000, t: 120 },
    intro: "A loan against property (LAP) lets you borrow against a residential or commercial property you own while you continue to use it. Because it is secured, rates are lower and amounts higher than unsecured loans. Use it for business expansion, education, a wedding or to consolidate expensive debt.",
    features: [["rupee", "High loan amount", "Up to 60–70% of the property's market value."], ["percent", "Lower rates", "Secured pricing, much cheaper than personal or business loans."], ["calendar", "Up to 15 years", "Long tenure for comfortable EMIs."], ["home", "Keep using your property", "You keep living in or renting out the property."], ["repeat", "Balance transfer & top-up", "Move an existing LAP and take extra funds."], ["building", "Many property types", "Residential, commercial and, with some lenders, industrial property."]],
    variants: [["LAP for Business", "Expansion, machinery or working capital for your business.", "briefcase"], ["Residential LAP", "Borrow against a self-occupied or rented home.", "home"], ["Commercial LAP", "Borrow against an office, shop or warehouse.", "building"], ["LAP Balance Transfer", "Move your LAP to a lower rate.", "repeat"], ["Secured Business Loan", "Business loan backed by property at a lower rate.", "shield"], ["Lease Rental Discounting", "Borrow against rent from a leased commercial property.", "key"]],
    elig: { "Salaried": [["Age", "25 to 70 years at loan maturity"], ["Monthly income", "₹30,000+"], ["Property", "Clear, marketable title in the applicant's name"], ["Credit score", "700+ preferred"]],
            "Self-employed": [["Age", "25 to 70 years at loan maturity"], ["Business vintage", "3 years or more"], ["Income proof", "ITR for 2–3 years"], ["Property", "Clear, marketable title; all owners join as co-applicants"]] },
    docs: { "Salaried": [KYC, "Last 3 months' salary slips", "Last 6 months' bank statements", "Property title documents and chain", "Approved building plan and latest tax receipt"],
            "Self-employed": [KYC, "ITR, P&L and balance sheet for 3 years", "Last 12 months' bank statements", "Property title documents and chain", "Approved building plan and latest tax receipt"] },
    charges: charges({ rate: "9% – 14% p.a.", fee: "Up to 1% of the loan amount + GST", pre: "Nil on floating-rate loans to individuals for non-business use (RBI). Otherwise as per the lender, typically up to 4%", extra: [["Legal & technical valuation", "At actuals, as per the lender"]] }),
    faqs: [{ q: "How much can I borrow against my property?", a: "Usually 50–70% of the property's market value, depending on the property type, your income and the lender." },
           { q: "Can a rented property be used?", a: "Yes. Rented residential and commercial properties are accepted. Rental income can also count towards your eligibility." },
           { q: "What happens to the property papers?", a: "The lender holds the original title documents until the loan is closed, then returns them with a no-dues certificate. RBI rules require release within 30 days of closure." }]
  },
  {
    key: "business", seg: "you", name: "Business Loan", icon: "briefcase", art: "business",
    tagline: "Collateral-free funds for MSMEs, traders, professionals and self-employed owners.",
    rate: 14, rateTo: 26, min: 100000, max: 10000000, tMin: 12, tMax: 60, fee: "Up to 3% + GST",
    disbursal: "3–5 working days", secured: false, def: { amt: 1500000, t: 36 },
    intro: "An unsecured business loan gives MSMEs, self-employed professionals and traders working capital or growth funds without pledging property. Use it for stock, machinery, expansion, marketing or to bridge receivables. We match your profile with lenders whose criteria suit your business.",
    features: [["shield", "No collateral", "Unsecured loans up to ₹1 crore for eligible businesses."], ["bolt", "Fast approval", "Decision in days for complete applications."], ["calendar", "1 to 5 years", "Tenure that matches your cash flow."], ["repeat", "Flexi / dropline limit", "Draw funds as needed and pay interest on usage."], ["doc", "GST-based assessment", "Lenders can assess using GST returns and bank statements."], ["handshake", "For every trade", "Traders, manufacturers, service businesses and professionals."]],
    variants: [["MSME Loan", "For Udyam-registered micro, small and medium enterprises.", "building"], ["Machinery Loan", "Buy or upgrade machinery and tools.", "gear"], ["Small Business Loan", "For shops, traders and growing businesses.", "cart"], ["Loan for Professionals", "Doctors, CAs, architects and consultants.", "user2"], ["Flexi Business Loan", "A dropline limit with interest on usage.", "repeat"], ["Women Entrepreneur Loan", "Offers from lenders with special programmes.", "sparkle"]],
    elig: { "Business owners": [["Age", "25 to 65 years"], ["Business vintage", "3 years or more (2 for some professionals)"], ["Turnover", "As per the lender, typically ₹40 lakh+ a year"], ["Profitability", "Profit in the last 2 years"], ["Credit score", "700+ for promoters"]] },
    docs: { "Business owners": [KYC_CO, "ITR with computation, P&L and balance sheet for 2–3 years", "Last 12 months' bank statements", "GST returns for 12 months", "Business address proof"] },
    charges: charges({ rate: "14% – 26% p.a.", fee: "Up to 3% of the loan amount + GST", pre: "As per the lender: typically allowed after 6–12 EMIs, up to 4% of principal outstanding" }),
    faqs: [{ q: "Do I need collateral for a business loan?", a: "No, unsecured business loans need no collateral. For larger amounts or lower rates, a secured business loan against property may suit you better." },
           { q: "Can a new business get a loan?", a: "Most lenders need at least 2–3 years of operations. Newer businesses may qualify for government-backed schemes or secured options." },
           { q: "Is a GST registration required?", a: "Most lenders prefer GST-registered businesses, and GST returns help prove turnover. Some lenders accept businesses below the GST threshold with other proof." }]
  },
  {
    key: "used-car", seg: "you", name: "Used Car Loan", icon: "car", art: "car",
    tagline: "Finance a pre-owned car with up to 90% of its value.",
    rate: 11.5, rateTo: 18, min: 100000, max: 5000000, tMin: 12, tMax: 84, fee: "Up to 2% + GST",
    disbursal: "48–72 hours", secured: true, def: { amt: 500000, t: 60 },
    intro: "A used car loan funds a pre-owned car bought from a dealer or an individual seller. The car is hypothecated to the lender until the loan is repaid. You can also refinance a car you already own to raise funds.",
    features: [["car", "Up to 90% funding", "Of the car's valuation, based on make, model and age."], ["calendar", "Up to 7 years", "Tenure depends on the car's age at loan maturity."], ["bolt", "Quick valuation", "Lender-approved valuation and fast processing."], ["repeat", "Refinance & top-up", "Raise funds on a car you already own."], ["user2", "Buy from anyone", "From dealers, certified pre-owned outlets or individual sellers."], ["doc", "Easy RC transfer help", "Guidance on RC transfer and hypothecation."]],
    variants: [["Pre-owned Car Purchase", "Buy from a dealer or individual seller.", "car"], ["Car Refinance", "Raise funds against a car you already own.", "rupee"], ["Balance Transfer & Top-up", "Move an existing car loan and borrow more.", "repeat"]],
    elig: { "Salaried": [["Age", "21 to 65 years"], ["Monthly income", "₹20,000+"], ["Work experience", "1 year or more"], ["Car age", "Usually up to 10–12 years at loan maturity"]],
            "Self-employed": [["Age", "25 to 65 years"], ["Business vintage", "2 years or more"], ["Income", "ITR showing ₹2.5 lakh+ a year"], ["Car age", "Usually up to 10–12 years at loan maturity"]] },
    docs: { "Salaried": [KYC, "Last 3 months' salary slips", "Last 6 months' bank statements", "Car RC, insurance and valuation report"],
            "Self-employed": [KYC, "ITR for 2 years", "Last 6–12 months' bank statements", "Car RC, insurance and valuation report"] },
    charges: charges({ rate: "11.50% – 18% p.a.", fee: "Up to 2% of the loan amount + GST", extra: [["Valuation charges", "At actuals"], ["RC transfer / hypothecation", "As per RTO, at actuals"]] }),
    faqs: [{ q: "How old can the car be?", a: "Most lenders finance cars up to 8–10 years old, as long as the car is not older than 10–12 years when the loan ends." },
           { q: "Can I buy from an individual seller?", a: "Yes. The lender values the car and pays the seller once documents and RC transfer formalities are complete." }]
  },
  {
    key: "new-car", seg: "you", name: "New Car Loan", icon: "car", art: "car",
    tagline: "Drive home a new car or EV with up to 100% ex-showroom funding on select models.",
    rate: 8.75, rateTo: 14, min: 100000, max: 10000000, tMin: 12, tMax: 84, fee: "Up to 1% + GST",
    disbursal: "24–48 hours", secured: true, def: { amt: 800000, t: 60 },
    intro: "A new car loan funds a new petrol, diesel, CNG or electric car from an authorised dealer. Lenders fund up to 90% of the on-road price, and up to 100% of the ex-showroom price on select models for eligible buyers.",
    features: [["car", "Up to 100% funding", "Of the ex-showroom price on select models."], ["percent", "Competitive rates", "Compare offers from banks, NBFCs and dealer tie-ups."], ["calendar", "Up to 7 years", "Lower EMIs with longer tenures."], ["leaf", "EV loans", "Special offers from some lenders on electric cars."], ["bolt", "Same-day approval", "For complete applications at partner dealers."], ["doc", "Minimal documents", "KYC, income proof and the dealer quotation."]],
    variants: [["New Car Loan", "Petrol, diesel and CNG cars from authorised dealers.", "car"], ["Electric Car Loan", "EV-specific offers and longer tenures.", "leaf"], ["Car Loan Balance Transfer", "Move your car loan to a lower rate.", "repeat"]],
    elig: { "Salaried": [["Age", "21 to 65 years"], ["Annual income", "₹3 lakh+"], ["Work experience", "1 year or more"], ["Credit score", "700+ preferred"]],
            "Self-employed": [["Age", "25 to 65 years"], ["Business vintage", "2 years or more"], ["Annual income", "₹3 lakh+ as per ITR"], ["Credit score", "700+ preferred"]] },
    docs: { "Salaried": [KYC, "Last 3 months' salary slips", "Last 6 months' bank statements", "Dealer proforma invoice / quotation"],
            "Self-employed": [KYC, "ITR for 2 years", "Last 6–12 months' bank statements", "Dealer proforma invoice / quotation"] },
    charges: charges({ rate: "8.75% – 14% p.a.", fee: "Up to 1% of the loan amount + GST" }),
    faqs: [{ q: "Can I get 100% funding on a new car?", a: "Some lenders fund up to 100% of the ex-showroom price on select models for eligible customers. Insurance, registration and accessories are usually paid by you." },
           { q: "Are EV loans cheaper?", a: "Several lenders offer lower rates or longer tenures on electric cars. We compare current EV offers for you." }]
  },
  {
    key: "two-wheeler", seg: "you", name: "Two Wheeler Loan", icon: "bike", art: "bike",
    tagline: "Bikes, scooters and EVs with low down payment and quick approval.",
    rate: 10.5, rateTo: 22, min: 20000, max: 1500000, tMin: 12, tMax: 48, fee: "Up to 3% + GST",
    disbursal: "Same day – 24 hours", secured: true, def: { amt: 100000, t: 36 },
    intro: "A two wheeler loan funds a new motorcycle, scooter or electric two-wheeler, including premium bikes. Down payment can be as low as 5–10% of the on-road price, and approvals at partner dealers are often same-day.",
    features: [["bike", "Up to 95% funding", "Of the on-road price for eligible buyers."], ["bolt", "Same-day approval", "At partner dealers for complete applications."], ["calendar", "1 to 4 years", "Pick an EMI that suits your budget."], ["leaf", "Electric two-wheelers", "Finance for EV scooters and bikes."], ["award", "Premium bikes", "Higher amounts for superbikes and premium models."], ["doc", "Light documentation", "KYC and basic income proof."]],
    variants: [["Commuter Bike & Scooter", "Everyday bikes and scooters.", "bike"], ["Premium & Superbike", "Higher-value bikes with longer tenure.", "award"], ["Electric Two-Wheeler", "EV scooters and bikes.", "leaf"]],
    elig: { "Salaried": [["Age", "21 to 65 years"], ["Monthly income", "₹10,000+"], ["Residence", "Stable address for at least 1 year"]],
            "Self-employed": [["Age", "21 to 65 years"], ["Income", "Regular income with bank statements or ITR"], ["Residence", "Stable address for at least 1 year"]] },
    docs: { "Salaried": [KYC, "Latest salary slip or bank statement", "Address proof", "Dealer quotation"],
            "Self-employed": [KYC, "Latest ITR or 6 months' bank statements", "Address proof", "Dealer quotation"] },
    charges: charges({ rate: "10.50% – 22% p.a.", fee: "Up to 3% of the loan amount + GST" }),
    faqs: [{ q: "What is the minimum down payment?", a: "Usually 5–15% of the on-road price, depending on your profile, the model and the lender." },
           { q: "Can students get a two wheeler loan?", a: "Students without income usually apply with a parent or guardian as co-applicant." }]
  },
  {
    key: "las", seg: "you", name: "Loan Against Securities", icon: "chart", art: "securities",
    tagline: "Borrow against shares, mutual funds and bonds without selling them.",
    rate: 9.5, rateTo: 14, min: 50000, max: 200000000, tMin: 12, tMax: 36, fee: "Up to 1% + GST",
    disbursal: "Same day – 48 hours", secured: true, def: { amt: 1000000, t: 12 },
    intro: "A loan against securities (LAS) gives you an overdraft or term loan against shares, mutual fund units or bonds that you pledge. Your investments stay invested and keep earning, and you pay interest only on the amount you use. It suits short-term needs when you do not want to sell.",
    features: [["chart", "Stay invested", "Keep dividends and growth on pledged holdings."], ["percent", "Interest on usage", "Overdraft: pay interest only on the amount drawn."], ["bolt", "Digital pledge", "Online pledge of demat shares and mutual fund units."], ["layers", "Wide range accepted", "Approved shares, equity and debt funds, bonds."], ["repeat", "Renewable limit", "Usually a 12-month limit, renewable."], ["shield", "No prepayment charge", "Repay any time from the overdraft."]],
    variants: [["Loan Against Shares", "Pledge approved listed shares from your demat account.", "trend"], ["Loan Against Mutual Funds", "Pledge equity or debt fund units online.", "pie"], ["Loan Against Bonds", "Pledge approved bonds and debentures.", "doc"]],
    elig: { "Individuals": [["Age", "18 years and above"], ["Holdings", "Securities on the lender's approved list, in your name"], ["Demat / folio", "Demat account or mutual fund folio in the borrower's name"]],
            "Entities": [["Eligible", "HUFs, firms, companies and trusts (as per lender)"], ["Holdings", "Securities on the lender's approved list"], ["Board resolution", "Required for companies"]] },
    docs: { "Individuals": [KYC, "Demat holding statement / CAS for mutual funds", "Bank account details and cancelled cheque"],
            "Entities": [KYC_CO, "Board resolution / partnership authority", "Demat holding statement / CAS", "Bank account details"] },
    charges: charges({ rate: "9.50% – 14% p.a. on the amount used", fee: "Up to 1% of the sanctioned limit + GST", pre: "Nil — repay the overdraft any time", extra: [["Pledge / invocation charges", "As per depository and lender"], ["Annual renewal", "As per the lender"]] }),
    faqs: [{ q: "How much can I borrow against my investments?", a: "Typically up to 50% of the value of approved shares and equity funds, and up to 75–80% for debt funds and bonds, as per lender and regulatory norms." },
           { q: "What happens if the market falls?", a: "If the value of pledged securities falls below the required margin, the lender asks you to add securities or repay part of the loan. If you don't, the lender may sell pledged securities." }]
  },
  {
    key: "education", seg: "you", name: "Education Loan", icon: "cap", art: "education",
    tagline: "Study in India or abroad with funding for fees, living costs and travel.",
    rate: 9.25, rateTo: 14, min: 100000, max: 15000000, tMin: 60, tMax: 180, fee: "Up to 1% + GST",
    disbursal: "7–15 working days", secured: false, def: { amt: 2500000, t: 120 },
    intro: "An education loan pays for tuition, hostel, travel, books and equipment for higher studies in India or abroad. Repayment starts after a moratorium (course period plus 6–12 months), and the interest you pay may qualify for a tax deduction.",
    features: [["cap", "India & abroad", "Undergraduate, postgraduate and professional courses."], ["rupee", "Covers total cost", "Tuition, living, travel, insurance and equipment."], ["clock", "Moratorium", "Start EMIs after the course plus 6–12 months."], ["shield", "Collateral-free options", "Unsecured loans for top institutions, up to lender limits."], ["doc", "Pre-admission sanction", "Sanction letter to support your visa application."], ["percent", "Tax benefit on interest", "Deduction on interest paid, as per the Income-tax Act."]],
    variants: [["Study Abroad", "Funding for universities in the US, UK, Canada, Europe, Australia and more.", "globe"], ["Study in India", "IITs, IIMs, medical, engineering and other courses.", "cap"], ["Skill & Executive Programmes", "Short-term and working-professional courses.", "award"]],
    elig: { "Student": [["Admission", "Confirmed admission to a recognised course"], ["Age", "18 years and above (or with a guardian)"], ["Co-applicant", "Parent / guardian / spouse with stable income"], ["Academics", "Good academic record and entrance scores"]] },
    docs: { "Student": ["KYC of student and co-applicant", "Admission letter and fee structure", "Mark sheets and entrance test scores", "Co-applicant's income proof and bank statements", "Collateral documents (for secured loans)"] },
    charges: charges({ rate: "9.25% – 14% p.a.", fee: "Up to 1% of the loan amount + GST", pre: "Nil on floating-rate loans to individuals (RBI)" }),
    faqs: [{ q: "When do I start repaying?", a: "Most lenders allow a moratorium for the course period plus 6–12 months. Paying simple interest during the course reduces your final EMI." },
           { q: "Is collateral required?", a: "Many lenders offer collateral-free loans for reputed institutions up to a limit. Higher amounts usually need property or fixed deposits as security." }]
  },

  /* ---------------------------- LOANS FOR BUSINESS ---------------------------- */
  {
    key: "working-capital", seg: "business", name: "Working Capital Loan", icon: "repeat", art: "business",
    tagline: "Channel finance, invoice discounting and demand loans to keep cash flowing.",
    rate: 9.5, rateTo: 15, min: 1000000, max: 500000000, tMin: 1, tMax: 12, fee: "0.5% – 1.5% + GST",
    disbursal: "10–20 working days (limit set-up)", secured: false, def: { amt: 5000000, t: 12 },
    intro: "Working capital finance funds the gap between paying suppliers and collecting from customers. Lenders set up a revolving limit for your business, so you draw funds against invoices, purchase orders or dealer orders and repay as you collect.",
    features: [["repeat", "Revolving limits", "Draw and repay repeatedly within the sanctioned limit."], ["doc", "Invoice discounting", "Get paid early on invoices raised to reputed buyers."], ["handshake", "Channel financing", "Funding for dealers and distributors of large brands."], ["cart", "Purchase order funding", "Finance raw material against confirmed orders."], ["percent", "Pay for usage", "Interest only on the amount drawn, for the days used."], ["layers", "Structured to your cycle", "Tenor matched to your operating cycle (30–180 days)."]],
    variants: [["Channel Financing", "Dealer and distributor finance backed by the brand.", "handshake"], ["Invoice Discounting", "Early payment against approved invoices.", "doc"], ["Purchase Order Funding", "Funds to fulfil confirmed purchase orders.", "cart"], ["Working Capital Demand Loan", "Short-term loan for operating needs.", "rupee"], ["Sub-dealer Finance", "Funding for retailers in a brand's network.", "user2"], ["Cash Credit / Overdraft", "Running limits from partner banks.", "bank"]],
    elig: { "Businesses": [["Constitution", "Proprietorship, partnership, LLP or company"], ["Business vintage", "3 years or more"], ["Turnover", "Typically ₹5 crore+ a year"], ["Financials", "Profitable, with audited statements"], ["Credit", "Clean repayment track record for business and promoters"]] },
    docs: { "Businesses": [KYC_CO, "Audited financials for 3 years and provisional for the current year", "GST returns and 12 months' bank statements", "Debtor and creditor ageing", "Stock statement and existing loan sanction letters"] },
    charges: charges({ rate: "9.50% – 15% p.a.", fee: "0.5% – 1.5% of the limit + GST", pre: "As per the sanction terms", extra: [["Annual renewal", "As per the lender"]] }),
    faqs: [{ q: "How is the working capital limit decided?", a: "Lenders look at turnover, operating cycle, receivables, inventory and existing limits. A common method sets the limit at a share of projected turnover." },
           { q: "Is collateral needed?", a: "Many programmes such as channel financing and invoice discounting are unsecured or backed by the anchor company. Larger limits may need collateral or a guarantee." }]
  },
  {
    key: "term-loan", seg: "business", name: "Business Term Loan", icon: "trend", art: "growth",
    tagline: "Medium to long-term funding for expansion, capex and acquisitions.",
    rate: 10.5, rateTo: 16, min: 2500000, max: 250000000, tMin: 12, tMax: 84, fee: "0.5% – 2% + GST",
    disbursal: "15–30 working days", secured: true, def: { amt: 10000000, t: 60 },
    intro: "A term loan funds long-term business needs such as a new plant, a branch expansion, technology upgrades or an acquisition. It is repaid in instalments over one to seven years, often with a moratorium while the project starts generating cash.",
    features: [["trend", "Growth capital", "Fund capex, expansion and acquisitions."], ["calendar", "1 to 7 years", "Repayment matched to project cash flows."], ["clock", "Moratorium options", "Principal holiday while the project ramps up."], ["shield", "Secured or unsecured", "Based on business strength and amount."], ["handshake", "Debt syndication", "Larger requirements arranged across lenders."], ["doc", "Structured repayment", "Ballooning or step-up schedules where suitable."]],
    variants: [["Capex Loan", "New machinery, plant or facility.", "gear"], ["Expansion Loan", "New branches, capacity or markets.", "trend"], ["Acquisition Finance", "Buying a business or assets.", "handshake"], ["Debt Syndication", "Larger loans arranged across lenders.", "layers"]],
    elig: { "Businesses": [["Constitution", "Partnership, LLP or company"], ["Business vintage", "3 years or more"], ["Financials", "Profitable for 2 of the last 3 years"], ["Project", "Clear project report and cash-flow projections"]] },
    docs: { "Businesses": [KYC_CO, "Audited financials for 3 years", "Project report and projections", "GST returns and 12 months' bank statements", "Collateral documents (if secured)"] },
    charges: charges({ rate: "10.50% – 16% p.a.", fee: "0.5% – 2% of the loan amount + GST", pre: "As per the sanction terms" }),
    faqs: [{ q: "Term loan or working capital?", a: "Use a term loan for long-lived assets and expansion, and working capital for day-to-day operations such as stock and receivables." }]
  },
  {
    key: "equipment", seg: "business", name: "Equipment Finance & Leasing", icon: "gear", art: "equipment",
    tagline: "Buy or lease machinery, medical, IT and office equipment.",
    rate: 10, rateTo: 16, min: 500000, max: 200000000, tMin: 12, tMax: 60, fee: "Up to 1.5% + GST",
    disbursal: "5–10 working days", secured: true, def: { amt: 2500000, t: 48 },
    intro: "Equipment finance lets you buy machinery or equipment and repay from the income it earns, with the equipment itself as security. With leasing, you use the equipment for a fixed rent and can upgrade at the end of the lease, which keeps capital free and can be tax-efficient.",
    features: [["gear", "Up to 100% funding", "On select equipment, including taxes and installation."], ["calendar", "1 to 5 years", "Tenure matched to the equipment's useful life."], ["shield", "Equipment as security", "Often no additional collateral."], ["repeat", "Upgrade with leasing", "Return and upgrade at lease end."], ["doc", "Operating & finance lease", "Choose ownership or usage."], ["building", "For every sector", "Manufacturing, healthcare, IT, logistics and more."]],
    variants: [["Equipment Finance", "Own the equipment, repay in EMIs.", "gear"], ["Equipment Leasing", "Use for a fixed rent, upgrade at lease end.", "repeat"], ["Medical Equipment", "Diagnostic and hospital equipment for healthcare providers.", "shield"], ["IT & Office Equipment", "Laptops, servers and office set-ups.", "grid"]],
    elig: { "Businesses": [["Constitution", "Proprietorship, partnership, LLP or company"], ["Business vintage", "2–3 years or more"], ["Financials", "Stable cash flows to service the EMI or lease rental"]] },
    docs: { "Businesses": [KYC_CO, "Financials for 2–3 years", "12 months' bank statements", "Equipment quotation / proforma invoice"] },
    charges: charges({ rate: "10% – 16% p.a.", fee: "Up to 1.5% + GST", pre: "As per the sanction terms" }),
    faqs: [{ q: "Should I buy or lease equipment?", a: "Buy if you will use the equipment for most of its life. Lease if it becomes outdated fast, you want to keep capital free, or you prefer predictable rentals." }]
  },
  {
    key: "construction-equipment", seg: "business", name: "Construction Equipment Finance", icon: "truck", art: "equipment",
    tagline: "New and used excavators, loaders, cranes and road equipment.",
    rate: 10.5, rateTo: 17, min: 1000000, max: 100000000, tMin: 12, tMax: 60, fee: "Up to 2% + GST",
    disbursal: "3–7 working days", secured: true, def: { amt: 4000000, t: 48 },
    intro: "Construction equipment finance helps contractors and fleet owners buy new or used earth-moving, road-building and material-handling equipment. Repayment can be planned around project billing cycles.",
    features: [["truck", "New & used equipment", "Excavators, backhoe loaders, cranes, pavers and more."], ["rupee", "Up to 90% funding", "Of the equipment value."], ["calendar", "Seasonal repayment", "Structured around project cash flows."], ["repeat", "Refinance", "Raise funds against owned equipment."], ["users", "First-time users", "Programmes for first-time buyers with contracts."], ["bolt", "Quick approval", "For repeat and fleet customers."]],
    variants: [["New Equipment", "From authorised manufacturers and dealers.", "truck"], ["Used Equipment", "Valued by the lender's approved valuers.", "search"], ["Refinance", "Funds against equipment you own.", "rupee"]],
    elig: { "Contractors & fleet owners": [["Experience", "2 years or more in construction or mining"], ["Contracts", "Work orders or project pipeline"], ["Credit", "Clean repayment track record"]] },
    docs: { "Contractors & fleet owners": [KYC_CO, "Work orders / contracts", "Financials or ITR for 2 years", "12 months' bank statements", "Equipment quotation / valuation report"] },
    charges: charges({ rate: "10.50% – 17% p.a.", fee: "Up to 2% + GST", pre: "As per the sanction terms (business-purpose loans)" }),
    faqs: [{ q: "Can first-time buyers get finance?", a: "Yes, many lenders fund first-time buyers who have confirmed contracts or a guarantor with experience." }]
  },
  {
    key: "commercial-vehicle", seg: "business", name: "Commercial Vehicle Loan", icon: "truck", art: "truck",
    tagline: "Trucks, tippers, buses and light commercial vehicles — new and used.",
    rate: 11, rateTo: 18, min: 300000, max: 50000000, tMin: 12, tMax: 72, fee: "Up to 2% + GST",
    disbursal: "2–5 working days", secured: true, def: { amt: 2500000, t: 60 },
    intro: "Commercial vehicle loans finance new and used trucks, tippers, buses, pickups and light commercial vehicles for transporters, fleet owners and first-time buyers. Leasing options are also available for corporate fleets.",
    features: [["truck", "New & used vehicles", "Trucks, tippers, buses, LCVs and pickups."], ["rupee", "Up to 90–100% funding", "Of the chassis value on select models."], ["calendar", "Up to 6 years", "Repayment aligned with vehicle earnings."], ["users", "First-time buyers", "Programmes for new transporters."], ["repeat", "Refinance & top-up", "Raise funds on your existing fleet."], ["doc", "Fleet leasing", "Lease vehicles for corporate logistics."]],
    variants: [["New Commercial Vehicle", "From authorised dealers.", "truck"], ["Used Commercial Vehicle", "Valued by approved valuers.", "search"], ["Commercial Vehicle Leasing", "Fleet leasing for businesses.", "repeat"]],
    elig: { "Transporters & businesses": [["Age", "21 to 65 years (individuals)"], ["Experience", "Driving or transport business experience preferred"], ["Income", "Freight contracts or business income"], ["Credit", "Clean repayment track record"]] },
    docs: { "Transporters & businesses": [KYC + " / business KYC", "Bank statements for 6–12 months", "Existing fleet RCs (if any)", "Vehicle quotation or valuation report", "Driving licence (for owner-drivers)"] },
    charges: charges({ rate: "11% – 18% p.a.", fee: "Up to 2% + GST", pre: "As per the sanction terms (business-purpose loans)" }),
    faqs: [{ q: "Can a first-time buyer get a truck loan?", a: "Yes, lenders have first-time buyer programmes. You may need a higher down payment, a guarantor or a freight contract." }]
  },
  {
    key: "lrd", seg: "business", name: "Lease Rental Discounting", icon: "key", art: "property",
    tagline: "Borrow against future rent from your leased commercial property.",
    rate: 8.75, rateTo: 12, min: 10000000, max: 1000000000, tMin: 12, tMax: 180, fee: "0.25% – 1% + GST",
    disbursal: "15–30 working days", secured: true, def: { amt: 50000000, t: 120 },
    intro: "Lease rental discounting (LRD) gives property owners a loan against the rent receivable from reputed tenants. The rent is paid directly into an escrow account and services the EMI, so you unlock the property's value without selling it.",
    features: [["key", "Up to 90% of rentals", "Of the discounted future rent receivables."], ["percent", "Attractive rates", "Priced off the tenant's strength and lease terms."], ["calendar", "Up to 15 years", "Tenure linked to the remaining lease period."], ["building", "Offices, retail, warehouses", "Commercial properties leased to quality tenants."], ["repeat", "Balance transfer & top-up", "Move an existing LRD and borrow more."], ["shield", "Escrowed repayment", "Rent flows directly to repay the loan."]],
    variants: [["Office Spaces", "Leased to corporates and MNCs.", "building"], ["Retail & Malls", "Shops and showrooms leased to brands.", "cart"], ["Warehouses", "Logistics and industrial sheds.", "layers"]],
    elig: { "Property owners": [["Owner", "Individuals, firms or companies owning the property"], ["Tenant", "Reputed tenant with a registered lease"], ["Lease", "Sufficient remaining lock-in and lease term"]] },
    docs: { "Property owners": [KYC_CO, "Registered lease agreements", "Rent receipts / bank credits for 12 months", "Property title documents", "Tenant details and occupancy certificate"] },
    charges: charges({ rate: "8.75% – 12% p.a.", fee: "0.25% – 1% + GST", pre: "As per the sanction terms" }),
    faqs: [{ q: "How much can I get under LRD?", a: "Usually up to 75–90% of the discounted value of rent receivable for the remaining lease term, subject to the property's market value." }]
  }
];

/* ---------- product groups for menus and the home page ---------- */
export const BUSINESS_GROUPS = [
  { key: "wc", name: "Working Capital", icon: "repeat", text: "Revolving limits that fund stock, receivables and supplier payments, structured to your operating cycle.", items: [["Channel Financing", "working-capital"], ["Invoice Discounting", "working-capital"], ["Purchase Order Funding", "working-capital"], ["Working Capital Demand Loan", "working-capital"], ["Sub-dealer Finance", "working-capital"], ["Cash Credit / Overdraft", "working-capital"]] },
  { key: "growth", name: "Term & Equipment", icon: "gear", text: "Long-term funds for capex, expansion, machinery and equipment — bought or leased.", items: [["Business Term Loan", "term-loan"], ["Equipment Finance", "equipment"], ["Equipment Leasing", "equipment"], ["Unsecured Business Loan", "business"], ["Machinery Loan", "business"], ["Debt Syndication", "term-loan"]] },
  { key: "vehicles", name: "Vehicles & Construction", icon: "truck", text: "New and used commercial vehicles, construction equipment and fleet leasing.", items: [["New Commercial Vehicle", "commercial-vehicle"], ["Used Commercial Vehicle", "commercial-vehicle"], ["Commercial Vehicle Leasing", "commercial-vehicle"], ["Construction Equipment", "construction-equipment"], ["Used Construction Equipment", "construction-equipment"], ["Equipment Refinance", "construction-equipment"]] },
  { key: "property", name: "Property-backed", icon: "building", text: "Lower-cost funding against commercial property and its rental income.", items: [["Lease Rental Discounting", "lrd"], ["Loan Against Property", "lap"], ["Secured Business Loan", "lap"], ["LAP Balance Transfer", "lap"]] }
];
