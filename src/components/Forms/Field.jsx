import { useFormErrors } from "./ValidatedForm";
import { cx } from "../../utils/classNames";

const digitsOnly = (max) => (e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, max); };

/**
 * Labelled form control with inline error.
 * <Field id="f-name" label="Full Name" name="name" required />
 * <Field id="f-loan" label="Loan" as="select" options={["Home Loan", …]} />
 * phone → 10-digit Indian mobile · pan → PAN format · pin → 6-digit PIN code · sm → compact.
 */
export default function Field({
  id, label, as = "input", options, phone, pan, pin, sm, full, className, hideLabel, children, onInput, prefix, ...props
}) {
  const { errors, revalidate } = useFormErrors();
  const error = errors[id];
  const base = as === "select" ? "select" : as === "textarea" ? "textarea" : "input";
  const control = {
    id,
    className: cx(base, sm && `${base}--sm`, prefix && "num"),
    "aria-invalid": error ? true : undefined,
    onBlur: (e) => e.target.value && revalidate(e.target),
    onChange: (e) => error && revalidate(e.target),
    ...props
  };
  if (phone) {
    Object.assign(control, { "data-phone": "", inputMode: "numeric", maxLength: 10, autoComplete: props.autoComplete || "tel",
      onInput: (e) => { digitsOnly(10)(e); onInput?.(e); } });
  } else if (pin) {
    Object.assign(control, { "data-pin": "", inputMode: "numeric", maxLength: 6, onInput: (e) => { digitsOnly(6)(e); onInput?.(e); } });
  } else if (onInput) control.onInput = onInput;
  if (pan) Object.assign(control, { "data-pan": "", maxLength: 10, style: { textTransform: "uppercase", ...props.style } });

  const input = as === "select" ? (
    <select {...control}>
      {options ? options.map((o) => (Array.isArray(o) ? <option key={o[0]} value={o[0]}>{o[1]}</option> : <option key={o}>{o}</option>)) : children}
    </select>
  ) : as === "textarea" ? <textarea {...control} /> : <input {...control} />;

  return (
    <div className={cx("field", sm && "field--sm", full && "full", error && "has-error", className)}>
      {label && <label htmlFor={id} className={hideLabel ? "sr-only" : undefined}>{label}</label>}
      {prefix ? <div className="amt-input"><span>{prefix}</span>{input}</div> : input}
      {error && <span className="err" aria-live="polite">{error}</span>}
    </div>
  );
}

/** Checkbox wrapped in a .field (error below). */
export function Check({ id, label, className, style, ...props }) {
  const { errors, revalidate } = useFormErrors();
  const error = errors[id];
  return (
    <div className={cx("field", error && "has-error", className)} style={style}>
      <label className="check" style={{ fontWeight: 400, color: "inherit", fontSize: 14 }}>
        <input type="checkbox" id={id} onChange={(e) => error && revalidate(e.target)} {...props} /> {label}
      </label>
      {error && <span className="err">{error}</span>}
    </div>
  );
}

/** Bare `label.check` consent checkbox (as used across the loans site); the error shows inside the label. */
export function CheckLabel({ id, children, className, style, onChange, ...props }) {
  const { errors, revalidate } = useFormErrors();
  const error = errors[id];
  return (
    <label className={cx("check", className, error && "has-error")} style={style}>
      <input type="checkbox" id={id} onChange={(e) => { if (error) revalidate(e.target); onChange?.(e); }} {...props} /> {children}
      {error && <span className="err" aria-live="polite">{error}</span>}
    </label>
  );
}
