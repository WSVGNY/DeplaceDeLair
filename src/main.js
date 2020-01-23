const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let secondaryWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#89C4F4',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // mainWindow.loadFile(path.join(__dirname, 'dist/index.html?viewA'));

  mainWindow.loadURL(`file://${path.join(__dirname, './dist/index.html?viewA')}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });
};

const createWindow2 = () => {
  secondaryWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#2ecc71',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  secondaryWindow.loadFile(path.join(__dirname, './window2.html'));

  // mainWindow.loadURL(`file://${path.join(__dirname, './dist/index.html?viewA')}`);

  secondaryWindow.on('closed', () => {
    secondaryWindow = null;
  });

  secondaryWindow.on('ready-to-show', () => {
    secondaryWindow.show();
    secondaryWindow.focus();
  });
};

app.on('ready', () => {
  createWindow();
  // createWindow2();

  // ipcMain.on('nameMsg', (event, arg) => {
  //   console.log("name inside main process is: ", arg); // this comes form within window 1 -> and into the mainProcess
  //   // event.sender.send('nameReply', { not_right: false }) // sends back/replies to window 1 - "event" is a reference to this chanel.
  //   secondaryWindow.webContents.send('forWin2', arg); // sends the stuff from Window1 to Window2.
  // })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
