const { app, BrowserWindow } = require('electron');
const { dialog } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#ffa502',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  mainWindow.loadURL(`file://${path.join(__dirname, '/dist/index.html')}`)

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });
};

app.on('ready', () => {
  createWindow();
  dialog.showOpenDialog( path => {
    console.log(path)
    mainWindow.webContents.send( 'path', path );
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
