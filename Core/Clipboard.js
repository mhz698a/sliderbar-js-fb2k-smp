// Intenta poner texto en el portapapeles con varias estrategias
function setClipboardText(text) {
  let lastErr = null;

  // 1) htmlfile method
  try {
    const doc = new ActiveXObject("htmlfile");
    doc.parentWindow.clipboardData.setData("Text", text);
    return true;
  } catch (e) {
    lastErr = e;
  }

  // 2) ADODB.Stream -> tmp file -> clip
  try {
    const tmp = fb.ProfilePath + "\\__smp_clip_tmp.txt";
    const stream = new ActiveXObject("ADODB.Stream");
    stream.Type = 2; // text
    stream.Charset = "utf-8";
    stream.Open();
    stream.WriteText(text);
    stream.SaveToFile(tmp, 2); // adSaveCreateOverWrite
    stream.Close();

    const shell = new ActiveXObject("WScript.Shell");
    shell.Run('cmd /c type "' + tmp + '" | clip', 0, true);

    try { const fso = new ActiveXObject("Scripting.FileSystemObject"); fso.DeleteFile(tmp); } catch (e2) {}
    return true;
  } catch (e) {
    lastErr = e;
  }

  // 3) Scripting.FileSystemObject CreateTextFile (UTF-16 LE) -> clip
  try {
    const fso2 = new ActiveXObject("Scripting.FileSystemObject");
    const tmp2 = fb.ProfilePath + "\\__smp_clip_tmp.txt";
    const fh = fso2.CreateTextFile(tmp2, true, true); // unicode=true -> UTF-16 LE
    fh.Write(text);
    fh.Close();
    const shell2 = new ActiveXObject("WScript.Shell");
    shell2.Run('cmd /c type "' + tmp2 + '" | clip', 0, true);
    try { fso2.DeleteFile(tmp2); } catch (e3) {}
    return true;
  } catch (e) {
    lastErr = e;
  }

  try {
    showPopupSafe("No fue posible acceder al portapapeles. Error: " + (lastErr && lastErr.message ? lastErr.message : lastErr));
  } catch (ee) {}
  return false;
}
