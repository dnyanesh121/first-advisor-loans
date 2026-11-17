# First Advisors — Loans (React)

React conversion of the First Advisors Loans HTML/CSS/JS website. Same design, colours, typography,
spacing, breakpoints and animations — the original stylesheets are used unchanged.

**Stack:** React 18 (JavaScript) · Vite 5 · React Router DOM 6 · Framer Motion 11 (page transitions)

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

Requires Node.js 18 or newer.

## Routes

| Old HTML page                         | React route                              | Page component            |
|---------------------------------------|------------------------------------------|---------------------------|
| index.html                            | `/`                                      | `pages/Home.jsx`          |
| loans.html?seg=business               | `/loans?seg=business`                    | `pages/Loans.jsx`         |
| loan.html?type=home                   | `/loans/home`                            | `pages/LoanDetails.jsx`   |
| calculators.html?type=emi&loan=home   | `/calculators?type=emi&loan=home`        | `pages/Calculators.jsx`   |
| rates.html                            | `/rates` (`?loan=lap` opens its charges) | `pages/Rates.jsx`         |
| credit-score.html                     | `/credit-score`                          | `pages/CreditScore.jsx`   |
| apply.html?type=home                  | `/apply?type=home`                       | `pages/Apply.jsx`         |
| apply.html#track / ?ref=FAL…          | `/apply/track` / `/apply/track?ref=FAL…` | `pages/Apply.jsx`         |
| learn.html / article.html?id=3        | `/learn` / `/learn/3`                    | `pages/Learn.jsx`, `pages/Article.jsx` |
| faq.html                              | `/faq`                                   | `pages/Faq.jsx`           |
| contact.html#branches / #grievance    | `/contact#branches` / `/contact#grievance` | `pages/Contact.jsx`     |
| 404.html                              | any other URL                            | `pages/NotFound.jsx`      |

Product keys: `personal, home, lap, business, used-car, new-car, two-wheeler, las, education,
working-capital, term-loan, equipment, construction-equipment, commercial-vehicle, lrd`.

## Folder structure

```
public/                    favicon, _redirects (Netlify SPA fallback)
src/
  main.jsx · App.jsx       entry, BrowserRouter + MotionConfig + AppProvider
  routes/AppRoutes.jsx     all routes (pages lazy-loaded, Home eager)
  layouts/MainLayout.jsx   header, footer, toast, modals, page transition, scroll reveal
  context/AppContext.jsx   toast + quick-apply / login / callback modals
  pages/                   one file per page (table above)
  components/
    Navbar/                Navbar (two mega menus), MegaMenu, Drawer (mobile)
    Footer/                Footer with newsletter and not-a-lender disclosure
    Modals/                ApplyModal (quick apply with reference), LoginModal, ConsultModal
    Home/                  HomeHero (offer check + quick EMI card), StatsBand, BusinessLoans
    LoanDetails/           LoanHero (offer form), SubNav (scroll-spy), ProfileTabs
    loan/                  LoanCard, LoanTile, EmiWidget, EmiDonut, RangeField, RateTable
    Calculators/           CalcResult, ScheduleChart (chart + amortisation + CSV)
    Apply/                 ApplicationForm (4 steps), TrackApplication
    CreditScore/           ScoreGauge
    charts/LineChart.jsx   SVG line/area chart with hover tooltip (no library)
    Forms/                 ValidatedForm, useValidation, Field (phone / PAN / PIN), Check, CheckLabel
    common/                PageHero, Breadcrumbs, SectionTitle, Accordion, Slider, Modal, Toast,
                           EmptyState, InfoCard, Clouds, Stars, Glossary, SubscribeBox, …
    ArticleCard/, Testimonials/
  data/
    config.js              phone, email, address, rates date, grievance officer   ← fill [add] values
    loans.js               15 products: rates, amounts, features, eligibility, documents, charges, FAQs
    content.js             score bands, testimonials, guides, glossary, FAQs
    branches.js · menu.js
  hooks/                   useScrollReveal, useCountUp, useScrolled, useKeydown, useLockBodyScroll, useDocumentTitle
  utils/                   format (₹, %, tenure, dates), loanMath (EMI, amortisation, eligibility),
                           lookup (getLoan, URLs), applications (demo tracking), art (SVG illustrations), validation
  styles/                  tokens → base → components → pages → finance → loans → animations (original, unchanged)
                           + react.css (small additions for componentised markup)
```

## How the original behaviour maps to React

- **Styling:** the original CSS files are imported in the original order, so every class, colour, breakpoint
  and keyframe is identical. `react.css` only adds `.svg-host { display: contents }` and two rules whose
  original selectors pointed at `.html` links.
- **Animations:** the same `.reveal` / `.rise` CSS animations (`useScrollReveal` replaces the old observer
  script). Framer Motion fades between pages and respects "reduce motion".
- **Forms:** frontend only. To connect a backend, replace the `setTimeout` in
  `components/Forms/ValidatedForm.jsx` and the `submit` handlers in `components/Modals/ApplyModal.jsx` and
  `components/Apply/ApplicationForm.jsx` with calls to your CRM / lender APIs. Tracking reads applications
  saved in the visitor's browser (`utils/applications.js`) until then.
- **Apply / Track** are one screen: switching tabs keeps a half-filled application.

## Before going live

1. Rates, fees and charges in `src/data/loans.js` are indicative — replace with your partner lenders'
   current figures and update `ratesAsOf` in `src/data/config.js`.
2. Fill every `[add]` value (WhatsApp, stats, grievance officer, branches, DSA / partner registration line).
3. Replace the sample testimonials and get the legal wording reviewed by your compliance team.

## Deploy

- **Netlify:** build `npm run build`, publish `dist` (`public/_redirects` handles SPA routes).
- **Vercel:** framework preset "Vite" (`vercel.json` rewrites all routes to `index.html`).
- **Any static host:** upload `dist/` and send unknown paths to `index.html`.
