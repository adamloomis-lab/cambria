/*!
 * Adam Loomis Marketing — Accessibility Tools widget (homegrown, reusable).
 * Self-contained: no dependencies, no third-party calls, nothing phones home.
 * A comfort/convenience panel (text size, contrast, link highlight, spacing,
 * motion, cursor). This is NOT an "ADA compliance" tool and makes no such claim;
 * real accessibility lives in the WCAG 2.1 AA build underneath it.
 *
 * Drop-in on ANY site:
 *   <script defer src="/accessibility-widget.js" data-accent="#C1272D"></script>
 * Optional: data-position="left|right" (default left), data-accent="#hex".
 */
(function () {
  "use strict";
  if (window.__almA11y) return;
  window.__almA11y = true;

  var doc = document, root = doc.documentElement;
  var script = doc.currentScript || (function () { var s = doc.getElementsByTagName("script"); return s[s.length - 1]; })();
  var accent = (script && script.getAttribute("data-accent")) || (window.ALM_A11Y && window.ALM_A11Y.accent) || "#0b5bd3";
  var pos = ((script && script.getAttribute("data-position")) || "left").toLowerCase() === "right" ? "right" : "left";
  var farSide = pos === "left" ? "right" : "left";
  var STORE = "alm_a11y_v1";
  var TEXT = [100, 112, 125, 140, 160];

  var state = { textStep: 0, contrast: false, links: false, spacing: false, motion: false, cursor: false };
  try { var saved = JSON.parse(localStorage.getItem(STORE)); if (saved) state = Object.assign(state, saved); } catch (e) {}
  function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} }

  // ---------- effect styles (applied to the page) ----------
  var css = "" +
    ":root{--alm-a11y-accent:" + accent + "}" +
    "html.alm-a11y-links a{text-decoration:underline !important;text-underline-offset:2px;outline:1px solid currentColor;outline-offset:2px}" +
    "html.alm-a11y-spacing body{line-height:1.9 !important;letter-spacing:.04em !important;word-spacing:.12em !important}" +
    "html.alm-a11y-motion *,html.alm-a11y-motion *::before,html.alm-a11y-motion *::after{animation:none !important;transition:none !important;scroll-behavior:auto !important}" +
    "html.alm-a11y-contrast{filter:contrast(1.28)}" +
    "html.alm-a11y-contrast img,html.alm-a11y-contrast picture,html.alm-a11y-contrast video,html.alm-a11y-contrast svg,html.alm-a11y-contrast canvas,html.alm-a11y-contrast .alm-a11y-ui{filter:contrast(.8)}" +
    "html.alm-a11y-cursor,html.alm-a11y-cursor *{cursor:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' stroke='%23000' stroke-width='1.4' d='M5 2.5l13 7.6-5.8 1.4L9 18z'/%3E%3C/svg%3E\") 5 4,auto !important}" +
    // widget chrome
    ".alm-a11y-ui,.alm-a11y-ui *{box-sizing:border-box;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0}" +
    ".alm-a11y-btn{position:fixed;bottom:18px;" + pos + ":18px;z-index:2147483000;width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;background:var(--alm-a11y-accent);color:#fff;box-shadow:0 6px 22px rgba(0,0,0,.3);display:grid;place-items:center;padding:0}" +
    ".alm-a11y-btn:hover{transform:scale(1.05)}" +
    ".alm-a11y-btn:focus-visible{outline:3px solid #fff;outline-offset:3px}" +
    ".alm-a11y-btn svg{width:28px;height:28px;fill:#fff}" +
    ".alm-a11y-panel{position:fixed;bottom:82px;" + pos + ":18px;z-index:2147483000;width:300px;max-width:calc(100vw - 36px);background:#fff;color:#1a1a1a;border-radius:14px;box-shadow:0 16px 50px rgba(0,0,0,.35);border:1px solid #e5e5e5;overflow:hidden;display:none}" +
    ".alm-a11y-panel[data-open='1']{display:block}" +
    ".alm-a11y-head{position:relative;background:var(--alm-a11y-accent);color:#fff;padding:14px 16px}" +
    ".alm-a11y-head h2{font-size:15px;font-weight:700}" +
    ".alm-a11y-head p{margin-top:2px;font-size:12px;opacity:.92}" +
    ".alm-a11y-close{position:absolute;top:10px;" + farSide + ":10px;background:rgba(255,255,255,.2);border:none;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:18px;line-height:1}" +
    ".alm-a11y-close:hover{background:rgba(255,255,255,.35)}" +
    ".alm-a11y-body{padding:10px 12px;max-height:min(62vh,470px);overflow-y:auto}" +
    ".alm-a11y-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 4px;border-bottom:1px solid #f0f0f0}" +
    ".alm-a11y-row:last-child{border-bottom:none}" +
    ".alm-a11y-row>span{font-size:14px;font-weight:600;color:#1a1a1a}" +
    ".alm-a11y-toggle{background:#e6e6e6;border:1px solid #d8d8d8;border-radius:999px;width:46px;height:26px;position:relative;cursor:pointer;flex:none;padding:0}" +
    ".alm-a11y-toggle[aria-pressed='true']{background:var(--alm-a11y-accent);border-color:var(--alm-a11y-accent)}" +
    ".alm-a11y-toggle::after{content:'';position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .15s}" +
    ".alm-a11y-toggle[aria-pressed='true']::after{transform:translateX(20px)}" +
    ".alm-a11y-toggle:focus-visible{outline:2px solid var(--alm-a11y-accent);outline-offset:2px}" +
    ".alm-a11y-steps{display:flex;gap:6px}" +
    ".alm-a11y-steps button{border:1px solid #d8d8d8;background:#f7f7f7;border-radius:8px;padding:5px 11px;cursor:pointer;font-weight:700;font-size:13px;color:#1a1a1a;min-width:34px}" +
    ".alm-a11y-steps button:hover{border-color:var(--alm-a11y-accent)}" +
    ".alm-a11y-reset{width:100%;margin-top:6px;padding:9px;border:1px solid #d8d8d8;background:#f7f7f7;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;color:#1a1a1a}" +
    ".alm-a11y-reset:hover{border-color:var(--alm-a11y-accent)}" +
    ".alm-a11y-foot{padding:4px 14px 12px;font-size:11px;color:#8a8a8a;text-align:center}" +
    // on phones, lift above the sticky Call/CTA action bar most of our sites use
    "@media (max-width:640px){.alm-a11y-btn{bottom:88px;width:48px;height:48px}.alm-a11y-panel{bottom:146px;max-height:min(64vh,440px)}}" +
    "@media (prefers-reduced-motion: reduce){.alm-a11y-toggle::after{transition:none}.alm-a11y-btn:hover{transform:none}}";

  var styleEl = doc.createElement("style");
  styleEl.id = "alm-a11y-style";
  styleEl.textContent = css;

  function apply() {
    root.classList.toggle("alm-a11y-contrast", !!state.contrast);
    root.classList.toggle("alm-a11y-links", !!state.links);
    root.classList.toggle("alm-a11y-spacing", !!state.spacing);
    root.classList.toggle("alm-a11y-motion", !!state.motion);
    root.classList.toggle("alm-a11y-cursor", !!state.cursor);
    root.style.fontSize = TEXT[state.textStep] === 100 ? "" : TEXT[state.textStep] + "%";
    if (state.motion) { try { doc.querySelectorAll("video[autoplay]").forEach(function (v) { v.pause(); }); } catch (e) {} }
  }

  // ---------- build the UI ----------
  var ICON = "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18z'/></svg>";

  var btn = doc.createElement("button");
  btn.className = "alm-a11y-ui alm-a11y-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Accessibility tools");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = ICON;

  var panel = doc.createElement("div");
  panel.className = "alm-a11y-ui alm-a11y-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", "Accessibility tools");

  function toggleRow(label, key) {
    return "<div class='alm-a11y-row'><span id='alm-lbl-" + key + "'>" + label + "</span>" +
      "<button type='button' class='alm-a11y-toggle' data-key='" + key + "' role='switch' aria-pressed='" + (!!state[key]) + "' aria-labelledby='alm-lbl-" + key + "'></button></div>";
  }

  panel.innerHTML =
    "<div class='alm-a11y-head'><h2>Accessibility tools</h2><p>Adjust this page to your comfort.</p>" +
    "<button type='button' class='alm-a11y-close' aria-label='Close accessibility tools'>&times;</button></div>" +
    "<div class='alm-a11y-body'>" +
      "<div class='alm-a11y-row'><span>Text size</span><div class='alm-a11y-steps'>" +
        "<button type='button' data-text='-' aria-label='Decrease text size'>A&minus;</button>" +
        "<button type='button' data-text='+' aria-label='Increase text size'>A+</button></div></div>" +
      toggleRow("High contrast", "contrast") +
      toggleRow("Highlight links", "links") +
      toggleRow("Readable spacing", "spacing") +
      toggleRow("Pause animations", "motion") +
      toggleRow("Big cursor", "cursor") +
      "<button type='button' class='alm-a11y-reset'>Reset all</button>" +
    "</div>" +
    "<div class='alm-a11y-foot'>Your settings are saved on this device.</div>";

  function refresh() {
    panel.querySelectorAll(".alm-a11y-toggle").forEach(function (t) {
      t.setAttribute("aria-pressed", String(!!state[t.getAttribute("data-key")]));
    });
  }

  var open = false;
  function setOpen(v) {
    open = v;
    panel.setAttribute("data-open", v ? "1" : "0");
    btn.setAttribute("aria-expanded", String(v));
    if (v) { var first = panel.querySelector(".alm-a11y-close"); if (first) first.focus(); }
    else { btn.focus(); }
  }

  btn.addEventListener("click", function () { setOpen(!open); });
  panel.querySelector(".alm-a11y-close").addEventListener("click", function () { setOpen(false); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) setOpen(false); });
  doc.addEventListener("click", function (e) { if (open && !panel.contains(e.target) && !btn.contains(e.target)) setOpen(false); });

  panel.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    if (t.classList.contains("alm-a11y-toggle")) {
      var key = t.getAttribute("data-key");
      state[key] = !state[key];
    } else if (t.hasAttribute("data-text")) {
      var dir = t.getAttribute("data-text") === "+" ? 1 : -1;
      state.textStep = Math.max(0, Math.min(TEXT.length - 1, state.textStep + dir));
    } else if (t.classList.contains("alm-a11y-reset")) {
      state = { textStep: 0, contrast: false, links: false, spacing: false, motion: false, cursor: false };
    } else { return; }
    save(); apply(); refresh();
  });

  function mount() {
    doc.head.appendChild(styleEl);
    doc.body.appendChild(btn);
    doc.body.appendChild(panel);
    apply();
  }
  if (doc.body) mount();
  else doc.addEventListener("DOMContentLoaded", mount);
})();
