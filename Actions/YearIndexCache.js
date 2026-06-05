var YEAR_FOLDER_CACHE = {};

function _yearFolderStamp(folderPath) {
    try {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        if (!fso.FolderExists(folderPath)) return 0;
        return new Date(fso.GetFolder(folderPath).DateLastModified).getTime();
    } catch (e) {
        return 0;
    }
}

function _compareFolderNames(a, b) {
    a = String(a || "").toLowerCase();
    b = String(b || "").toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

function _scanSubfolders(folderPath) {
    try {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        if (!fso.FolderExists(folderPath)) return [];

        var folder = fso.GetFolder(folderPath);
        var items = [];
        var e = new Enumerator(folder.SubFolders);

        for (; !e.atEnd(); e.moveNext()) {
            var sub = e.item();
            items.push({
                name: sub.Name,
                path: sub.Path
            });
        }

        items.sort(function (a, b) {
            return _compareFolderNames(a.name, b.name);
        });

        return items;
    } catch (e) {
        return [];
    }
}

function getCachedSubfolders(folderPath) {
    try {
        var stamp = _yearFolderStamp(folderPath);
        var cached = YEAR_FOLDER_CACHE[folderPath];

        if (cached && cached.stamp === stamp) {
            return cached.items;
        }

        var items = _scanSubfolders(folderPath);

        YEAR_FOLDER_CACHE[folderPath] = {
            stamp: stamp,
            items: items
        };

        return items;
    } catch (e) {
        return [];
    }
}

function getCachedFirstSubfolder(folderPath) {
    var items = getCachedSubfolders(folderPath);
    return items.length ? items[0] : null;
}

function clearYearFolderCache() {
    YEAR_FOLDER_CACHE = {};
}