// ============================================================
//  PAT 2.0 — Login Screen Generator (Figma Plugin)
//  Run via: Plugins > Development > New Plugin > Run once
// ============================================================

async function createPATLoginScreen() {

  // ── Fonts ──────────────────────────────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Medium" }),
    figma.loadFontAsync({ family: "Inter", style: "SemiBold" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
  ]);

  // ── Colour palette ─────────────────────────────────────────
  const C = {
    navy:        { r: 0.098, g: 0.122, b: 0.243 },  // #192040
    navyDeep:    { r: 0.071, g: 0.090, b: 0.196 },  // #121732
    cardBg:      { r: 0.141, g: 0.169, b: 0.314 },  // #242B50
    pink:        { r: 0.957, g: 0.239, b: 0.490 },  // #F43D7D
    white:       { r: 1,     g: 1,     b: 1     },
    offWhite:    { r: 0.973, g: 0.976, b: 0.988 },  // #F8F9FC
    lightBlue:   { r: 0.929, g: 0.945, b: 0.988 },  // #EDF2FC
    darkText:    { r: 0.098, g: 0.122, b: 0.243 },  // same as navy
    mutedText:   { r: 0.420, g: 0.447, b: 0.545 },  // #6B728B
    dimWhite:    { r: 0.780, g: 0.804, b: 0.890 },  // #C7CDDD
    border:      { r: 0.839, g: 0.863, b: 0.914 },  // #D6DCE9
    inputBorder: { r: 0.800, g: 0.820, b: 0.878 },  // #CCD1E0
    black:       { r: 0.082, g: 0.082, b: 0.082 },
  };

  // ── Helpers ───────────────────────────────────────────────
  const fill  = c      => [{ type: "SOLID", color: c }];
  const fillA = (c, a) => [{ type: "SOLID", color: c, opacity: a }];

  function text(chars, opts = {}) {
    const t = figma.createText();
    t.characters   = chars;
    t.fontName     = { family: "Inter", style: opts.style || "Regular" };
    t.fontSize     = opts.size  || 14;
    t.fills        = opts.fills || fill(C.white);
    t.lineHeight   = opts.lh ? { value: opts.lh, unit: "PIXELS" } : { unit: "AUTO" };
    if (opts.w)    { t.textAutoResize = "HEIGHT"; t.resize(opts.w, 20); }
    if (opts.align) t.textAlignHorizontal = opts.align;
    return t;
  }

  function place(node, x, y) { node.x = x; node.y = y; return node; }

  function rect(w, h, opts = {}) {
    const r = figma.createRectangle();
    r.resize(w, h);
    r.fills        = opts.fills || fill(C.white);
    r.cornerRadius = opts.radius || 0;
    r.strokeWeight = opts.strokeW || 0;
    if (opts.stroke) r.strokes = opts.stroke;
    return r;
  }

  // ── Root frame ────────────────────────────────────────────
  const W = 1440, H = 900;
  const LW = 816;      // left panel width
  const RW = W - LW;   // right panel width = 624

  const root = figma.createFrame();
  root.name = "PAT 2.0 – Login";
  root.resize(W, H);
  root.fills = fill(C.white);
  root.clipsContent = true;
  figma.currentPage.appendChild(root);

  // ════════════════════════════════════════════════════════════
  //  LEFT PANEL
  // ════════════════════════════════════════════════════════════
  const left = figma.createFrame();
  left.name = "Left Panel";
  left.resize(LW, H);
  left.fills = fill(C.navy);
  left.clipsContent = true;
  root.appendChild(left);
  place(left, 0, 0);

  // -- Dot grid background --
  const COLS = 21, ROWS = 19, GAPX = 40, GAPY = 50;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const dot = figma.createEllipse();
      dot.resize(3, 3);
      dot.fills = fillA(C.white, 0.07);
      left.appendChild(dot);
      place(dot, c * GAPX - 4, r * GAPY - 4);
    }
  }

  // -- Logo badge --
  const logoFrame = figma.createFrame();
  logoFrame.name = "Logo";
  logoFrame.resize(88, 88);
  logoFrame.cornerRadius = 44;
  logoFrame.fills = fill(C.white);
  logoFrame.clipsContent = true;
  left.appendChild(logoFrame);
  place(logoFrame, 96, 108);

  // "neo" inside logo
  const neoT = text("neo", { style: "Bold", size: 20, fills: fill(C.navy) });
  logoFrame.appendChild(neoT);
  place(neoT, 10, 28);

  // pink PAT badge inside logo
  const patRect = rect(30, 16, { radius: 3, fills: fill(C.pink) });
  logoFrame.appendChild(patRect);
  place(patRect, 42, 36);

  const patT = text("PAT", { style: "Bold", size: 8, fills: fill(C.white) });
  logoFrame.appendChild(patT);
  place(patT, 45, 40);

  // -- "NeoPAT" heading --
  const h1 = text("NeoPAT", { style: "Bold", size: 40, fills: fill(C.white) });
  left.appendChild(h1);
  place(h1, 96, 216);

  // -- Tagline --
  const tagline = text("Placement Administration", {
    style: "Regular", size: 15, fills: fillA(C.white, 0.65),
  });
  left.appendChild(tagline);
  place(tagline, 96, 264);

  // -- Description --
  const descT = text(
    "Comprehensive placement management platform trusted by leading\neducational institutions for streamlined recruitment processes\nand enhanced student success.",
    { style: "Regular", size: 13, fills: fill(C.dimWhite), lh: 22, w: 624 }
  );
  left.appendChild(descT);
  place(descT, 96, 298);

  // -- Feature cards (2 × 2) --
  const features = [
    {
      title: "Drive Management",
      desc:  "Planner, drives, reminders &\nrepublish queue",
      iconColor: { r: 0.243, g: 0.859, b: 0.635 },  // teal-green
    },
    {
      title: "Student Management",
      desc:  "Student profiles & eligibility\ncriteria",
      iconColor: { r: 0.576, g: 0.490, b: 0.980 },  // purple
    },
    {
      title: "Communication",
      desc:  "WhatsApp, email templates &\ninsights",
      iconColor: { r: 0.957, g: 0.659, b: 0.239 },  // amber
    },
    {
      title: "Analytics & Reports",
      desc:  "Engagement metrics & detailed\nreports",
      iconColor: { r: 0.957, g: 0.239, b: 0.490 },  // pink
    },
  ];

  const CW = 284, CH = 126, CGX = 24, CGY = 20;
  const CSX = 96, CSY = 400;

  for (let i = 0; i < 4; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = CSX + col * (CW + CGX);
    const cy = CSY + row * (CH + CGY);
    const f  = features[i];

    // card frame
    const card = figma.createFrame();
    card.name = `Card – ${f.title}`;
    card.resize(CW, CH);
    card.fills        = fillA(C.cardBg, 0.80);
    card.cornerRadius = 12;
    card.strokeWeight = 1;
    card.strokes      = fillA(C.white, 0.10);
    card.clipsContent = false;
    left.appendChild(card);
    place(card, cx, cy);

    // icon circle
    const ic = figma.createEllipse();
    ic.resize(36, 36);
    ic.fills = fillA(f.iconColor, 0.18);
    card.appendChild(ic);
    place(ic, 16, 14);

    // icon dot (simplified stand-in)
    const icd = figma.createEllipse();
    icd.resize(12, 12);
    icd.fills = fill(f.iconColor);
    card.appendChild(icd);
    place(icd, 28, 26);

    // card title
    const ct = text(f.title, {
      style: "SemiBold", size: 14, fills: fill(C.white),
    });
    card.appendChild(ct);
    place(ct, 16, 60);

    // card description
    const cd = text(f.desc, {
      style: "Regular", size: 12, fills: fill(C.dimWhite), lh: 18, w: 252,
    });
    card.appendChild(cd);
    place(cd, 16, 82);
  }

  // -- Bottom brand line --
  const brand = text("An NIIT Venture · iamneo", {
    style: "Regular", size: 12, fills: fillA(C.white, 0.35),
  });
  left.appendChild(brand);
  place(brand, 96, 860);

  // ════════════════════════════════════════════════════════════
  //  RIGHT PANEL
  // ════════════════════════════════════════════════════════════
  const right = figma.createFrame();
  right.name = "Right Panel";
  right.resize(RW, H);
  right.fills = fill(C.white);
  right.clipsContent = true;
  root.appendChild(right);
  place(right, LW, 0);

  // subtle off-white bg
  right.fills = fill(C.offWhite);

  // white card centred inside right panel
  const cardX = 40, cardY = 160, cardW = RW - 80, cardH = 580;
  const formCard = figma.createFrame();
  formCard.name = "Form Card";
  formCard.resize(cardW, cardH);
  formCard.fills = fill(C.white);
  formCard.cornerRadius = 20;
  formCard.strokeWeight = 1;
  formCard.strokes = fill(C.border);
  formCard.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0.082, g: 0.122, b: 0.243, a: 0.06 },
    offset: { x: 0, y: 8 },
    radius: 32,
    spread: 0,
    visible: true,
    blendMode: "NORMAL",
  }];
  right.appendChild(formCard);
  place(formCard, cardX, cardY);

  const FX = 48;   // inner horizontal padding within form card

  // -- "Sign in" heading --
  const siTitle = text("Sign in", {
    style: "Bold", size: 32, fills: fill(C.darkText),
  });
  formCard.appendChild(siTitle);
  place(siTitle, FX, 52);

  // -- Subtext --
  const siSub = text("Enter your email to continue to NeoPAT", {
    style: "Regular", size: 14, fills: fill(C.mutedText),
  });
  formCard.appendChild(siSub);
  place(siSub, FX, 98);

  // -- Email label --
  const emailLbl = text("Email Address", {
    style: "Medium", size: 13, fills: fill(C.darkText),
  });
  formCard.appendChild(emailLbl);
  place(emailLbl, FX, 150);

  // -- Email input --
  const inputW = cardW - FX * 2;
  const emailBox = rect(inputW, 48, {
    radius: 10,
    fills: fill(C.white),
    stroke: fill(C.inputBorder),
    strokeW: 1.5,
  });
  formCard.appendChild(emailBox);
  place(emailBox, FX, 174);

  const emailPH = text("e.g. admin@college.edu", {
    style: "Regular", size: 14, fills: fill({ r: 0.73, g: 0.75, b: 0.82 }),
  });
  formCard.appendChild(emailPH);
  place(emailPH, FX + 16, 187);

  // -- Continue button --
  const btn = rect(inputW, 52, {
    radius: 10,
    fills: fill(C.navyDeep),
  });
  formCard.appendChild(btn);
  place(btn, FX, 244);

  const btnT = text("Continue", {
    style: "SemiBold", size: 16, fills: fill(C.white), align: "CENTER",
  });
  formCard.appendChild(btnT);
  // Centre text inside button
  btnT.resize(inputW, 52);
  btnT.textAlignHorizontal = "CENTER";
  btnT.textAlignVertical   = "CENTER";
  place(btnT, FX, 244);

  // -- Divider --
  const divLine = figma.createLine();
  divLine.resize(inputW, 0);
  divLine.strokeWeight = 1;
  divLine.strokes = fill(C.border);
  formCard.appendChild(divLine);
  place(divLine, FX, 328);

  const divLabel = text("Student Access", {
    style: "Bold", size: 15, fills: fill(C.darkText),
  });
  formCard.appendChild(divLabel);
  place(divLabel, FX, 352);

  const divDesc = text(
    "Students access their placement portal through our mobile apps.",
    { style: "Regular", size: 13, fills: fill(C.mutedText), w: inputW, lh: 20 }
  );
  formCard.appendChild(divDesc);
  place(divDesc, FX, 376);

  // -- App store buttons --
  const btnAppStore = rect(148, 44, { radius: 8, fills: fill(C.black) });
  formCard.appendChild(btnAppStore);
  place(btnAppStore, FX, 420);

  const btnAppT = text("App Store", { style: "SemiBold", size: 13, fills: fill(C.white) });
  formCard.appendChild(btnAppT);
  place(btnAppT, FX + 40, 434);

  const appIcon = text("", { style: "Regular", size: 16, fills: fill(C.white) });
  formCard.appendChild(appIcon);
  place(appIcon, FX + 14, 432);

  const btnGPlay = rect(160, 44, { radius: 8, fills: fill(C.black) });
  formCard.appendChild(btnGPlay);
  place(btnGPlay, FX + 164, 420);

  const btnGT = text("Google Play", { style: "SemiBold", size: 13, fills: fill(C.white) });
  formCard.appendChild(btnGT);
  place(btnGT, FX + 164 + 40, 434);

  const gIcon = text("▶", { style: "Regular", size: 13, fills: fill(C.white) });
  formCard.appendChild(gIcon);
  place(gIcon, FX + 164 + 14, 434);

  // -- Copyright footer --
  const copy = text("© 2025 iamneo · An NIIT Venture. All rights reserved.", {
    style: "Regular", size: 12, fills: fill(C.mutedText),
  });
  formCard.appendChild(copy);
  place(copy, FX, 532);

  // ── Vertical separator between panels ──────────────────────
  const sep = figma.createLine();
  sep.resize(0, H);
  sep.strokeWeight = 1;
  sep.strokes = fill(C.border);
  root.appendChild(sep);
  place(sep, LW, 0);

  // ── Zoom to fit ────────────────────────────────────────────
  figma.viewport.scrollAndZoomIntoView([root]);

  figma.closePlugin("✅ PAT 2.0 Login Screen created!");
}

createPATLoginScreen().catch(err => {
  console.error(err);
  figma.closePlugin("❌ Error: " + err.message);
});
