import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import Icon from "../../assets/icons/Icon";
import { validateControl } from "../../utils/validation";

const FormCtx = createContext({ errors: {}, revalidate: () => {} });
export const useFormErrors = () => useContext(FormCtx);

/** label used in "X is required." — the first label in the control's field, else aria-label */
export const labelFor = (el) =>
  ((el.closest(".field") || el.parentElement)?.querySelector("label")?.textContent || el.getAttribute("aria-label") || "This field").replace(/\*/g, "").trim();

/**
 * Imperative validation for multi-step or custom forms.
 * const v = useValidation();  <FormErrorsProvider value={v}> … </FormErrorsProvider>
 * v.validate(rootElement) → true when every control inside is valid (focuses the first invalid one).
 */
export function useValidation() {
  const [errors, setErrors] = useState({});
  const revalidate = useCallback((el) => {
    const msg = validateControl(el, labelFor(el));
    setErrors((prev) => (prev[el.id] === msg ? prev : { ...prev, [el.id]: msg }));
    return !msg;
  }, []);
  const validate = useCallback((root) => {
    const next = {};
    let first = null;
    root.querySelectorAll("input, select, textarea").forEach((el) => {
      if (!el.id || el.disabled || el.type === "hidden") return;
      const msg = validateControl(el, labelFor(el));
      if (msg) { next[el.id] = msg; first = first || el; }
    });
    setErrors((prev) => {
      const merged = { ...prev };
      root.querySelectorAll("input, select, textarea").forEach((el) => { if (el.id) delete merged[el.id]; });
      return { ...merged, ...next };
    });
    if (first) first.focus();
    return !first;
  }, []);
  const setError = useCallback((id, msg) => setErrors((prev) => ({ ...prev, [id]: msg })), []);
  return useMemo(() => ({ errors, revalidate, validate, setError }), [errors, revalidate, validate, setError]);
}

export function FormErrorsProvider({ value, children }) {
  return <FormCtx.Provider value={value}>{children}</FormCtx.Provider>;
}

/** Green confirmation box shown after a successful submit. */
export function FormSuccess({ title, children }) {
  return (
    <div className="form-success" role="status">
      <Icon name="checkbox" />
      <div><b>{title}</b>{children}</div>
    </div>
  );
}

/**
 * Form wrapper with inline validation and a success message.
 * Frontend only: nothing is sent. Replace the timeout in handleSubmit with a fetch()
 * to your API when a backend is available.
 */
export default function ValidatedForm({
  children, className, style, successTitle = "Thank you", success = "Our advisor will contact you shortly.",
  onSubmitted, resetOnSuccess = true, id
}) {
  const formRef = useRef(null);
  const v = useValidation();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!v.validate(form)) return;
    setSending(true);
    const data = Object.fromEntries(Array.from(form.elements).filter((el) => el.id).map((el) => [el.name || el.id, el.type === "checkbox" ? el.checked : el.value]));
    setTimeout(() => {
      const name = (form.elements.name?.value || "").trim().split(" ")[0];
      setDone({ title: successTitle + (name ? `, ${name}` : "") + ".", text: typeof success === "function" ? success(data) : success });
      setSending(false);
      if (resetOnSuccess) form.reset();
      onSubmitted?.(data);
    }, 700);
  };

  return (
    <FormCtx.Provider value={{ ...v, sending }}>
      <form ref={formRef} id={id} className={className} style={style} noValidate onSubmit={handleSubmit}>
        {children}
      </form>
      {done && <FormSuccess title={done.title}> {done.text} <em style={{ opacity: 0.75 }}>(Demo: no data was sent.)</em></FormSuccess>}
    </FormCtx.Provider>
  );
}

/** Submit button that shows a spinner while the form is "sending". */
export function SubmitButton({ className = "btn btn--primary", children, style }) {
  const { sending } = useFormErrors();
  return (
    <button className={className} type="submit" disabled={sending} style={style}>
      {sending ? (
        <><span style={{ width: 16, height: 16, border: "2px solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> Sending…</>
      ) : children}
    </button>
  );
}
