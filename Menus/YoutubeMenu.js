function showYTMenu(x, y) {
  try {
    const items = [
      { id: 1, text: "YT NG Downloader", action: () => runPythonScript(PATHS.ytng_py) },
      { id: 2, text: "Youtube Searcher", action: () => fb.RunMainMenuCommand("View/Youtube Source/Search on Site") },
    ];

    const menu = window.CreatePopupMenu();
    items.forEach(item => menu.AppendMenuItem(0, item.id, item.text));
    const res = menu.TrackPopupMenu(x, y);
    const selected = items.find(item => item.id === res);
    if (selected) selected.action();
  } catch (e) {
    showPopupSafe("Error al abrir el menú: " + e.message, "Error");
  }
}