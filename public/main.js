(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const g = window.gsap, ST = window.ScrollTrigger;
  const motion = root.classList.contains("js-motion") && g && ST;
  
  /* ================= Nav ================= */

  const nav = $("[data-nav]");

  /* ================= Logo tone: follows whatever is under it, moving or not ================= */

  // Like the app's EdgeToneSampler: five points across the wordmark read the colour really
  // under it (a photo counts as dark unless marked data-tone="light"; a coloured box counts by
  // its luminance; transparent layers let the page show through). The majority decides, with a
  // little hysteresis so it never flickers on an edge. Runs on scroll and on every animation frame.
  const lum = (rgb) => {
    const [r, g2, b2] = rgb.match(/[\d.]+/g).slice(0, 3).map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g2 + 0.0722 * b2;
  };
  const alpha = (rgb) => { const p = rgb.match(/[\d.]+/g); return p.length > 3 ? +p[3] : 1; };
  // Photos are read pixel by pixel: each one is drawn once into a small canvas, then the point
  // under the logo is mapped into it (object-fit cover, or the px framing of our framed photos).
  const thumbs = new WeakMap();
  const thumbOf = (img) => {
    let c = thumbs.get(img);
    if (c && c.src === img.currentSrc) return c;
    if (!img.complete || !img.naturalWidth) return null;
    const w = 160, h = Math.max(1, Math.round((160 * img.naturalHeight) / img.naturalWidth));
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = h;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    try { cx.drawImage(img, 0, 0, w, h); c = { cx, w, h, src: img.currentSrc }; } catch { return null; }
    thumbs.set(img, c);
    return c;
  };
  const imgLumAt = (img, x, y) => {
    const t = thumbOf(img);
    if (!t) return null;
    const r = img.getBoundingClientRect();
    let u = (x - r.left) / r.width, v = (y - r.top) / r.height;
    if (getComputedStyle(img).objectFit === "cover") {
      const s = Math.max(r.width / img.naturalWidth, r.height / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      u = (x - r.left - (r.width - dw) / 2) / dw; v = (y - r.top - (r.height - dh) / 2) / dh;
    }
    const px = Math.min(t.w - 2, Math.max(1, Math.round(u * t.w))), py = Math.min(t.h - 2, Math.max(1, Math.round(v * t.h)));
    const d = t.cx.getImageData(px - 1, py - 1, 3, 3).data;
    let sum = 0;
    for (let i = 0; i < d.length; i += 4) sum += lum(`rgb(${d[i]},${d[i + 1]},${d[i + 2]})`);
    return sum / 9;
  };

  // 18 samples (3 rows x 6) across the wordmark. For each candidate colour (white, ink) take the
  // contrast it would get on the weakest quarter of the samples; the better one wins, and only
  // by a clear margin, so a busy photo never makes it flicker.
  const lumAt = (x, y) => {
    const hitEl = document.elementsFromPoint(x, y).find((el) => !nav.contains(el));
    for (let el = hitEl; el; el = el.parentElement) {
      const tone = el.dataset?.tone;
      if (tone) return tone === "dark" ? 0.03 : 0.85;
      if (el.tagName === "IMG") { const l = imgLumAt(el, x, y); return l === null ? 0.1 : l; }
      const cs = getComputedStyle(el);
      if (+cs.opacity < 0.2 || cs.visibility === "hidden") continue;
      if (cs.backgroundImage.includes("url(")) return 0.1;
      const bg = cs.backgroundColor;
      if (bg && alpha(bg) > 0.5) return lum(bg);
    }
    return lum(getComputedStyle(document.body).backgroundColor);
  };
  const quarter = (arr) => arr.sort((p, q) => p - q)[Math.floor(arr.length / 4)];
  let logoDark = null;
  function toneUnderLogo() {
    const b = nav.getBoundingClientRect(), ls = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) ls.push(lumAt(b.left + (b.width * (c + 0.5)) / 6, b.top + (b.height * (r + 0.5)) / 3));
    const white = quarter(ls.map((l) => 1.05 / (l + 0.05))), ink = quarter(ls.map((l) => (l + 0.05) / 0.056));
    const dark = logoDark === null ? white > ink : logoDark ? white * 1.15 > ink : white > ink * 1.15;
    if (dark === logoDark) return;
    logoDark = dark;
    nav.classList.toggle("on-dark", dark);
    nav.classList.toggle("on-light", !dark);
  }
  // At most one reading every 80 ms (18 hit tests each): every frame is too much for a phone
  // while it scrolls, and the logo's colour can trail by a few frames unnoticed.
  let toneQueued = false, toneAt = 0;
  const queueTone = () => {
    if (toneQueued) return;
    toneQueued = true;
    const wait = Math.max(0, toneAt + 80 - performance.now());
    setTimeout(() => requestAnimationFrame(() => { toneQueued = false; toneAt = performance.now(); toneUnderLogo(); }), wait);
  };
  addEventListener("scroll", queueTone, { passive: true });
  addEventListener("resize", queueTone);
  toneUnderLogo();



  /* ================= Liquid Glass: refraction where supported, light that follows the pointer ================= */

  // backdrop-filter: url() (the lens) only renders in Chromium; elsewhere the glass keeps its
  // blur and saturation.
  if (navigator.userAgentData?.brands?.some((b) => /Chromium/.test(b.brand))) root.classList.add("lg-refract");
  $$(".lg").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--lx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--ly", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
    el.addEventListener("pointerleave", () => { el.style.removeProperty("--lx"); el.style.removeProperty("--ly"); });
  });
  // The step capsule's drop of light follows the hovered (or focused) arrow and squishes on press.
  const capsule = $("[data-stepper]");
  $$("[data-step]").forEach((btn) => {
    const side = +btn.dataset.step < 0 ? "up" : "down";
    const on = () => { if (!btn.disabled) capsule.dataset.hover = side; };
    btn.addEventListener("pointerenter", on);
    btn.addEventListener("focus", on);
    btn.addEventListener("pointerdown", () => { capsule.classList.add("is-pressed"); });
  });
  addEventListener("pointerup", () => capsule.classList.remove("is-pressed"));
  capsule.addEventListener("pointerleave", () => { delete capsule.dataset.hover; });
  capsule.addEventListener("focusout", (e) => { if (!capsule.contains(e.relatedTarget)) delete capsule.dataset.hover; });

  /* ================= Idle hint: 10 s on the opening photo without scrolling ================= */

  const hint = $("[data-idle-hint]");
  let hintTimer = 0, hintDone = false;
  const hideHint = () => {
    hintDone = true;
    clearTimeout(hintTimer);
    if (hint.hidden) return;
    hint.classList.remove("is-on");
    setTimeout(() => { hint.hidden = true; }, 1300);
  };
  // The words take their colour from the photo right behind them: the average of those pixels,
  // white on a dark or saturated patch, else a deep shade of the patch's own hue.
  const hintInk = () => {
    const img = $("[data-photo] img"), words = $(".idle-hint__go", hint);
    if (!img || !img.complete || !img.naturalWidth) return;
    const r = img.getBoundingClientRect(), w = words.getBoundingClientRect();
    const k = img.naturalWidth / r.width, kh = img.naturalHeight / r.height;
    const sx = Math.max(0, (w.left - r.left) * k), sy = Math.max(0, (w.top - 12 - r.top) * kh);
    const sw = Math.min(img.naturalWidth - sx, (w.width) * k), sh = Math.min(img.naturalHeight - sy, (w.height + 24) * kh);
    if (sw <= 0 || sh <= 0) return;
    try {
      const c = document.createElement("canvas"); c.width = c.height = 12;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 12, 12);
      const d = ctx.getImageData(0, 0, 12, 12).data;
      let R = 0, G = 0, B = 0;
      for (let i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; }
      const n = d.length / 4; R /= n * 255; G /= n * 255; B /= n * 255;
      const lin = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      const L = 0.2126 * lin(R) + 0.7152 * lin(G) + 0.0722 * lin(B);
      const max = Math.max(R, G, B), min = Math.min(R, G, B);
      let h = 0;
      if (max !== min) {
        const dd = max - min;
        h = max === R ? ((G - B) / dd) % 6 : max === G ? (B - R) / dd + 2 : (R - G) / dd + 4;
        h = (h * 60 + 360) % 360;
      }
      const sat = max === min ? 0 : (max - min) / (1 - Math.abs(max + min - 1));
      // Contrast against white beats contrast against black below about L 0.18.
      const light = L >= 0.18;
      hint.style.setProperty("--hint-ink", light ? `hsl(${h.toFixed(0)} ${Math.min(60, sat * 100).toFixed(0)}% 13%)` : "#fff");
      hint.style.setProperty("--hint-veil", light ? "rgb(255 255 255 / .5)" : "rgb(14 15 12 / .32)");
    } catch { /* an unreadable image: keep white */ }
  };
  const showHint = () => {
    if (hintDone || scrollY > 4) return;
    hint.hidden = false;
    hintInk();
    requestAnimationFrame(() => requestAnimationFrame(() => hint.classList.add("is-on")));
  };
  addEventListener("resize", () => { if (!hint.hidden) hintInk(); }, { passive: true });
  hintTimer = setTimeout(showHint, 10000);
  ["wheel", "touchmove", "keydown"].forEach((ev) => addEventListener(ev, hideHint, { passive: true, once: true }));
  addEventListener("scroll", () => { if (scrollY > 4) hideHint(); }, { passive: true });
  // A message, not a control: it takes no touch, and the page never scrolls by itself.

  /* ================= Peeling stickers: the scroll cue, and the sports that have a lifting corner ================= */
  // The app's EmptyStateSticker geometry: the top-right corner folds back along the line halfway
  // between the box's corner and where the corner lands (paper folding). The face is cut along that
  // line; beyond it the sticker shows its back, mirrored over the face (the flap: the same rounded
  // shape, in paper grey). Under the pointer, the corner lifts and leans toward it. Springs, no
  // overshoot. r is the corner radius; rest, hover and lean are in px (depth of the fold at rest and
  // under the pointer, how far the corner follows the pointer); arrive is the depth it starts from.
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const peelSticker = (el, face, flap, { r, rest, hover, lean, arrive = rest }) => {
    // How far the shape sits from the box's corner, along the diagonal: where a fold catches paper.
    const REACH = r * Math.SQRT2 - r;
    const IN = [-Math.SQRT1_2, Math.SQRT1_2];
    const st = { d: still ? rest : arrive, dv: 0, dt: rest, x: 0, y: 0, xv: 0, yv: 0, xt: 0, yt: 0, k: 40 };
    const width = () => el.offsetWidth || 2 * r;
    const halfPlane = (mx, my, nx, ny) => {
      const F = 1000, p = (s, t) => `${(mx - ny * s + nx * t).toFixed(2)}px ${(my + nx * s + ny * t).toFixed(2)}px`;
      return `polygon(${p(-F, 0)}, ${p(F, 0)}, ${p(F, F)}, ${p(-F, F)})`;
    };
    const draw = () => {
      const len0 = 2 * (REACH + st.d);
      let vx = IN[0] * len0 + st.x, vy = IN[1] * len0 + st.y;
      // Pushed back toward its corner, it stays a little loose.
      const along = vx * IN[0] + vy * IN[1], least = 2 * (REACH + 2);
      if (along < least) { vx += IN[0] * (least - along); vy += IN[1] * (least - along); }
      const len = Math.hypot(vx, vy), nx = vx / len, ny = vy / len;
      const mx = width() + vx / 2, my = vy / 2, o = 2 * (mx * nx + my * ny);
      face.style.clipPath = halfPlane(mx, my, nx, ny);
      flap.style.clipPath = halfPlane(mx, my, -nx, -ny);
      flap.style.transform = `matrix(${1 - 2 * nx * nx}, ${-2 * nx * ny}, ${-2 * nx * ny}, ${1 - 2 * ny * ny}, ${o * nx}, ${o * ny})`;
    };
    let raf = 0, last = 0;
    const step = (t) => {
      const dt = Math.min((t - (last || t)) / 1000, 1 / 30); last = t;
      const c = 2 * Math.sqrt(st.k);
      st.dv += (st.k * (st.dt - st.d) - c * st.dv) * dt; st.d += st.dv * dt;
      st.xv += (st.k * (st.xt - st.x) - c * st.xv) * dt; st.x += st.xv * dt;
      st.yv += (st.k * (st.yt - st.y) - c * st.yv) * dt; st.y += st.yv * dt;
      draw();
      const moving = Math.abs(st.dt - st.d) + Math.abs(st.xt - st.x) + Math.abs(st.yt - st.y) + Math.abs(st.dv) + Math.abs(st.xv) + Math.abs(st.yv) > 0.01;
      raf = moving ? requestAnimationFrame(step) : 0;
      if (!moving) last = 0;
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(step); };
    const sticker = { st, go, hovering: false };
    draw();
    el.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      sticker.hovering = true;
      const b = el.getBoundingClientRect(), w = width();
      // Where the corner lands at hover depth, then a lean toward the pointer, rubber-banded.
      const l = 2 * (REACH + hover), qx = w + IN[0] * l, qy = IN[1] * l;
      const dx = (e.clientX - b.left) * (w / b.width) - qx, dy = (e.clientY - b.top) * (w / b.width) - qy;
      const dist = Math.hypot(dx, dy), k = dist ? lean / (dist + lean) : 0;
      Object.assign(st, { dt: hover, xt: dx * k, yt: dy * k, k: 120 });
      go();
    });
    el.addEventListener("pointerleave", () => {
      sticker.hovering = false;
      Object.assign(st, { dt: rest, xt: 0, yt: 0, k: 60 });
      go();
    });
    return sticker;
  };

  // The scroll cue: a round sticker. It arrives half peeled (in step with the CSS cue-in) and is
  // pressed down onto the photo; now and then the corner lifts a little, a slow reminder.
  {
    const cueEl = $(".scrollcue");
    const cue = peelSticker(cueEl, $(".scrollcue__face", cueEl), $(".scrollcue__flap", cueEl), { r: 30, rest: 6, hover: 9, lean: 9, arrive: 26 });
    if (!still) setTimeout(() => { cue.st.k = 70; cue.go(); }, 950);
    if (!still) {
      setInterval(() => {
        if (cue.hovering || document.hidden || scrollY > innerHeight) return;
        Object.assign(cue.st, { dt: 11, k: 18 }); cue.go();
        setTimeout(() => { if (!cue.hovering) { Object.assign(cue.st, { dt: 6, k: 22 }); cue.go(); } }, 1100);
      }, 7000);
    }
  }

  // The step arrows keep away from the opening; they show once the photo has landed.
  const stepper = $("[data-stepper]");
  let stepperFrom = () => innerHeight * 0.5;
  // It never rises with the footer: it stays at the bottom of the screen.
  // And it never hides a word or a button: if its place covers something it steps aside.
  const OBSTACLES = ".hero__title, .hero__note, .hero .store, .cap h2, .cap p, .acts, .composer, .psheet__foot, .statement__text, .sports__title, .tempo__lockup, .tempo__lead, .perk h3, .perk p, .join__title, .join__lead, .store, .foot__row p, .foot__links a";
  const shown = (el) => { for (let n = el; n && n !== document.body; n = n.parentElement) { const s = getComputedStyle(n); if (+s.opacity < 0.05 || s.visibility === "hidden" || s.display === "none") return false; } return true; };
  // Text is tested line by line (a paragraph's box is wider than its words).
  const boxesOf = (el) => {
    if (/^(P|H1|H2|H3|SPAN)$/.test(el.tagName) && !el.querySelector("svg, img")) {
      const r = document.createRange(); r.selectNodeContents(el); return [...r.getClientRects()];
    }
    return [el.getBoundingClientRect()];
  };
  const covers = (bottom) => {
    const w = stepper.offsetWidth, h = stepper.offsetHeight, right = innerWidth - parseFloat(getComputedStyle(stepper).right);
    const box = { left: right - w - 8, right: right + 8, top: innerHeight - bottom - h - 8, bottom: innerHeight - bottom + 8 };
    // The sport names are not obstacles: they slide by all the time, so the arrows would hop and blink.
    // They pass under the glass, which blurs and veils them, and the arrows stay.
    return $$(OBSTACLES).some((el) => {
      const b = el.getBoundingClientRect();
      if (b.bottom < box.top || b.top > box.bottom || b.right < box.left || b.left > box.right || !shown(el)) return false;
      return boxesOf(el).some((r) => r.width && r.right > box.left && r.left < box.right && r.bottom > box.top && r.top < box.bottom);
    });
  };
  const placeStepper = () => {
    const away = !(scrollY >= stepperFrom());
    const free = away || !covers(20);
    stepper.classList.toggle("is-away", away || !free);
  };
  // Touch screens never show the arrows (see the CSS): no need to place them on every scroll.
  if (!matchMedia("(pointer: coarse)").matches) {
    addEventListener("resize", placeStepper);
    addEventListener("scroll", placeStepper, { passive: true });
  }

  /* ================= Sentence starts never hang ================= */

  // The first word of a sentence never ends a line on its own: it is tied to the next word
  // with a no-break space, so the new sentence always starts at the beginning of the line.
  // Works across inline markup (a sentence can start with the bold "drafft tempo").
  const glue = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let pending = false, seenWord = false;
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      let out = "";
      for (const part of n.textContent.split(/([ \t\n]+)/)) {
        if (!part) continue;
        if (/^[ \t\n]+$/.test(part)) {
          if (pending && seenWord) { out += "\u00a0"; pending = false; seenWord = false; continue; }
          out += part;
          continue;
        }
        if (pending) seenWord = true;
        if (/[.!?:;]\u00a0?$/.test(part) || /[.!?]["”»’)]?$/.test(part)) { pending = true; seenWord = false; }
        out += part;
      }
      // A compound word ("rendez-vous") never breaks at its hyphen: it becomes a no-break hyphen,
      // and fit() shrinks a heading when the whole word doesn't fit on a line.
      out = out.replace(/(\p{L})-(?=\p{L})/gu, "$1\u2011");
      n.textContent = out;
    }
  };
  $$("h1, h2, h3, p").forEach(glue);

  /* ================= Fit headings ================= */

  // Longer languages have longer words ("rendez-vous", "Wingfoil"). A heading steps its size
  // down until no word sticks out and it stays within its height budget.
  const shrink = (el, start, maxH) => {
    let size = start;
    el.style.fontSize = `${size}px`;
    for (let i = 0; i < 40 && size > 18 && (el.scrollWidth > el.clientWidth + 1 || el.offsetHeight > maxH); i++) {
      size *= 0.96;
      el.style.fontSize = `${size}px`;
    }
    return size;
  };
  // Phones (portrait) stack the texts above the app's screen. The screen's size and place depend
  // on the viewport only: its used area (70 to 760 pt of the 852 pt frame) takes 58% of the
  // hero's height, anchored 16 px above the bottom. The texts get the room above it.
  const isStacked = () => innerWidth <= 860 && innerHeight >= innerWidth;
  const CONTENT_TOP = 70, CONTENT_BOTTOM = 760;
  let stackShare = 0.58; // part of the hero's height the screen takes; fit() lowers it on short phones
  let stackLift = 0;     // px the stack is raised for the headline step (base of the landing)
  let capLifts = [];     // the same for each story caption: each step is centred on its own
  // The hero is as tall as the screen with the toolbar folded away (lvh); the screen is placed in
  // the part always visible (svh, measured on a probe), the extra room stays below it.
  const svhProbe = document.createElement("div");
  svhProbe.style.cssText = "position:absolute;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
  document.body.append(svhProbe);
  const stackFrame = (lift = stackLift) => {
    const heroEl = $("[data-hero]"), ph = $("[data-phone]").offsetHeight, H = heroEl.offsetHeight, pt = ph / 852;
    const V = Math.min(H, svhProbe.offsetHeight);
    const scale = Math.min(0.95, (stackShare * V) / ((CONTENT_BOTTOM - CONTENT_TOP) * pt));
    const contentTop = V - 16 - lift - (CONTENT_BOTTOM - CONTENT_TOP) * pt * scale;
    return { scale, y: contentTop - CONTENT_TOP * pt * scale - (H / 2 - (ph * scale) / 2), textBottom: contentTop - 20 };
  };
  const bottomOf = (el, stop) => { let y = el.offsetHeight; for (let n = el; n && n !== stop; n = n.offsetParent) y += n.offsetTop; return y; };
  const fit = () => {
    // The texts on the left of the phone (headline and story captions) share one size:
    // the largest that fits all of them.
    const side = $$(".hero__title, .cap h2");
    side.forEach((el) => { el.style.fontSize = ""; });
    const start = parseFloat(getComputedStyle($(".hero__title")).fontSize);
    let size = Math.min(...side.map((el) => shrink(el, start, innerHeight * 0.4)));
    side.forEach((el) => { el.style.fontSize = `${size}px`; });
    // Stacked on a phone: shrink them together until every block (headline, store buttons and
    // intro; each caption) ends above the screen.
    // Stacked on a phone, the texts sit right above the screen: each block (headline + stores +
    // intro; each caption) is bottom-aligned 20 px above the screen's content (--text-gap), so the
    // free room goes above the words, not between them and the app. They only shrink (never below
    // 26 px) when their top would reach the wordmark; failing that the screen gives up height.
    stackShare = 0.58;
    stackLift = 0;
    const heroEl = $("[data-hero]");
    heroEl.style.removeProperty("--text-gap");
    $(".hero__right").style.removeProperty("--lift");
    $$(".cap").forEach((c) => c.style.removeProperty("--lift"));
    if (isStacked()) {
      const start = size;
      const ceiling = () => parseFloat(getComputedStyle(heroEl).paddingTop);
      const highest = () => Math.min(...[".hero__left", ".cap h2"].flatMap((s) => $$(s)).map((el) => bottomOf(el, heroEl) - el.offsetHeight));
      const apply = (s) => side.forEach((el) => { el.style.fontSize = `${s}px`; });
      for (; stackShare >= 0.4; stackShare -= 0.01) {
        heroEl.style.setProperty("--text-gap", `${heroEl.offsetHeight - stackFrame().textBottom}px`);
        size = start; apply(size);
        for (let i = 0; i < 30 && size > 26 && highest() < ceiling(); i++) { size = Math.max(26, size * 0.95); apply(size); }
        if (highest() >= ceiling()) break;
      }
      // Centre each step on its own: its text block and the screen sit together in the middle, the
      // room left split evenly above the words and below the screen. The texts are bottom-aligned
      // on the unlifted limit (--text-gap) and raised by their own --lift; the screen follows the
      // lift of the step on show (see settle() and the story timeline).
      const topOf = (el) => bottomOf(el, heroEl) - el.offsetHeight;
      const base = stackFrame(0).textBottom, room = base - ceiling();
      const liftFor = (h) => Math.max(0, (room - h) / 2);
      heroEl.style.setProperty("--text-gap", `${heroEl.offsetHeight - base}px`);
      stackLift = liftFor(bottomOf($(".hero__right"), heroEl) - topOf($(".hero__left")));
      capLifts = $$(".cap").map((c) => liftFor(bottomOf(c.querySelector("p"), heroEl) - topOf(c.querySelector("h2"))));
      $(".hero__right").style.setProperty("--lift", `${stackLift}px`);
      $$(".cap").forEach((c, i) => c.style.setProperty("--lift", `${capLifts[i]}px`));
    } else {
      stackLift = 0; capLifts = [];
      $(".hero__right").style.removeProperty("--lift");
      $$(".cap").forEach((c) => c.style.removeProperty("--lift"));
    }
    $$(".sports__title, .join__title").forEach((el) => {
      el.style.fontSize = "";
      shrink(el, parseFloat(getComputedStyle(el).fontSize), Infinity);
    });
  };
  fit();
  document.fonts?.ready.then(() => { if (window.ScrollTrigger && root.classList.contains("js-motion")) window.ScrollTrigger.refresh(); else fit(); });
  let fitTimer;
  // Re-fitting can move the screen on phones (the texts' room changes): re-measure after it, so
  // the photo always lands where the card really is.
  // With the scroll story running, fitting happens right after ScrollTrigger's refresh (see the
  // "refresh" listener by the story): only then does the pinned hero carry its new size, so the
  // texts are measured at the new size. Without it (static page), a plain debounced resize.
  // On touch screens a height-only resize is the browser's toolbar showing or hiding while the
  // page scrolls (iOS Safari): the layout never depends on it (100svh), so nothing is redone.
  // Refreshing there would re-measure the pinned story mid-scroll and make the page jump.
  const coarse = matchMedia("(pointer: coarse)").matches;
  let lastW = innerWidth;
  addEventListener("resize", () => {
    if (coarse && innerWidth === lastW) return;
    lastW = innerWidth;
    clearTimeout(fitTimer);
    fitTimer = setTimeout(() => { if (window.ScrollTrigger && root.classList.contains("js-motion")) window.ScrollTrigger.refresh(); else fit(); }, 150);
  });

  /* ================= Word splitting ================= */

  // Wraps each word of a text-only element in a mask so it can rise out of it.
  function split(el, cls = "w") {
    // Split on real spaces only: a no-break space keeps its two words together.
    const words = el.textContent.trim().split(/[ \t\n]+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = words.map((w) => `<span class="${cls}" aria-hidden="true"><span>${w}</span></span>`).join(" ");
    return $$(`.${cls} > span`, el);
  }

  // Ink fill keeps inline markup (the brand name) intact: only text nodes are split.
  function splitFill(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/([ \t\n]+)/).forEach((part) => {
            if (!part) return;
            if (/^[ \t\n]+$/.test(part)) { frag.append(part); return; }
            const s = document.createElement("span");
            s.className = "f";
            s.textContent = part;
            frag.append(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    return $$(".f", el);
  }

  /* ================= Photo framing ================= */

  // Every photo carries where its person stands (data-box: left, top, right, bottom in %) and
  // its natural size. Two framings, blended by `w`:
  // - full screen (w = 0): cover the box, the person centred as far as the edges allow;
  // - card (w = 1): the whole person, about 80% of the card's height, head just under the name
  //   line, zooming in when the person is small in the frame (never past 2.2x the cover scale).
  const lerpN = (a, b, k) => a + (b - a) * k;
  const frameBox = (img, bw, bh, w = 1, zoom = true) => {
    const W = +img.dataset.w, H = +img.dataset.h;
    if (!W || !bw || !bh || !img.dataset.box) return null;
    const [x0, y0, x1, y1] = img.dataset.box.split(",").map((v) => v / 100);
    const cover = Math.max(bw / W, bh / H);
    const fit = (0.8 * bh) / ((y1 - y0) * H);
    const s = zoom ? lerpN(cover, Math.min(Math.max(cover, fit), cover * 2.2), w) : cover;
    const rw = W * s, rh = H * s;
    const left = Math.min(Math.max(bw / 2 - ((x0 + x1) / 2) * rw, bw - rw), 0);
    const centred = bh / 2 - ((y0 + y1) / 2) * rh, headroom = 0.17 * bh - y0 * rh;
    const top = Math.min(Math.max(lerpN(centred, headroom, w), bh - rh), 0);
    return { left, top, rw, rh };
  };
  const frame = (img, bw, bh, w) => {
    const b = frameBox(img, bw, bh, w);
    if (!b) return;
    const st = img.style;
    st.position = "absolute"; st.maxWidth = "none"; st.objectFit = "fill";
    st.left = `${b.left}px`; st.top = `${b.top}px`; st.width = `${b.rw}px`; st.height = `${b.rh}px`;
  };
  // Portraits drawn as plain covers (the match screen's pair): only the crop moves.
  const aim = (img) => {
    const b = frameBox(img, img.offsetWidth, img.offsetHeight, 1, false);
    if (b) img.style.objectPosition = `${b.left}px ${b.top}px`;
  };
  const cardImg = $("[data-card-img]");
  const frameAll = () => {
    $$("[data-card-img], [data-d1-img], [data-d2-img], [data-d3-img]").forEach((img) => {
      const c = img.parentElement;
      frame(img, c.offsetWidth, c.offsetHeight, 1);
    });
    $$(".mv__me, .mv__them").forEach(aim);
  };
  frameAll();
  addEventListener("resize", frameAll);

  if (!motion) {
    root.classList.remove("js-motion");
    finish();
    return;
  }

  /* ================= Smooth scroll ================= */

  g.registerPlugin(ST);
  // Same rule inside ScrollTrigger: the toolbar's height changes never trigger a refresh.
  ST.config({ ignoreMobileResize: true });
  g.ticker.add(queueTone);
  // A pile can be one card short (see i18n.js): its tweens then simply have nothing to move.
  g.config({ nullTargetWarn: false });
  const lenis = window.Lenis ? new Lenis({ lerp: 0.1, wheelMultiplier: 1 }) : null;
  window.__lenis = lenis;
  if (lenis) {
    lenis.on("scroll", ST.update);
    g.ticker.add((t) => lenis.raf(t * 1000));
    g.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const target = $(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      // The story lives inside the pinned hero: jump to where its first caption shows.
      const y = a.getAttribute("href") === "#story" ? innerHeight * 0.9 : target;
      lenis.scrollTo(y, { duration: 1.4 });
    }));
  }

  /* ================= Hero: a full-bleed photo that turns out to be the phone's top card ================= */

  const hero = $("[data-hero]");
  const scene = $("[data-scene]");
  const phone = $("[data-phone]");
  const photo = $("[data-photo]");
  const photoImg = $("img", photo);
  const photoScrim = $("[data-photo-scrim]", photo);
  const cue = $("[data-scrollcue]");
  // Fade the glass button itself, never its wrapper: an ancestor's opacity cuts the backdrop blur.
  const cueBtn = $(".scrollcue", cue);
  const card = $("[data-card]");
  const info = $$(".card__top, .card__chips", card);
  const titleWords = split($(".hero__title"));
  // Same rule as the CSS: portrait phones and tablets stack; landscape phones keep the columns.
  const mobile = isStacked;

  g.set(titleWords, { yPercent: 110 });
  g.set(info, { autoAlpha: 0, y: 16 });



  // Geometry of the top card at rest (scale 1, no tilt), relative to the pinned hero.
  let m = null;
  const measure = () => {
    const prevScene = scene.style.transform;
    scene.style.transform = "none";
    // On phones the screen is settled (scaled, moved under the texts) from the start, so the
    // photo lands where the card will stay: measure the card with that transform on.
    g.set(phone, settle());
    const h = hero.getBoundingClientRect(), c = card.getBoundingClientRect(), s = scene.getBoundingClientRect();
    m = {
      W: h.width, H: h.height,
      cx: c.left - h.left + c.width / 2, cy: c.top - h.top + c.height / 2,
      w: c.width, h: c.height,
      PH: photo.offsetHeight,
      r: parseFloat(getComputedStyle(card).borderTopLeftRadius) || 20,
      // the action row (like, pass…): the photo keeps clear of it while it pulls back
      aTop: $(".acts").getBoundingClientRect().top - h.top,
      // what this geometry depends on: if any of it changes, measure again (see layout)
      key: `${hero.offsetHeight}|${phone.offsetHeight}|${hero.style.getPropertyValue("--text-gap")}`,
    };
    m.S0 = Math.max(m.PH / m.h, m.W / m.w) * 1.04;
    scene.style.transformOrigin = `${c.left + c.width / 2 - s.left}px ${c.top + c.height / 2 - s.top}px`;
    scene.style.transform = prevScene;
    frameAll();
  };

  // t = 0: the photo fills the screen. t = 1: it sits exactly on the card, in the phone at rest.
  const zoom = { t: 0 };
  const lerp = (a, b, k) => a + (b - a) * k;
  const layout = () => {
    if (!m) return;
    if (m.key !== `${hero.offsetHeight}|${phone.offsetHeight}|${hero.style.getPropertyValue("--text-gap")}`) measure();
    const t = zoom.t;
    const s = Math.pow(m.S0, 1 - t);          // exponential: reads as a steady pull-back
    const k = (s - 1) / (m.S0 - 1);           // 1 at the start, 0 at rest
    const dx = (m.W / 2 - m.cx) * k, dy = (m.H / 2 - m.cy) * k;
    g.set(scene, { scale: s, x: dx, y: dy });
    // The photo keeps the full screen through the first quarter of the pull-back, then eases
    // into the card's frame over the rest of it (smootherstep): late, long and without a jolt.
    // Start where the card's framing becomes smaller than the full-screen one, so the image only
    // ever shrinks (no swell before the pull-back).
    const full0 = frameBox(photoImg, m.W, m.PH, 0), card0 = frameBox(photoImg, m.w, m.h, 1);
    const ratio = full0 && card0 ? full0.rw / card0.rw : 1;
    const t0 = Math.min(Math.max(1 - Math.log(Math.max(ratio, 1.0001)) / Math.log(m.S0), 0.25), 0.85);
    const u = Math.min(Math.max((t - t0) / (1 - t0), 0), 1);
    const w = u * u * u * (u * (u * 6 - 15) + 10);
    const cw = m.w * s, ch = m.h * s, cx = m.cx + dx, cy = m.cy + dy;
    // The photo's bottom edge never comes within 16 px of the action buttons: they move with the
    // scene (scaled about the card's centre, then shifted), and the frame stops above them.
    const actsTop = m.cy + (m.aTop - m.cy) * s + dy;
    const bx = lerp(0, cx - cw / 2, w), by = lerp(0, cy - ch / 2, w);
    const bw = lerp(m.W, cw, w), bh = Math.min(lerp(m.PH, ch, w), actsTop - 16 - by);
    // The frame is a clip on the full-hero layer and the image moves by transform only: nothing
    // is laid out again while scrolling, so the pull-back stays on the GPU (smooth on phones).
    photo.style.clipPath = `inset(${by}px ${m.W - bx - bw}px ${m.PH - by - bh}px ${bx}px round ${m.r * s * w}px)`;
    // The card's vignette grows in with the frame, following it, so it never appears all at once at the handover.
    photoScrim.style.transform = `translate(${bx}px, ${by}px) scale(${bw / m.W}, ${bh / m.PH})`;
    photoScrim.style.opacity = w;
    // A camera pull-back, not a re-crop: the image's rectangle on screen glides from its
    // full-screen framing to exactly where it sits inside the card (which itself moves with the
    // scene), while the frame above closes around it. Both are linear in w, so the image always
    // covers the frame, keeps its proportions and never jumps.
    const full = frameBox(photoImg, m.W, m.PH, 0), inCard = frameBox(photoImg, m.w, m.h, 1);
    if (full && inCard) {
      const ix = lerp(full.left, cx - cw / 2 + inCard.left * s, w);
      const iy = lerp(full.top, cy - ch / 2 + inCard.top * s, w);
      const iw = lerp(full.rw, inCard.rw * s, w);
      const st2 = photoImg.style, size = `${full.rw}px`;
      if (st2.width !== size) {
        st2.position = "absolute"; st2.maxWidth = "none"; st2.left = "0px"; st2.top = "0px";
        st2.width = size; st2.height = `${full.rh}px`; st2.transformOrigin = "0 0";
      }
      st2.transform = `translate3d(${ix}px, ${iy}px, 0) scale(${iw / full.rw})`;
    }
    // Once it lands, the card underneath (same image, same crop) takes over.
    photo.style.visibility = t >= 0.999 ? "hidden" : "visible";
    queueTone();
  };

  // Load: the photo settles in (the scroll cue's entrance is CSS, so it never flashes). It runs on
  // the frame layer, the image's own transform belongs to the pull-back (see layout).
  g.timeline({ defaults: { ease: "expo.out" } })
    .fromTo(photo, { scale: 1.12, filter: "blur(18px)" }, { scale: 1, filter: "blur(0px)", duration: 2, clearProps: "scale,filter" }, 0);
  root.classList.remove("is-booting");

  const caps = $$("[data-cap]");
  const cssVar = (n) => getComputedStyle(root).getPropertyValue(n).trim();
  const accent = cssVar("--accent"), onAccent = cssVar("--on-accent");
  // Screens start where the app starts: Discover up, the rest waiting off stage.
  g.set("[data-matchview]", { autoAlpha: 0 });
  g.set("[data-chat]", { autoAlpha: 0 });
  g.set("[data-session-wrap]", { height: 0, marginTop: 0, autoAlpha: 0 });
  g.set("[data-sheet]", { autoAlpha: 0, y: 40 });
  g.set("[data-stamp]", { autoAlpha: 0, scale: 0.8 });
  g.set(".mv__formation", { autoAlpha: 0 });
  caps.forEach((c) => g.set(c, { y: 40, filter: "blur(10px)" }));
  const capIn = { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" };
  const capOut = { autoAlpha: 0, y: -40, filter: "blur(10px)", duration: 0.5, ease: "power2.in" };
  // No tilt, no 3D: on phones the screen only steps down and shrinks to make room for the text.
  // On phones the screen fills exactly the room the texts leave: below the lowest of the hero copy
  // and every caption (their real heights, any language), above the bottom edge.

  // Phones: the fixed frame from stackFrame() (the texts adapt to it, not the other way round).
  const settle = () => {
    if (!mobile()) return { scale: 1, y: 0 };
    const { scale, y } = stackFrame();
    return { scale, y };
  };
  // The screen's y for caption i on phones (desktop: 0; -1 = the headline step). Each move in the
  // story goes explicitly from the previous step's y to the next one's, so scrolling back or a
  // re-measure never leaves the screen at another step's height.
  const settleY = (i) => (mobile() ? stackFrame(i < 0 ? stackLift : capLifts[i] ?? stackLift).y : 0);


  // Phones get a shorter run: the same story in less thumb travel. The pull-back is short
  // (1.2 of the timeline's units): the first flick of the wheel already sets the zoom going.
  // Measured on the hero (svh/lvh), not innerHeight: the length stays put while a phone's
  // toolbar shows and hides.
  const run = () => hero.offsetHeight * (mobile() ? 6 : 7.85);
  // Pinned by CSS, not by ScrollTrigger: the hero is sticky inside a runway as tall as itself
  // plus the story. The browser keeps it in place on its own compositor, so it never lags a
  // frame behind a phone's momentum scroll (a JS pin jitters there, above all as it lets go).
  const runway = document.createElement("div");
  runway.className = "hero-run";
  hero.before(runway);
  runway.append(hero);
  const sizeRunway = () => { runway.style.height = `${hero.offsetHeight + run()}px`; };
  sizeRunway();
  ST.addEventListener("refreshInit", sizeRunway);

  const story = g.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: runway,
      // The hero opens the page: the story starts at 0. Measured ("top top"), a refresh made deep
      // in the story (a resize) could read a negative start and shift every step.
      start: 0,
      end: () => "+=" + run(),
      // A finger drives the page directly (with its own momentum): a short catch-up keeps the
      // story under the thumb instead of trailing behind it. The wheel keeps the longer glide.
      scrub: coarse ? 0.3 : 0.9,
      invalidateOnRefresh: true,
      onRefreshInit: () => { m = null; },
      onRefresh: () => { measure(); layout(); },
    },
  });
  story
    // 1. Pull back: the photo shrinks onto the top card, the phone appears around it.
    .fromTo(cueBtn, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 12, duration: 0.3, immediateRender: false }, 0)
    .to(zoom, { t: 1, duration: 1.2, ease: "none", onUpdate: layout }, 0)
    .fromTo(info, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 1.2)

    // 2. The screen settles; the headline arrives beside it.
    // (the screen is already settled: see measure)
    .fromTo("[data-hero-copy]", { autoAlpha: 0, y: 30, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power3.out" }, 1)
    .to(titleWords, { yPercent: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 1.1)
    .to({}, { duration: 0.8 }, 1.9)

    // 3. Like: the button presses, the LIKE stamp lands, the card flies off, the pile steps up.
    .to("[data-hero-copy]", { autoAlpha: 0, y: -50, filter: "blur(10px)", duration: 0.6, stagger: 0.05, ease: "power2.in" }, 3.4)
    .fromTo(phone, { y: () => settleY(-1) }, { y: () => settleY(0), duration: 0.5, ease: "power2.inOut", immediateRender: false }, 3.75)
    .to(caps[0], capIn, 4.15)
    .to("[data-like]", { scale: 0.9, duration: 0.15, ease: "power2.out" }, 4.6)
    .to("[data-like]", { scale: 1.18, duration: 0.25, ease: "power2.out" }, 4.75)
    .to("[data-stamp]", { autoAlpha: 1, scale: 1.05, duration: 0.3, ease: "back.out(2)" }, 4.7)
    .to(card, { x: "6%", rotation: 3, scale: 0.94, autoAlpha: 0, transformOrigin: "50% 100%", duration: 0.35, ease: "power1.in" }, 4.95)
    .to("[data-like]", { scale: 1, duration: 0.3 }, 5.1)
    .to("[data-d1]", { y: 0, scale: 1, duration: 0.55, ease: "power3.out" }, 5.25)
    .to("[data-d1-veil]", { opacity: 0, duration: 0.55 }, 5.25)
    .to("[data-d2]", { y: "14em", scale: 0.93, duration: 0.55, ease: "power3.out" }, 5.25)
    .to("[data-d2-veil]", { opacity: 0.55, duration: 0.55 }, 5.25)
    // The fourth card rises into the empty slot at the back, as the pile refills in the app
    .fromTo("[data-d3]", { autoAlpha: 0, y: "40em", scale: 0.8 }, { autoAlpha: 1, y: "28em", scale: 0.86, duration: 0.7, ease: "power3.out" }, 5.4)
    .to(caps[0], capOut, 5.3)

    // 4. It's a match: the full-screen cover slides up, the pair and the heart fall into place.
    // The pile clears first, then the match takes the stage: never both at once.
    .to("[data-discover]", { autoAlpha: 0, duration: 0.15, ease: "power1.in" }, 5.5)
    .to("[data-matchview]", { autoAlpha: 1, duration: 0.18, ease: "power1.out" }, 5.7)
    .fromTo(".mv__formation", { autoAlpha: 0, y: -24, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, 5.85)
    .fromTo("[data-heart]", { scale: 0.2 }, { scale: 1, duration: 0.5, ease: "back.out(2.4)" }, 6.05)
    .fromTo(phone, { y: () => settleY(0) }, { y: () => settleY(1), duration: 0.5, ease: "power2.inOut", immediateRender: false }, 5.5)
    .to(caps[1], capIn, 5.9)
    .to("[data-sayhi]", { scale: 0.97, duration: 0.15, ease: "power2.out" }, 7.7)
    .to("[data-sayhi]", { scale: 1, duration: 0.2 }, 7.85)
    .to(caps[1], capOut, 7.9)

    // 5. Straight to the proposal: the chat, then the propose sheet over it.
    .to("[data-matchview]", { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, 8)
    .set("[data-discover]", { autoAlpha: 0 }, 8.1)
    .to("[data-sheet]", { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out" }, 8.35)
    .fromTo(phone, { y: () => settleY(1) }, { y: () => settleY(2), duration: 0.5, ease: "power2.inOut", immediateRender: false }, 8.1)
    .to(caps[2], capIn, 8.5)
    // Pick Running…
    .to("[data-tile]", { backgroundColor: accent, color: onAccent, "--tile": accent, duration: 0.25, ease: "none" }, 8.9)
    .to("[data-tile] .tile__ic", { backgroundColor: "rgba(255,255,255,0.22)", duration: 0.25, ease: "none" }, 8.9)
    .to("[data-tile-check]", { backgroundColor: onAccent, color: accent, boxShadow: "inset 0 0 0 0em rgba(14,15,12,0)", duration: 0.25, ease: "none" }, 8.9)
    // …then a time: the add card turns into Tue 29, 7:00 and the send button wakes up.
    .to("[data-slot-add]", { autoAlpha: 0, scale: 0.9, duration: 0.3 }, 9.3)
    .fromTo("[data-slot-time]", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 9.35)
    .to("[data-slot-next]", { autoAlpha: 1, duration: 0.3 }, 9.5)
    .to("[data-recap-none]", { autoAlpha: 0, duration: 0.2 }, 9.4)
    .to("[data-recap-time]", { autoAlpha: 1, duration: 0.2 }, 9.45)
    .to("[data-send]", { opacity: 1, duration: 0.25, ease: "none" }, 9.5)
    .to("[data-send]", { scale: 0.97, duration: 0.15, ease: "power2.out" }, 9.9)
    .to("[data-send]", { scale: 1, duration: 0.25 }, 10.05)
    .to("[data-send-label]", { opacity: 0, duration: 0.25, ease: "none" }, 10.05)
    .to("[data-send-done]", { opacity: 1, duration: 0.25, ease: "none" }, 10.1)
    .to(caps[2], capOut, 10.3)

    // 6. Sent: the sheet goes, the invite sits in the chat, Léa confirms.
    .to("[data-sheet]", { autoAlpha: 0, y: 30, duration: 0.45, ease: "power2.in" }, 10.4)
    .to("[data-chat]", { autoAlpha: 1, duration: 0.35, ease: "power1.out" }, 10.8)
    .to("[data-session-wrap]", { height: "auto", marginTop: "8em", autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 10.9)
    .fromTo(phone, { y: () => settleY(2) }, { y: () => settleY(3), duration: 0.5, ease: "power2.inOut", immediateRender: false }, 10.5)
    .to(caps[3], capIn, 10.9)
    .to("[data-pill-wait]", { autoAlpha: 0, duration: 0.25 }, 11.5)
    .to("[data-pill-ok]", { autoAlpha: 1, duration: 0.3 }, 11.55)
    .fromTo("[data-agreed]", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2.4)" }, 11.6)
    .to("[data-session-note]", { autoAlpha: 0, duration: 0.25 }, 11.6)
    .fromTo("[data-add-cal]", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 11.7)
    .to({}, { duration: 0.8 }, 12.8);

  measure();
  layout();


  // After every refresh (resize, fonts): the pinned hero now has its new size. Re-fit the texts
  // (their room, the per-step lifts), re-measure the landing, and re-render the story where it
  // stands, so each step's screen position is recomputed for the new size.
  ST.addEventListener("refresh", () => {
    fit();
    measure();
    layout();
    // Rewind first: invalidate() makes each tween re-read its start values, and read mid-story
    // they would be another step's (a caption left visible, two screens at once).
    const p = story.progress();
    story.progress(0, true).invalidate();
    story.progress(p, true);
  });
  fit();
  measure();
  layout();

  /* ================= Step arrows ================= */

  let fillTrigger = null; // set by the manifesto below

  // Each step is a moment of the story (headline, like, match, proposal, confirmed), then each
  // section below. A press scrolls there smoothly, so the scroll animation plays on the way.
  const STORY_STEPS = [0, 3.1, 4.8, 6.8, 10, 11.9];
  const stepTargets = () => {
    const st = story.scrollTrigger, span = st.end - st.start, total = story.duration();
    const inStory = STORY_STEPS.map((t) => st.start + (t / total) * span);
    // The manifesto's step is where its words have all inked in, not where it starts.
    const sections = [
      fillTrigger ? fillTrigger.end + 2 : $(".statement").getBoundingClientRect().top + scrollY - 40,
      // Other sections: their content (first to last child) centred in the viewport.
      ...$$(".sports, .tempo, .join").map((el) => {
        const kids = [...el.children].filter((k) => k.offsetHeight);
        const top = kids[0].getBoundingClientRect().top, bottom = kids[kids.length - 1].getBoundingClientRect().bottom;
        return Math.max(0, (top + bottom) / 2 + scrollY - innerHeight / 2);
      }),
    ];
    return [...inStory, ...sections, document.documentElement.scrollHeight - innerHeight];
  };
  const stepBtns = $$("[data-step]");
  // While an arrow jump runs, every scrubbed animation catches up four times faster, so the
  // story lands on the step right away instead of trailing the scroll.
  let arrowJump = false;
  g.ticker.add(() => {
    if (!arrowJump) return;
    ST.getAll().forEach((st) => {
      const tw = st.getTween?.();
      if (tw && typeof tw.timeScale === "function") tw.timeScale(4);
    });
  });
  const refreshSteps = () => {
    const t = stepTargets(), y = scrollY;
    stepBtns.forEach((btn) => { btn.disabled = +btn.dataset.step < 0 ? y <= t[0] + 4 : y >= t[t.length - 1] - 4; });
  };
  stepBtns.forEach((btn) => btn.addEventListener("click", () => {
    const t = stepTargets(), y = scrollY, dir = +btn.dataset.step;
    const to = dir > 0 ? t.find((v) => v > y + 4) : [...t].reverse().find((v) => v < y - 4);
    if (to === undefined) return;
    const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
    arrowJump = true;
    const done = () => { arrowJump = false; };
    if (lenis) lenis.scrollTo(to, { duration: 0.7, easing: ease, onComplete: done });
    else { scrollTo({ top: to, behavior: "smooth" }); setTimeout(done, 700); }
  }));
  addEventListener("scroll", refreshSteps, { passive: true });
  refreshSteps();
  stepperFrom = () => {
    const st = story.scrollTrigger, v = st.start + (1.1 / story.duration()) * (st.end - st.start);
    return Number.isFinite(v) && v > 0 ? v : innerHeight * 0.5;
  };
  ST.addEventListener("refresh", placeStepper);
  placeStepper();

  /* ================= Section reveals ================= */

  $$("[data-reveal]").forEach((el) => {
    const words = split(el);
    g.fromTo(words, { yPercent: 110 }, {
      yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  // Manifesto: each word inks in as it reaches the reading line.
  const fill = $("[data-fill]");
  if (fill) {
    const words = splitFill(fill);
    fillTrigger = g.to(words, {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: fill, start: "top 62%", end: "bottom 40%", scrub: 0.6 },
    }).scrollTrigger;
  }

  // The sticker next to the manifesto drops in once, when it comes into view.
  const statementSticker = $(".statement__sticker");
  if (statementSticker) {
    g.from(statementSticker, {
      y: 70, rotation: 8, autoAlpha: 0, duration: 1.1, ease: "expo.out",
      scrollTrigger: { trigger: statementSticker, start: "top 90%", once: true },
    });
  }

  /* ================= Sports marquee: a steady loop ================= */

  const marquee = $("[data-marquee]");
  if (marquee) {
    const track = $(".marquee__track", marquee);
    const cards = $$("li", track);
    track.append(...cards.map((li) => li.cloneNode(true)));
    // Cards with a lifting corner: the same sticker as the scroll cue, its flap added here
    $$('li[data-stk="peel"]', track).forEach((li) => {
      const flap = document.createElement("i");
      flap.className = "stk__flap";
      li.append(flap);
      peelSticker(li, $(".stk", li), flap, { r: 24, rest: 8, hover: 22, lean: 20 });
    });
    g.to(track, { xPercent: -50, duration: cards.length * 4.8, ease: "none", repeat: -1 }); // 4.8 s a card: the same pace whatever the count
  }

  addEventListener("load", () => ST.refresh());
  finish();

  /* ================= Static fallback ================= */

  function finish() {
    root.classList.remove("is-booting");
    if (motion) return;
    // Static page (reduced motion or no GSAP): the story's end state, the confirmed session in
    // the chat, and arrows that jump from section to section.
    const hide = (s) => $$(s).forEach((el) => { el.style.display = "none"; });
    hide("[data-discover], [data-matchview], [data-sheet], [data-pill-wait], [data-session-note]");
    ["[data-pill-ok]", "[data-agreed]", "[data-add-cal]"].forEach((s) => { $(s).style.opacity = 1; });
    $$("[data-step]").forEach((btn) => btn.addEventListener("click", () => {
      const tops = $$(".hero, .statement, .sports, .tempo, .join").map((el) => el.getBoundingClientRect().top + scrollY);
      const y = scrollY, dir = +btn.dataset.step;
      const to = dir > 0 ? tops.find((v) => v > y + 4) : [...tops].reverse().find((v) => v < y - 4);
      if (to !== undefined) scrollTo({ top: to });
    }));
  }
})();
