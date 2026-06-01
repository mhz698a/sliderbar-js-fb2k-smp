function showPopupSafe(msg, title) {
    try {
        fb.ShowPopupMessage(msg, title);
    } catch (e) {}
}