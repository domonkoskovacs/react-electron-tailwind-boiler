const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

const Store = require("electron-store");
const store = new Store();

const {
    //constants
} = require("../src/utils/electron/electron-ipc-constants");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: isDev
        ? path.join(app.getAppPath(), "./public/preload.js")
        : path.join(app.getAppPath(), "./build/preload.js"),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });
  mainWindow.setMenuBarVisibility(false);

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  } else {
    mainWindow.loadURL("http://localhost:3000");
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});