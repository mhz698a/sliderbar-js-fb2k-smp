function folderExists(path) {
  try {
    const fso = new ActiveXObject("Scripting.FileSystemObject");
    return fso.FolderExists(path);
  } catch (e) {
    return false;
  }
}

function fileExists(path) {
  try {
    const fso = new ActiveXObject("Scripting.FileSystemObject");
    return fso.FileExists(path);
  } catch (e) {
    return false;
  }
}

function openFileOrFolder(path) {
  try {
    const shell = new ActiveXObject("WScript.Shell");

    if (fileExists(path)) {
      shell.Run('"' + path + '"', 1, false);
      return;
    }

    if (folderExists(path)) {
      shell.Run('explorer.exe "' + path + '"', 1, false);
      return;
    }

    // fallback: carpeta contenedora
    const parent = path.substring(0, path.lastIndexOf("\\"));
    if (folderExists(parent)) {
      shell.Run('explorer.exe "' + parent + '"', 1, false);
    }

  } catch (e) {
    fb.ShowPopupMessage("Error al abrir ruta:\n" + e, "Error");
  }
}

function writeSelectionToFile(listFile, paths) {
  try {
    return utils.WriteTextFile(listFile, paths.join("\r\n"), true);
  } catch (e) {
    return false;
  }
}

function resolveLatestTripleUnderscoreFolder(yearRoot) {
  try {
    const fso = new ActiveXObject("Scripting.FileSystemObject");
    const folder = fso.GetFolder(yearRoot);
    const e = new Enumerator(folder.SubFolders);

    let latestFolder = null;
    let latestDate = 0;

    for (; !e.atEnd(); e.moveNext()) {
      const sub = e.item();
      if (sub.Name.indexOf("___") !== -1) {
        const modTime = new Date(sub.DateLastModified).getTime();
        if (modTime > latestDate) {
          latestDate = modTime;
          latestFolder = sub;
        }
      }
    }

    return latestFolder ? latestFolder.Path : null;
  } catch (e) {
    return null;
  }
}

function resolveLatestTripleUnderscoreFolderInfo(yearRoot) {
  try {
    const fso = new ActiveXObject("Scripting.FileSystemObject");
    const folder = fso.GetFolder(yearRoot);
    const e = new Enumerator(folder.SubFolders);

    let latest = null;
    let latestTime = 0;

    for (; !e.atEnd(); e.moveNext()) {
      const sub = e.item();
      if (sub.Name.indexOf("___") !== -1) {
        const t = new Date(sub.DateLastModified).getTime();
        if (t > latestTime) {
          latestTime = t;
          latest = sub;
        }
      }
    }

    if (!latest) return null;

    return {
      name: latest.Name,
      path: latest.Path
    };
  } catch (e) {
    return null;
  }
}

