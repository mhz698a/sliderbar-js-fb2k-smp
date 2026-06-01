function ensure_font() {
  if (!g_fa_font) {
    try { g_fa_font = gdi.Font("FontAwesome", BTN_SIZE - 24); } catch (e) { g_fa_font = null; }
  }
}

function load_colors() {
  let bg, fg, highlight, selection;

  if (window.InstanceType) { // DUI
    bg = window.GetColourDUI(ColourTypeDUI.background);
    fg = window.GetColourDUI(ColourTypeDUI.text);
    highlight = window.GetColourDUI(ColourTypeDUI.highlight);
    selection = window.GetColourDUI(ColourTypeDUI.selection);
  } else { // CUI
    bg = window.GetColourCUI(ColourTypeCUI.background);
    fg = window.GetColourCUI(ColourTypeCUI.text);
    highlight = window.GetColourCUI(ColourTypeCUI.text); // CUI no tiene highlight real
    selection = window.GetColourCUI(ColourTypeCUI.selection_background);
  }

  return {
    bg: bg || DEFAULT_BG,
    fg: fg || DEFAULT_FG,
    btn_bg: bg || DEFAULT_BTN_BG,
    highlight: highlight || fg,
    selection: selection || bg
  };
}

function adjustColor(c, amount) {
  const r = (c >> 16) & 0xff;
  const g = (c >> 8) & 0xff;
  const b = c & 0xff;

  return RGB(
    Math.min(255, Math.max(0, r + amount)),
    Math.min(255, Math.max(0, g + amount)),
    Math.min(255, Math.max(0, b + amount))
  );
}

function on_paint(gr) {
  if (!COLORS) COLORS = load_colors();
  ensure_font();

  gr.FillSolidRect(0, 0, window.Width, window.Height, COLORS.bg);

  for (let i = 0; i < buttons.length; i++) {
    const x = 0;
    const y = i * (BTN_SIZE + GAP);

    let bg = COLORS.btn_bg;

    if (i === hovered_idx) bg = adjustColor(bg, 20);
    if (i === pressed_idx) bg = adjustColor(bg, 40);

    gr.FillSolidRect(x, y, BTN_SIZE, BTN_SIZE, bg);

    // borde usando highlight real del tema
    //gr.DrawRect(x, y, BTN_SIZE, BTN_SIZE, 1, COLORS.highlight & 0x55ffffff);

    if (g_fa_font) {
      gr.GdiDrawText(
        buttons[i].icon,
        g_fa_font,
        COLORS.fg,
        x, y,
        BTN_SIZE, BTN_SIZE,
        DT_CENTER | DT_VCENTER | DT_SINGLELINE
      );
    }
  }
}
