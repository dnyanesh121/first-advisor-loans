/* Form validation rules shared by every form on the site. */
const PHONE = /^[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PAN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PIN = /^[1-9]\d{5}$/;

/**
 * Validate a single form control using its native attributes:
 * required, type="email", data-phone, data-pan, data-pin, data-min="N".
 * Returns an error message, or "" when valid.
 */
export function validateControl(el, label = "This field") {
  const v = (el.value || "").trim();
  if (el.type === "checkbox") return el.required && !el.checked ? "Please confirm to continue." : "";
  if (el.required && !v) return `${label} is required.`;
  if (v && el.type === "email" && !EMAIL.test(v)) return "Enter a valid email address.";
  if (v && el.dataset.phone !== undefined) {
    const digits = v.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
    if (!PHONE.test(digits)) return "Enter a 10-digit Indian mobile number.";
  }
  if (v && el.dataset.pan !== undefined && !PAN.test(v.toUpperCase())) return "Enter a valid PAN, e.g. ABCDE1234F.";
  if (v && el.dataset.pin !== undefined && !PIN.test(v)) return "Enter a valid 6-digit PIN code.";
  if (v && el.dataset.min && v.length < Number(el.dataset.min)) return `${label} needs at least ${el.dataset.min} characters.`;
  return "";
}
