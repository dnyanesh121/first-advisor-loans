import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/common/BackToTop";
import ScrollToTop from "../components/common/ScrollToTop";
import Toast from "../components/common/Toast";
import ApplyModal from "../components/Modals/ApplyModal";
import LoginModal from "../components/Modals/LoginModal";
import ConsultModal from "../components/Modals/ConsultModal";
import { useApp } from "../context/AppContext";
import useScrollReveal from "../hooks/useScrollReveal";
import { pageKey } from "../utils/pageKey";

function PageLoader() {
  return <div className="container" style={{ minHeight: "60vh" }} aria-busy="true" />;
}

/** Shared chrome for every page: header, footer, overlays and page transitions. */
export default function MainLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const { modal, closeModal } = useApp();
  useScrollReveal();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        {/* opacity-only transition: no transform, so the sticky sub-nav and fixed elements keep working */}
        <motion.main
          id="main"
          key={pageKey(pathname)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Suspense fallback={<PageLoader />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
      <Toast />
      {modal?.type === "apply" && <ApplyModal key={modal.key} open onClose={closeModal} loanKey={modal.loan} prefill={modal.prefill} />}
      <LoginModal key={modal?.type === "login" ? modal.key : "login"} open={modal?.type === "login"} onClose={closeModal} />
      <ConsultModal key={modal?.type === "consult" ? modal.key : "consult"} open={modal?.type === "consult"} onClose={closeModal} />
    </>
  );
}
