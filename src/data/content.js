/* Editorial content: credit score bands, testimonials (samples), guides, glossary and FAQs. */
import { CONFIG } from "./config";

/* ---------- credit score bands (300–900) ---------- */
export const SCORE_BANDS = [
  { from: 300, to: 549, label: "Poor", color: "#C62828", text: "Approval is difficult. Clear overdue amounts and rebuild with on-time payments." },
  { from: 550, to: 649, label: "Fair", color: "#E8612C", text: "Some lenders may approve at higher rates or lower amounts." },
  { from: 650, to: 749, label: "Good", color: "#F2C12E", text: "Most lenders will consider you. A score above 750 gets better pricing." },
  { from: 750, to: 900, label: "Excellent", color: "#2E9E5B", text: "Best rates, higher amounts and faster approvals." }
];

/* ---------- testimonials (SAMPLE — replace with verified reviews) ---------- */
export const TESTIMONIALS = [
  { name: "Rahul Deshmukh", role: "Home Loan", city: "Pune", rating: 5, title: "Saved on our home loan rate", text: "The advisor compared four lenders and moved our home loan to a lower rate. The balance transfer and top-up happened together, with no running around." },
  { name: "Sneha Iyer", role: "Personal Loan", city: "Mumbai", rating: 5, title: "Clear about every charge", text: "I got the rate, processing fee and total interest in writing before applying. The money reached my account in two days." },
  { name: "Imran Shaikh", role: "Business Loan", city: "Nashik", rating: 4, title: "Working capital that fits our cycle", text: "They understood our 90-day receivable cycle and set up invoice discounting with a lender who knew our industry." },
  { name: "Priya & Ankit Mehta", role: "Education Loan", city: "Ahmedabad", rating: 5, title: "Sanction letter in time for the visa", text: "Our daughter's study-abroad loan was sanctioned before her visa interview. The team handled the paperwork end to end." },
  { name: "Sandeep Kulkarni", role: "Commercial Vehicle Loan", city: "Kolhapur", rating: 4, title: "Two trucks financed in a week", text: "As a growing transporter I needed quick funding for two tippers. The advisor arranged it with a sensible repayment schedule." },
  { name: "Dr. Kavita Rao", role: "Equipment Finance", city: "Bengaluru", rating: 5, title: "Leased our diagnostic machines", text: "Leasing kept our capital free for the clinic expansion. The comparison of buying versus leasing was very useful." }
];

/* ---------- articles ---------- */
export const ARTICLE_CATS = ["All", "Credit Score", "Home Loans", "Personal Loans", "Business Loans", "Borrowing Basics"];
export const ARTICLES = [
  { id: 1, cat: "Credit Score", art: "gauge", read: 6, date: "2026-10-28", title: "How to improve your credit score before applying for a loan",
    excerpt: "Six practical steps that lift your score in three to six months, and the mistakes that pull it down.",
    body: [["Why your score matters", "Lenders use your credit score to decide whether to lend and at what rate. A score above 750 usually gets the best pricing, while a score below 650 can lead to rejection or a much higher rate."],
           ["Pay every EMI and card bill on time", "Payment history has the largest effect on your score. Set up auto-debit for every EMI and at least the total due on credit cards. Even one payment that is 30 days late shows on your report for years."],
           ["Keep card utilisation below 30%", "Using most of your credit card limit signals stress. Pay down balances before the statement date, or ask for a higher limit without spending more."],
           ["Don't apply with many lenders at once", "Each loan or card application creates a hard enquiry. Several enquiries in a short period lower your score. Compare offers through one advisor instead of applying everywhere."],
           ["Check your report for errors", "Download your credit report and look for loans you never took, closed loans shown as active, or wrong late payments. Raise a dispute with the credit bureau; it must be resolved within 30 days."],
           ["Keep old accounts open", "A longer credit history helps. Avoid closing your oldest credit card unless it has a high annual fee."]] },
  { id: 2, cat: "Borrowing Basics", art: "doc", read: 5, date: "2026-10-20", title: "APR and the Key Fact Statement: the true cost of your loan",
    excerpt: "Why the interest rate alone is not the full story, and how to read the KFS every lender must give you.",
    body: [["Interest rate vs APR", "The interest rate is only part of what you pay. The Annual Percentage Rate (APR) adds processing fees and other charges, so it shows the real annual cost of the loan."],
           ["What is a Key Fact Statement?", "RBI requires regulated lenders to give retail and MSME borrowers a Key Fact Statement (KFS) before signing. It lists the loan amount, rate, APR, all fees, the repayment schedule, and the grievance redressal contacts."],
           ["Compare APRs, not just rates", "A loan at 10.5% with a 3% fee can cost more than one at 11% with no fee, especially for short tenures. Ask for the KFS from each lender and compare the APR and total amount payable."],
           ["Charges not in the KFS can't be levied", "Lenders cannot charge fees that are not mentioned in the KFS without your explicit consent. Keep a copy of the KFS with your loan papers."]] },
  { id: 3, cat: "Home Loans", art: "home", read: 7, date: "2026-10-12", title: "Home loan balance transfer: when does it make sense?",
    excerpt: "A simple check to see whether moving your home loan to a lower rate will actually save you money.",
    body: [["How a balance transfer works", "A new lender pays off your existing home loan, and you continue paying EMIs to the new lender at its rate. You can often take a top-up loan at the same time."],
           ["The quick rule", "A transfer usually makes sense if the rate difference is 0.5% or more and you have more than half the tenure left. Early in the loan most of your EMI is interest, so a lower rate saves more."],
           ["Count the costs", "Include processing fees, legal and valuation charges, and stamp duty on the new mortgage. Compare these with the interest you will save over the remaining tenure."],
           ["Ask your current lender first", "Many lenders will lower your rate for a conversion fee if you ask. Compare that offer with a transfer before deciding."],
           ["Use the calculator", "Our balance transfer calculator shows the monthly and total savings after fees for your outstanding amount and tenure."]] },
  { id: 4, cat: "Home Loans", art: "doc", read: 5, date: "2026-09-30", title: "Home loan documents checklist for salaried and self-employed buyers",
    excerpt: "Everything to keep ready, from KYC and income proof to property papers, to avoid delays.",
    body: [["KYC", "PAN card and one address proof such as Aadhaar, passport or voter ID for every applicant and co-applicant."],
           ["Income proof", "Salaried: last three salary slips, Form 16 and six months' bank statements. Self-employed: two to three years of ITR, CA-certified financials and twelve months' bank statements."],
           ["Property papers", "Agreement for sale, title chain documents, approved building plan, builder's allotment letter and, for resale homes, the previous owner's papers."],
           ["Own contribution", "Receipts for the down payment you have already paid to the builder or seller."],
           ["Tips", "Keep names spelt the same across documents, and check that the property is approved by the lender before paying a large booking amount."]] },
  { id: 5, cat: "Personal Loans", art: "personal", read: 5, date: "2026-09-18", title: "Personal loan, credit card or overdraft: which one should you use?",
    excerpt: "Compare cost, flexibility and impact on your credit score for short-term needs.",
    body: [["Personal loan", "Best for a fixed, planned expense you will repay over one to five years. Rates are lower than credit cards and the EMI is fixed."],
           ["Credit card", "Useful for short-term spending you can repay in full within the interest-free period. Rolling over dues costs 36–45% a year, so avoid carrying balances."],
           ["Overdraft / flexi loan", "Good when you need money in stages or are unsure how much you'll use. You pay interest only on the amount drawn."],
           ["Our take", "If you already have expensive card dues, a personal loan to consolidate them can cut your interest sharply. Close the card dues the same day the loan is disbursed."]] },
  { id: 6, cat: "Borrowing Basics", art: "calc", read: 6, date: "2026-09-05", title: "Should you prepay your loan or invest the surplus?",
    excerpt: "How to decide between closing debt early and investing, with a simple comparison.",
    body: [["Start with the rate", "Prepaying a loan gives you a guaranteed 'return' equal to the loan's interest rate. Prepaying a 13% personal loan is usually better than an investment with uncertain returns."],
           ["Home loans are different", "Home loan rates are lower and may carry tax benefits, so investing the surplus for the long term can make sense if you are comfortable with market risk."],
           ["Keep an emergency fund first", "Don't use your emergency savings to prepay. Keep three to six months of expenses aside before making part-payments."],
           ["Reduce tenure, not EMI", "When you prepay, choosing a shorter tenure usually saves more interest than reducing the EMI. Try both options in our prepayment calculator."]] },
  { id: 7, cat: "Business Loans", art: "business", read: 6, date: "2026-08-22", title: "Working capital finance explained for MSMEs",
    excerpt: "Channel finance, invoice discounting, PO funding and cash credit — which suits your business?",
    body: [["What working capital funds", "The money tied up between buying stock and getting paid by customers. The longer your operating cycle, the more working capital you need."],
           ["Invoice discounting", "Raise an invoice to a reputed buyer and get most of it paid upfront by a lender. You repay when the buyer pays. TReDS platforms also help MSMEs discount invoices on large buyers."],
           ["Channel financing", "Dealers and distributors of large brands get credit lines backed by the brand's relationship with the lender, often at lower rates."],
           ["Cash credit and overdraft", "Running limits from banks against stock and receivables. Interest is charged only on the amount used."],
           ["Prepare well", "Keep GST returns, bank statements and debtor ageing reports updated; lenders rely on them to set your limit."]] },
  { id: 8, cat: "Borrowing Basics", art: "shield", read: 4, date: "2026-08-10", title: "Loan fraud: seven warning signs to watch for",
    excerpt: "Fake loan offers, advance-fee scams and unregistered apps — how to stay safe.",
    body: [["Upfront fees are a red flag", "Genuine lenders deduct processing fees from the loan or charge them through official channels. Never pay 'approval', 'insurance' or 'GST' fees in advance to an individual's account or UPI ID."],
           ["Check the lender", "Banks and NBFCs are regulated by RBI. Check the lender's name on the RBI website and the lending app on RBI's list of digital lending apps."],
           ["Never share OTPs or passwords", "No lender or advisor needs your OTP, UPI PIN or net banking password to process a loan."],
           ["Insist on documents", "You should get a sanction letter and Key Fact Statement from the lender before signing. Read them fully."],
           ["Report fraud", "Report cyber fraud at cybercrime.gov.in or by calling 1930, and inform your bank immediately."]] }
];

/* ---------- glossary ---------- */
export const GLOSSARY = [
  ["EMI", "Equated Monthly Instalment: the fixed monthly payment of principal plus interest."],
  ["APR", "Annual Percentage Rate: the yearly cost of the loan including fees, not just interest."],
  ["KFS", "Key Fact Statement: a standard summary of rate, APR, fees and repayment, given before you sign."],
  ["Reducing balance", "Interest is charged only on the principal still outstanding, so it falls with each EMI."],
  ["Repo-linked rate", "A floating rate tied to the RBI repo rate (an external benchmark) plus the lender's spread."],
  ["LTV", "Loan-to-value: the loan as a percentage of the property, vehicle or security's value."],
  ["FOIR", "Fixed obligations to income ratio: the share of your income going to EMIs. Lenders usually cap it at 50–60%."],
  ["Credit score", "A 3-digit number (300–900) from a credit bureau summarising your repayment history."],
  ["Moratorium", "A period when EMIs are paused, for example during an education course."],
  ["Foreclosure", "Repaying the full outstanding loan before the tenure ends."],
  ["Balance transfer", "Moving an existing loan to another lender at a lower rate."],
  ["Top-up loan", "An additional loan on top of an existing home loan or LAP."]
];

/* ---------- FAQs ---------- */
export const FAQ_CATS = ["All", "General", "Applying", "Eligibility & Documents", "Interest & Charges", "Repayment", "Safety"];
export const FAQS = [
  { cat: "General", q: "Is First Advisors a bank or NBFC?", a: "No. First Advisors is a loan advisory and distribution service. Loans are sanctioned and disbursed by our partner banks and NBFCs, which are regulated by RBI. We help you compare offers, apply and complete the process." },
  { cat: "General", q: "Do you charge me a fee for advice?", a: "Our advisory service is free for customers on most loans; we are paid by the lending partner. If a fee ever applies, we tell you in writing before you proceed. [add your fee policy]" },
  { cat: "General", q: "Which lenders do you work with?", a: "We work with a panel of banks and NBFCs. We suggest lenders whose criteria and pricing suit your profile, and show you the rate, fees and APR from each before you choose." },
  { cat: "Applying", q: "How do I apply for a loan?", a: "Apply online with the short form, call us, or request a callback. An advisor checks your eligibility, collects documents and submits your application to the chosen lender." },
  { cat: "Applying", q: "How long does approval take?", a: "Personal and two-wheeler loans can be approved within a day or two. Home loans, LAP and business loans usually take one to three weeks because of property checks and financial assessment." },
  { cat: "Applying", q: "Will checking offers affect my credit score?", a: "Checking your own score does not affect it. A formal application to a lender creates a hard enquiry. We help you apply only to lenders likely to approve, to avoid unnecessary enquiries." },
  { cat: "Applying", q: "How do I track my application?", a: "Use 'Track application' with your reference number and mobile number, or call us. You also get updates by SMS and email." },
  { cat: "Eligibility & Documents", q: "What decides my loan eligibility?", a: "Your income, existing EMIs, credit score, age, job or business stability and, for secured loans, the value of the security." },
  { cat: "Eligibility & Documents", q: "Can I add a co-applicant?", a: "Yes. Adding an earning spouse or family member can increase the amount you are eligible for, especially for home loans." },
  { cat: "Eligibility & Documents", q: "Can documents be collected from home?", a: "Yes, in most cities our team or the lender's representative can collect documents from your home or office. You can also upload them securely." },
  { cat: "Interest & Charges", q: "What is the difference between fixed and floating rates?", a: "A fixed rate stays the same for the tenure. A floating rate moves with a benchmark such as the RBI repo rate, so your EMI or tenure changes when rates change." },
  { cat: "Interest & Charges", q: "Are there prepayment charges?", a: "RBI does not allow foreclosure or prepayment charges on floating-rate loans taken by individuals for non-business purposes. Fixed-rate loans and business loans may carry charges as per the lender's terms." },
  { cat: "Interest & Charges", q: "What is the processing fee?", a: "A one-time fee charged by the lender to process your loan, usually 0.25% to 3.5% of the loan amount plus GST. It is shown in the Key Fact Statement." },
  { cat: "Repayment", q: "How is my EMI calculated?", a: "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate and n is the number of months. Use our EMI calculator to try different amounts and tenures." },
  { cat: "Repayment", q: "Can I change my EMI date?", a: "Many lenders allow a one-time change of EMI date. We help you raise the request with your lender." },
  { cat: "Repayment", q: "What happens if I miss an EMI?", a: "The lender levies a bounce charge and penal charges, and the delay is reported to credit bureaus, which lowers your score. Contact your lender early if you face difficulty." },
  { cat: "Safety", q: "Will First Advisors ever ask for an upfront payment?", a: "No. We never ask you to pay any amount to an individual's bank account or UPI ID to get a loan approved. Fees, if any, are charged by the lender as per the KFS." },
  { cat: "Safety", q: "How do I report a suspicious call or message?", a: "Do not share OTPs or make payments. Call us on " + CONFIG.phone + " to verify, and report cyber fraud at cybercrime.gov.in or on 1930." },
  { cat: "Safety", q: "Is my data safe?", a: "We share your information only with the lenders you choose to apply with, and only for processing your loan. [add a link to your privacy policy]" }
];

