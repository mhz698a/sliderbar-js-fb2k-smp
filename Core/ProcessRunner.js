function safeRun(shellCmd, windowStyle = 1, wait = false, showOut = false) {
  try {
    const shell = new ActiveXObject('WScript.Shell');
    shell.Run(shellCmd, windowStyle, wait);
    if(showOut){
        fb.ShowPopupMessage(shellCmd, "Output");
    }
    return true;
  } catch (e) {
    fb.ShowPopupMessage("Error al lanzar comando:\n" + e, "Error");
    return false;
  }
}

// Abrir programa con start (mantiene compatibilidad con la versión anterior)
function openProgram(cmd) {
  return runWithStart(cmd, [], 1, false);
}

// Abrir sin start directo (mantengo API pero delega)
function openProgramNoStart(cmd) {
  return safeRun('"' + cmd + '"', 1, false);
}

// Abrir script de python por parametros
function runWithCmdStart(exe, args, windowStyle) {
    try {
        args = args || [];
        windowStyle = (windowStyle !== undefined) ? windowStyle : 1;

        var cmd = 'cmd /c start "" "' + exe + '"';

        for (var i = 0; i < args.length; i++) {
            cmd += ' "' + args[i] + '"';
        }

        var shell = new ActiveXObject("WScript.Shell");
        shell.Run(cmd, windowStyle, false); // false = NO bloquear SMP
        return true;

    } catch (e) {
        fb.ShowPopupMessage("Error ejecutando comando:\n" + e, "Error");
        return false;
    }
}

// Wrapper
function runPythonScript(scriptPath, args, visible) {
    args = args || [];
    visible = (visible !== false); // default true

    var winStyle = visible ? 1 : 0;

    return runWithCmdStart(
        PYTHONW_EXE,
        [scriptPath].concat(args),
        winStyle
    );
}

function runPythonScriptCLI(scriptPath, args, visible) {
    args = args || [];
    visible = (visible !== false); // default true

    var winStyle = visible ? 1 : 0;

    return runWithCmdStart(
        PYTHON_EXE,
        [scriptPath].concat(args),
        winStyle
    );
}

function runTxtBookViewer(mdFile) {
    return runWithCmdStart(
        PYTHONW_EXE,
        [
            PATHS.txt_text_py,   // txtbook.pyw
            mdFile               // argumento
        ],
        0 // oculto
    );
}