function showYearMenu(x, y, type) {
  try {
    const menu = window.CreatePopupMenu();
    const ranges = getYearRanges(2004, 10);
    let id = 1;
    const map = {};
    
    menu.AppendMenuItem(MF_DISABLED, 0, `${type}`);
    menu.AppendMenuSeparator();
    
    ranges.forEach(range => {
      // menu.AppendMenuItem(MF_DISABLED, 0, `${range.from} – ${range.to}`);

      for (let year = range.from; year <= range.to; year++) {
        menu.AppendMenuItem(0, id, "  " + year);
        map[id] = year;
        id++;
      }

      //menu.AppendMenuSeparator();
    });

    const res = menu.TrackPopupMenu(x, y);
    if (!map[res]) return;

    const year = map[res];
    const targetPath = buildTargetPath(type, year);
    openFileOrFolder(targetPath);

  } catch (e) {
    fb.ShowPopupMessage("Error menú años:\n" + e, "Error");
  }
}

function showYearFolderTreeMenu(x, y) {
  try {
    const menu = window.CreatePopupMenu();
    const currentYear = new Date().getFullYear();
    let id = 1;
    const actions = {};

    for (let year = 2004; year <= currentYear; year++) {
      const subMenu = window.CreatePopupMenu();
      const yearRoot = INTERNAL_BASE + "\\" + year;
      const prefix = getPrefixFromYear(year);

      // 🔹 Abrir raíz del año
      const ROOT_ID = id++;
      subMenu.AppendMenuItem(0, ROOT_ID, "...");
      actions[ROOT_ID] = () => openFileOrFolder(yearRoot);

      subMenu.AppendMenuSeparator();

      // 🔹 Subcarpetas
      YEAR_SUBFOLDERS.forEach(tpl => {
          const isTriple = tpl.indexOf("___") !== -1;
          let displayName;
          let targetPath;

          if (isTriple) {
            const info = resolveLatestTripleUnderscoreFolderInfo(yearRoot);

            if (info) {
              displayName = info.name;
              targetPath = info.path;
            } else {
              displayName = tpl.replace("{prefix}", prefix) + " (no encontrado)";
              targetPath = null;
            }
          } else {
            displayName = tpl.replace("{prefix}", prefix);
            targetPath = yearRoot + "\\" + displayName;
          }

          const ITEM_ID = id++;
          subMenu.AppendMenuItem(0, ITEM_ID, displayName);

          actions[ITEM_ID] = () => {
            if (targetPath && folderExists(targetPath)) {
              openFileOrFolder(targetPath);
            } else {
              openFileOrFolder(yearRoot);
            }
          };
        });

      
      
      //------------------------------------------
      subMenu.AppendTo(menu, 0, String(year));
    }

    const res = menu.TrackPopupMenu(x, y);
    if (actions[res]) actions[res]();

  } catch (e) {
    fb.ShowPopupMessage("Error menú años:\n" + e, "Error");
  }
}