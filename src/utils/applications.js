/* Applications submitted from this browser (frontend demo tracking).
   Replace with your CRM / lender API when a backend is available. */
const KEY = "fal_apps";

function read() {
  try { const v = localStorage.getItem(KEY); return v ? JSON.parse(v) : []; } catch { return []; }
}
function write(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* storage unavailable */ }
}

export const apps = {
  all: read,
  add(a) { write([a, ...read()].slice(0, 20)); return a; },
  find(ref, phone) { return read().find((a) => a.ref === ref.toUpperCase().trim() && (!phone || a.phone === phone)); }
};

/** reference like FAL4K9Z2Q12 */
export const newRef = () => "FAL" + Date.now().toString(36).toUpperCase().slice(-6) + Math.floor(Math.random() * 90 + 10);
