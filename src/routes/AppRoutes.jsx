import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

// Home loads eagerly; every other page is split into its own chunk.
const Loans = lazy(() => import("../pages/Loans"));
const LoanDetails = lazy(() => import("../pages/LoanDetails"));
const Calculators = lazy(() => import("../pages/Calculators"));
const Rates = lazy(() => import("../pages/Rates"));
const CreditScore = lazy(() => import("../pages/CreditScore"));
const Apply = lazy(() => import("../pages/Apply"));
const Learn = lazy(() => import("../pages/Learn"));
const Article = lazy(() => import("../pages/Article"));
const Faq = lazy(() => import("../pages/Faq"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="loans" element={<Loans />} />
        <Route path="loans/:type" element={<LoanDetails />} />
        <Route path="calculators" element={<Calculators />} />
        <Route path="rates" element={<Rates />} />
        <Route path="credit-score" element={<CreditScore />} />
        <Route path="apply" element={<Apply />} />
        <Route path="apply/track" element={<Apply />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/:id" element={<Article />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
