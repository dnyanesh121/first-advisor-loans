import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

/* ==========================================================================
   Global UI state shared by every page: toast messages and the quick-apply,
   login and callback modals.
   ========================================================================== */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [toastState, setToastState] = useState({ msg: null, key: 0 });
  // modal: null | { type: "apply", loan, prefill } | { type: "login" } | { type: "consult" }
  const [modal, setModal] = useState(null);
  const timer = useRef();

  const toast = useCallback((msg) => {
    clearTimeout(timer.current);
    setToastState((t) => ({ msg, key: t.key + 1 }));
    timer.current = setTimeout(() => setToastState((t) => ({ ...t, msg: null })), 3200);
  }, []);

  /** copy text and confirm with a toast */
  const copy = useCallback((text, okMsg = "Copied") => {
    try {
      navigator.clipboard.writeText(text).then(() => toast(okMsg), () => toast("Copy this: " + text));
    } catch {
      toast("Copy this: " + text);
    }
  }, [toast]);

  const openApply = useCallback((loan = "personal", prefill = {}) => setModal({ type: "apply", loan, prefill, key: Date.now() }), []);
  const openLogin = useCallback(() => setModal({ type: "login", key: Date.now() }), []);
  const openConsult = useCallback(() => setModal({ type: "consult", key: Date.now() }), []);
  const closeModal = useCallback(() => setModal(null), []);

  const value = useMemo(() => ({ toast, toastState, copy, modal, openApply, openLogin, openConsult, closeModal }),
    [toast, toastState, copy, modal, openApply, openLogin, openConsult, closeModal]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
