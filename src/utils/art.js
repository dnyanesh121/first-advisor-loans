/* ==========================================================================
 * Visual assets as code: loan & finance illustrations (product heroes, menu
 * promos, guide cards, 404) and the empty-state picture. Returned as SVG
 * strings and rendered through <SvgArt/>.
 * ========================================================================== */
let uidN = 0;
function uid(p) { uidN += 1; return (p || "u") + uidN; }

/** deterministic pseudo-random generator (mulberry32) */
export function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

export function emptySVG() {
  return '<svg viewBox="0 0 120 90" aria-hidden="true"><ellipse cx="60" cy="82" rx="44" ry="5" fill="#003986" opacity=".08"/><path d="M22 44 60 14l38 30" fill="none" stroke="#D6350F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><rect x="32" y="42" width="56" height="38" rx="2" fill="#fff" stroke="#003986" stroke-width="3"/><path d="M50 60c0-6 10-6 10 0 0-6 10-6 10 0 0 7-10 12-10 12s-10-5-10-12z" fill="#FCE9E4" stroke="#D6350F" stroke-width="2"/></svg>';
}

function sv(inner) { return '<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + "</svg>"; }
export function financeArt (kind, seed) {
  var R = rng((seed || 1) * 131 + kind.length * 17), id = uid("f"), s = "";
  var bg = '<defs><linearGradient id="' + id + 'b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EAF1FA"/><stop offset="1" stop-color="#D3E2F3"/></linearGradient>' +
    '<linearGradient id="' + id + 'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E34A25" stop-opacity=".35"/><stop offset="1" stop-color="#E34A25" stop-opacity="0"/></linearGradient>' +
    '<linearGradient id="' + id + 'n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0247A5"/><stop offset="1" stop-color="#002B66"/></linearGradient></defs>' +
    '<rect width="400" height="225" fill="url(#' + id + 'b)"/>';
  var grid = ""; for (var g = 1; g < 5; g++) grid += '<line x1="0" x2="400" y1="' + g * 45 + '" y2="' + g * 45 + '" stroke="#fff" stroke-width="1.2" opacity=".7"/>';
  s += bg + grid;
  if (kind === "growth" || kind === "sip") {
    var pts = [], y = 175; for (var i = 0; i <= 20; i++) { y -= 2 + R() * 9 - (R() < .25 ? 10 : 0); y = Math.max(40, Math.min(190, y)); pts.push([i * 20, y]); }
    var d = pts.map(function (p, k) { return (k ? "L" : "M") + p[0] + "," + p[1].toFixed(1); }).join(" ");
    s += '<path d="' + d + ' L400,225 L0,225Z" fill="url(#' + id + 'a)"/><path d="' + d + '" fill="none" stroke="#D6350F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>';
    if (kind === "sip") for (var c = 0; c < 6; c++) { var cx = 40 + c * 62, h = 20 + c * 16; s += '<g>' ; for (var k2 = 0; k2 < Math.round(h / 9); k2++) s += '<ellipse cx="' + cx + '" cy="' + (210 - k2 * 9) + '" rx="20" ry="6" fill="' + (k2 % 2 ? "#F0B429" : "#FFC800") + '" stroke="#C98A00" stroke-width="1"/>'; s += "</g>"; }
    var last = pts[pts.length - 1]; s += '<circle cx="' + (last[0] - 4) + '" cy="' + last[1] + '" r="8" fill="#fff" stroke="#D6350F" stroke-width="4"/>';
  } else if (kind === "coins" || kind === "tax") {
    for (var st = 0; st < 4; st++) { var x = 70 + st * 80, n = 4 + st * 3; for (var k = 0; k < n; k++) s += '<ellipse cx="' + x + '" cy="' + (200 - k * 10) + '" rx="30" ry="9" fill="' + (k % 2 ? "#F0B429" : "#FFC800") + '" stroke="#C98A00" stroke-width="1.2"/>'; }
    if (kind === "tax") s += '<g transform="translate(300 40)"><rect width="76" height="96" rx="8" fill="#fff" stroke="#003986" stroke-width="3"/><path d="M14 24h48M14 40h48M14 56h30" stroke="#8A93A3" stroke-width="4" stroke-linecap="round"/><circle cx="56" cy="76" r="14" fill="#138A52"/><path d="m49 76 5 5 9-9" stroke="#fff" stroke-width="3" fill="none"/></g>';
    else s += '<path d="M40 70 C120 40 220 90 360 30" stroke="#003986" stroke-width="4" fill="none" stroke-dasharray="8 8"/><path d="M350 22 366 30 352 42" stroke="#003986" stroke-width="4" fill="none"/>';
  } else if (kind === "shield" || kind === "debt") {
    s += '<g transform="translate(150 30)"><path d="M50 0 100 18v48c0 40-24 70-50 82C24 136 0 106 0 66V18z" fill="url(#' + id + 'n)"/><path d="m28 70 16 16 32-34" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
    for (var b = 0; b < 8; b++) s += '<rect x="' + (20 + b * 12) + '" y="' + (190 - b * 6) + '" width="8" height="' + (b * 6 + 10) + '" rx="2" fill="#7FA6D6"/>';
    for (var b2 = 0; b2 < 8; b2++) s += '<rect x="' + (284 + b2 * 12) + '" y="' + (150 + (b2 % 3) * 4) + '" width="8" height="' + (50 - (b2 % 3) * 4) + '" rx="2" fill="#E34A25" opacity=".7"/>';
  } else if (kind === "goal") {
    s += '<g transform="translate(200 112)"><circle r="78" fill="#fff"/><circle r="62" fill="#FCE9E4"/><circle r="46" fill="#fff"/><circle r="30" fill="#E34A25"/><circle r="14" fill="#fff"/></g><path d="M330 30 210 108" stroke="#003986" stroke-width="5"/><path d="M330 30l20-4-6 18-14-14z" fill="#003986"/>';
    s += '<path d="M30 200 C80 170 110 190 150 160" stroke="#D6350F" stroke-width="4" fill="none" stroke-dasharray="6 8"/>';
  } else if (kind === "globe") {
    s += '<g transform="translate(200 112)"><circle r="80" fill="url(#' + id + 'n)"/><ellipse rx="80" ry="30" fill="none" stroke="#7FA6D6" stroke-width="2"/><ellipse rx="34" ry="80" fill="none" stroke="#7FA6D6" stroke-width="2"/><path d="M-80 0h160M0-80v160" stroke="#7FA6D6" stroke-width="2"/><path d="M-40 -40c20 10 10 30 30 30s20 30 0 40" fill="#4FA06A" opacity=".8"/></g>';
    s += '<path d="M20 190 L120 150 L200 170 L380 70" stroke="#D6350F" stroke-width="4" fill="none"/>';
  } else if (kind === "gold") {
    [[120, 150], [200, 150], [280, 150], [160, 108], [240, 108], [200, 66]].forEach(function (p) { s += '<path d="M' + (p[0] - 36) + "," + (p[1] + 34) + " l12,-34 h48 l12,34z" + '" fill="#FFC800" stroke="#C98A00" stroke-width="2"/><path d="M' + (p[0] - 22) + "," + (p[1] + 6) + ' h44" stroke="#FFE680" stroke-width="3"/>'; });
  } else if (kind === "calendar") {
    s += '<g transform="translate(110 30)"><rect width="180" height="160" rx="14" fill="#fff" stroke="#003986" stroke-width="4"/><rect width="180" height="40" rx="14" fill="#003986"/><rect y="26" width="180" height="14" fill="#003986"/>';
    for (var r = 0; r < 3; r++) for (var cc = 0; cc < 5; cc++) s += '<rect x="' + (16 + cc * 32) + '" y="' + (56 + r * 32) + '" width="22" height="22" rx="5" fill="' + (r === 1 && cc === 2 ? "#E34A25" : "#E6EEF9") + '"/>';
    s += "</g>";
  } else if (kind === "home" || kind === "property") {
    s += '<ellipse cx="200" cy="205" rx="150" ry="10" fill="#003986" opacity=".08"/>';
    if (kind === "property") s += '<g transform="translate(250 50)"><rect width="90" height="150" rx="4" fill="url(#' + id + 'n)"/>' + (function () { var w = ""; for (var r = 0; r < 6; r++) for (var c = 0; c < 3; c++) w += '<rect x="' + (12 + c * 26) + '" y="' + (14 + r * 22) + '" width="16" height="12" rx="2" fill="' + ((r + c) % 3 ? "#7FA6D6" : "#FFE680") + '"/>'; return w; })() + "</g>";
    s += '<g transform="translate(' + (kind === "property" ? 70 : 120) + ' 60)"><path d="M0 70 80 8l80 62" fill="none" stroke="#D6350F" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><rect x="18" y="62" width="124" height="84" rx="4" fill="#fff" stroke="#003986" stroke-width="4"/><rect x="66" y="96" width="28" height="50" rx="3" fill="#003986"/><rect x="32" y="82" width="24" height="22" rx="3" fill="#E6EEF9" stroke="#003986" stroke-width="3"/><rect x="104" y="82" width="24" height="22" rx="3" fill="#E6EEF9" stroke="#003986" stroke-width="3"/></g>';
    s += '<g transform="translate(' + (kind === "property" ? 300 : 310) + ' 150) rotate(-20)"><circle r="16" fill="none" stroke="#F0B429" stroke-width="7"/><path d="M14 0h44M44 0v12M54 0v9" stroke="#F0B429" stroke-width="7" stroke-linecap="round"/></g>';
  } else if (kind === "car" || kind === "bike") {
    s += '<path d="M0 196h400" stroke="#003986" stroke-width="3" opacity=".25"/><path d="M30 214h80M180 214h60M300 214h70" stroke="#fff" stroke-width="5" stroke-linecap="round"/>';
    if (kind === "car") s += '<g transform="translate(80 92)"><path d="M10 72 26 34c4-10 12-16 24-16h130c12 0 20 6 26 16l22 38" fill="#fff" stroke="#003986" stroke-width="5"/><rect x="0" y="66" width="240" height="40" rx="14" fill="#E34A25"/><path d="M46 30h58v32H34zM118 30h60l18 32h-78z" fill="#BFD4EE"/><circle cx="54" cy="106" r="20" fill="#1B2333"/><circle cx="54" cy="106" r="8" fill="#D5DDE8"/><circle cx="188" cy="106" r="20" fill="#1B2333"/><circle cx="188" cy="106" r="8" fill="#D5DDE8"/><rect x="216" y="76" width="18" height="10" rx="3" fill="#FFE680"/></g>';
    else s += '<g transform="translate(110 96)" stroke-linecap="round" stroke-linejoin="round"><circle cx="40" cy="80" r="30" fill="none" stroke="#1B2333" stroke-width="9"/><circle cx="170" cy="80" r="30" fill="none" stroke="#1B2333" stroke-width="9"/><path d="M40 80 76 30h62l32 50" fill="none" stroke="#003986" stroke-width="9"/><path d="M70 30c10-14 52-14 70 0" fill="#E34A25" stroke="#E34A25" stroke-width="10"/><path d="M138 30l14-24h22" fill="none" stroke="#003986" stroke-width="8"/><path d="M76 30 62 8H44" fill="none" stroke="#003986" stroke-width="8"/></g>';
  } else if (kind === "truck" || kind === "equipment") {
    s += '<path d="M0 196h400" stroke="#003986" stroke-width="3" opacity=".25"/>';
    if (kind === "truck") s += '<g transform="translate(50 70)"><rect x="0" y="20" width="190" height="96" rx="6" fill="#fff" stroke="#003986" stroke-width="5"/><path d="M14 44h162M14 68h162" stroke="#D5DDE8" stroke-width="4"/><path d="M190 52h62l40 40v24H190z" fill="#E34A25"/><path d="M204 62h40l26 28h-66z" fill="#BFD4EE"/><circle cx="50" cy="124" r="20" fill="#1B2333"/><circle cx="50" cy="124" r="7" fill="#D5DDE8"/><circle cx="240" cy="124" r="20" fill="#1B2333"/><circle cx="240" cy="124" r="7" fill="#D5DDE8"/></g>';
    else s += '<g transform="translate(70 40)" stroke-linecap="round" stroke-linejoin="round"><rect x="40" y="110" width="170" height="36" rx="18" fill="#1B2333"/><circle cx="64" cy="128" r="9" fill="#5E6778"/><circle cx="186" cy="128" r="9" fill="#5E6778"/><rect x="70" y="60" width="110" height="52" rx="6" fill="#F0B429" stroke="#C98A00" stroke-width="3"/><rect x="128" y="30" width="48" height="42" rx="4" fill="#fff" stroke="#003986" stroke-width="4"/><path d="M80 70 30 10 -10 60" fill="none" stroke="#F0B429" stroke-width="14"/><path d="M-22 56h34l-6 26h-26z" fill="#003986"/></g><g transform="translate(320 60)"><circle r="26" fill="none" stroke="#D6350F" stroke-width="10" stroke-dasharray="10 7"/><circle r="10" fill="#D6350F"/></g>';
  } else if (kind === "business") {
    s += '<g transform="translate(70 50)"><rect x="0" y="40" width="150" height="120" rx="6" fill="#fff" stroke="#003986" stroke-width="5"/><path d="M-6 40h162l-14-36H8z" fill="#E34A25"/><path d="M8 4l-14 36M150 4l14 36" stroke="#B92C0B" stroke-width="3"/><rect x="20" y="70" width="46" height="90" fill="url(#' + id + 'n)"/><rect x="84" y="70" width="48" height="40" rx="3" fill="#E6EEF9" stroke="#003986" stroke-width="3"/></g>';
    var bp = [[250, 170], [280, 150], [310, 155], [340, 120], [370, 90]]; s += '<path d="M' + bp.map(function (p) { return p.join(","); }).join(" L") + '" fill="none" stroke="#138A52" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M356 84l18 2-4 18" fill="none" stroke="#138A52" stroke-width="6" stroke-linecap="round"/>';
    for (var bb = 0; bb < 4; bb++) s += '<rect x="' + (252 + bb * 30) + '" y="' + (200 - 20 - bb * 14) + '" width="18" height="' + (20 + bb * 14) + '" rx="3" fill="#7FA6D6"/>';
  } else if (kind === "personal") {
    s += '<g transform="translate(120 60)"><rect width="160" height="110" rx="14" fill="url(#' + id + 'n)"/><rect x="96" y="38" width="76" height="36" rx="10" fill="#E34A25"/><circle cx="116" cy="56" r="7" fill="#fff"/><path d="M18 22h70" stroke="#7FA6D6" stroke-width="5" stroke-linecap="round"/></g>';
    s += '<g transform="translate(60 40) rotate(-12)" fill="#003986"><path d="M0 14 46 8l14-8 6 4-8 10 26 4-4 6-26-2-12 10-6-2 6-10-38 6z"/></g>';
    for (var pc = 0; pc < 3; pc++) s += '<ellipse cx="' + (300 + pc * 24) + '" cy="' + (196 - pc * 3) + '" rx="22" ry="7" fill="' + (pc % 2 ? "#F0B429" : "#FFC800") + '" stroke="#C98A00"/>';
  } else if (kind === "securities") {
    s += '<g transform="translate(70 40)"><rect width="200" height="140" rx="10" fill="#fff" stroke="#003986" stroke-width="4"/>';
    var sp = [[20, 110], [50, 90], [80, 100], [110, 60], [140, 70], [176, 30]]; s += '<path d="M' + sp.map(function (p) { return p.join(","); }).join(" L") + '" fill="none" stroke="#138A52" stroke-width="5" stroke-linejoin="round"/>';
    for (var sc = 0; sc < 6; sc++) s += '<rect x="' + (22 + sc * 28) + '" y="118" width="14" height="14" rx="2" fill="' + (sc % 2 ? "#E34A25" : "#7FA6D6") + '"/>'; s += "</g>";
    s += '<g transform="translate(270 90)"><rect x="0" y="40" width="80" height="66" rx="10" fill="#E34A25"/><path d="M16 40V24a24 24 0 0 1 48 0v16" fill="none" stroke="#003986" stroke-width="9"/><circle cx="40" cy="70" r="8" fill="#fff"/><path d="M40 74v14" stroke="#fff" stroke-width="5"/></g>';
  } else if (kind === "education") {
    s += '<g transform="translate(200 90)"><path d="M-110 0 0-50 110 0 0 50z" fill="url(#' + id + 'n)"/><path d="M-64 22v44c30 24 98 24 128 0V22L0 50z" fill="#003986"/><path d="M96 6v62" stroke="#F0B429" stroke-width="5"/><circle cx="96" cy="72" r="8" fill="#F0B429"/></g>';
    s += '<g transform="translate(40 168)"><rect width="90" height="16" rx="3" fill="#E34A25"/><rect y="-16" width="90" height="16" rx="3" fill="#7FA6D6"/></g><g transform="translate(280 168)"><rect width="90" height="16" rx="3" fill="#F0B429"/><rect x="6" y="-16" width="80" height="16" rx="3" fill="#E34A25"/></g>';
  } else if (kind === "gauge") {
    var cols = ["#C62828", "#E8612C", "#F2C12E", "#2E9E5B"];
    for (var gi = 0; gi < 4; gi++) { var a0 = Math.PI * (1 - gi / 4), a1 = Math.PI * (1 - (gi + 1) / 4), p0 = function (a, r) { return (200 + r * Math.cos(a)).toFixed(1) + "," + (190 - r * Math.sin(a)).toFixed(1); }; s += '<path d="M' + p0(a0, 140) + " A140,140 0 0 1 " + p0(a1, 140) + " L" + p0(a1, 96) + " A96,96 0 0 0 " + p0(a0, 96) + 'Z" fill="' + cols[gi] + '" stroke="#fff" stroke-width="3"/>'; }
    s += '<path d="M200 190 290 110" stroke="#1B2333" stroke-width="8" stroke-linecap="round"/><circle cx="200" cy="190" r="14" fill="#1B2333"/>';
  } else if (kind === "doc" || kind === "calc") {
    if (kind === "doc") s += '<g transform="translate(130 24)"><rect width="140" height="180" rx="10" fill="#fff" stroke="#003986" stroke-width="4"/><rect width="140" height="34" rx="10" fill="#003986"/><rect y="20" width="140" height="14" fill="#003986"/><path d="M20 60h100M20 84h100M20 108h70M20 132h86" stroke="#B6C2D2" stroke-width="7" stroke-linecap="round"/><circle cx="108" cy="154" r="20" fill="#138A52"/><path d="m98 154 7 7 12-13" stroke="#fff" stroke-width="4" fill="none"/></g>';
    else { s += '<g transform="translate(140 20)"><rect width="120" height="180" rx="14" fill="url(#' + id + 'n)"/><rect x="14" y="16" width="92" height="40" rx="6" fill="#BFD4EE"/>'; for (var cr = 0; cr < 4; cr++) for (var ck = 0; ck < 3; ck++) s += '<rect x="' + (14 + ck * 32) + '" y="' + (70 + cr * 28) + '" width="24" height="20" rx="4" fill="' + (ck === 2 && cr > 1 ? "#E34A25" : "#fff") + '"/>'; s += "</g>"; }
  } else {
    return financeArt("growth", seed);
  }
  return sv(s);
}
