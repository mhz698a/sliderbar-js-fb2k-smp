const YEAR_SUBFOLDERS = [
    "{prefix}. ___",
    "{prefix}. etude.dorothy.images",
    "{prefix}. identity_knowledge",
    "{prefix}. identity_propeties",
    "{prefix}. liberale.reality",
    "{prefix}. music",
    "{prefix}. resources.local.acrobat",
    "{prefix}. resources.local.family",
    "{prefix}. resources.local.images",
    "{prefix}. resources.local.overworld",
    "{prefix}. resources.local.personal",
];

function getYearRanges(startYear, span) {
    const currentYear = new Date().getFullYear();
    const ranges = [];

    for (let y = startYear; y <= currentYear; y += span) {
        const from = y;
        const to = Math.min(y + span - 1, currentYear);
        ranges.push({ from, to });
    }
    return ranges;
}

function getPrefixFromYear(year) {
    return String(year - 2003).padStart(2, "0");
}

function buildTargetPath(type, year) {
    const prefix = getPrefixFromYear(year);
    const yearFolder = INTERNAL_BASE + "\\" + year;
    const identityFolder = yearFolder + "\\" + prefix + ". identity_propeties";

    if (type === "registros") {
        return identityFolder + "\\" + prefix + ". le_etude.overwrite.xlsx";
    }

    if (type === "revelaciones") {
        return identityFolder + "\\Revelaciones Vol1 T" + prefix + ".docx";
    }

    return null;
}

function resolveYearSubfolder(yearRoot, templateName) {
  if (!templateName.includes("___")) {
    return yearRoot + "\\" + templateName;
  }

  // buscar carpeta que contenga "___"
  try {
    const fso = new ActiveXObject("Scripting.FileSystemObject");
    const folder = fso.GetFolder(yearRoot);
    const e = new Enumerator(folder.SubFolders);

    for (; !e.atEnd(); e.moveNext()) {
      const sub = e.item();
      if (sub.Name.indexOf("___") !== -1) {
        return sub.Path;
      }
    }
  } catch (e) { fb.ShowPopupMessage("Error menú años:\n" + e, "Error") }

  return null;
}