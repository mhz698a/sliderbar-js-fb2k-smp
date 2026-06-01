// Construye líneas de la selección usando callback getValueForHandle(h)
function buildSelectionLines(getValueForHandle) {
  const handles = plman.GetPlaylistSelectedItems(plman.ActivePlaylist);
  if (!handles || handles.Count === 0) {
    showPopupSafe("No hay elementos seleccionados");
    return null;
  }
  const arr = handles.Convert();
  const lines = [];
  for (let i = 0; i < arr.length; i++) {
    const h = arr[i];
    try { lines.push(getValueForHandle(h)); } catch (e) { lines.push(""); }
  }
  return lines.join("\r\n");
}

function copySelectedFileNames() {
  const text = buildSelectionLines(h => {
    const parts = utils.SplitFilePath(h.Path);
    return parts[1]; // nombre sin ruta
  });
  if (text !== null) setClipboardText(text);
}

function copySelectedFilePaths() {
  const text = buildSelectionLines(h => h.Path);
  if (text !== null) setClipboardText(text);
}