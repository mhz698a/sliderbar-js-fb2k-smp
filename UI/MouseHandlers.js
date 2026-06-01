function on_mouse_lbtn_down(x, y, mask) {
  const idx = getIndexFromCoords(y);
  if (idx >= 0 && idx < buttons.length) {
    pressed_idx = idx;
    repaintIfNeeded();
  }
}

function on_mouse_lbtn_up(x, y) {
  const idx = getIndexFromCoords(y);
  if (idx === pressed_idx && idx >= 0 && idx < buttons.length) {
    // Ejecuta la acción del botón (puede recibir x,y)
    try { buttons[idx].action(x, y); } catch (e) { fb.ShowPopupMessage("Error en acción de botón:\n" + e); }
  }
  pressed_idx = -1;
  repaintIfNeeded();
}

function on_mouse_move(x, y, mask) {
  const idx = getIndexFromCoords(y);
  hovered_idx = (idx >= 0 && idx < buttons.length) ? idx : -1;
  repaintIfNeeded();
}

function on_mouse_leave() {
  hovered_idx = -1;
  repaintIfNeeded();
}

function on_colours_changed() {
  COLORS = load_colors();
  repaintIfNeeded();
}

function on_size() {
  repaintIfNeeded();
}

function repaintIfNeeded() {
  window.Repaint && window.Repaint();
}

function getIndexFromCoords(y) {
  return Math.floor(y / (BTN_SIZE + GAP));
}
