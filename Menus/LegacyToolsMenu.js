function abrirExcel(rutaArchivo) {
    try {
        var shell = new ActiveXObject("WScript.Shell");
        var comando = 'excel.exe "' + rutaArchivo + '"';
        shell.Run(comando, 1, false);
    } catch (e) {
        console.log("Error al abrir Excel: " + e.message);
    }
}