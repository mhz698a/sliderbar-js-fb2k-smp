function showEffectsMenu(x, y) {
  try {
    const items = [
      ["Playback Rate", "View/DSP/Playback Rate"],
      ["Tempo", "View/DSP/Tempo"],
      ["IIR Filter", "View/DSP/IIR Filter"]
    ];
    const menu = window.CreatePopupMenu();
    items.forEach((item, i) => menu.AppendMenuItem(0, i + 1, item[0]));
    const res = menu.TrackPopupMenu(x, y);
    if (res > 0) fb.RunMainMenuCommand(items[res - 1][1]);
  } catch (e) {
    showPopupSafe("Error al abrir el menú: " + e.message, "Error");
  }
}