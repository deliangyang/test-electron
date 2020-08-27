"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('electron'), app = _a.app, Menu = _a.Menu, BrowserWindow = _a.BrowserWindow, ipcMain = _a.ipcMain;
var dockMenu = Menu.buildFromTemplate([
    {
        label: 'New Window',
        click: function () { console.log('New Window'); }
    }, {
        label: 'New Window with Settings',
        submenu: [
            { label: 'Basic' },
            { label: 'Pro' }
        ]
    },
    { label: 'New Command...' }
]);
function createWindow() {
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('index.html');
}
ipcMain.on('asynchronous-message', function (event, arg) {
    console.log(arg);
    event.reply('asynchronous-reply', 'pong');
});
ipcMain.on('synchronous-message', function (event, arg) {
    console.log(arg);
    event.returnValue = 'pong';
});
app.dock.setMenu(dockMenu);
app.whenReady().then(createWindow);
//# sourceMappingURL=main.js.map