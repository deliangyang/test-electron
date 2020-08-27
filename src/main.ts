const { app, Menu, BrowserWindow, ipcMain } = require('electron')
import { IpcMainEvent } from 'electron';

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () { console.log('New Window') }
  }, {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')
}

ipcMain.on('asynchronous-message', (event: IpcMainEvent, arg: any) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event: IpcMainEvent, arg: any) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

app.dock.setMenu(dockMenu)

app.whenReady().then(createWindow)

