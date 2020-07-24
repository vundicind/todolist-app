const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const nativeImage = require('electron').nativeImage;
const { sqlite3 } = require('sqlite3');
const Promise = require('bluebird');
var ipcMain = require('electron').ipcMain;

global.sharedObj = {prop1: isDev ? 'C:/Users/rdumbraveanu/AppData/Local/todolist-app/' : './'};

ipcMain.on('show-prop1', function(event) {
    console.log(global.sharedObj.prop1);
});

let mainWindow;

function createWindow() {
    var image = nativeImage.createFromPath('favicon.png'); 
    image.setTemplateImage(true);

    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        },
        icon: image
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open the DevTools.
        //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
    }

    mainWindow.setMenu(null);
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});