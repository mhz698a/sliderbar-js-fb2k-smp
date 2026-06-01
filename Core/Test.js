function showSelectedPaths() {
  const cur = plman.ActivePlaylist;
  if (cur < 0) { showPopupSafe("No hay playlist activa.", "Rutas seleccionadas"); return; }
  const sel = plman.GetPlaylistSelectedItems(cur);
  if (!sel || sel.Count === 0) { showPopupSafe("No hay archivos seleccionados.", "Rutas seleccionadas"); return; }
  const paths = [];
  for (let i = 0; i < sel.Count; i++) paths.push(sel[i].Path);
  const msg = "Rutas seleccionadas (" + paths.length + "):\n\n" + paths.join("\n");
  showPopupSafe(msg, "Rutas seleccionadas");
}