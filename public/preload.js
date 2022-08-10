const { ipcRenderer, contextBridge } = require("electron");
const {
//constants
} = require("../src/utils/electron/electron-ipc-constants");

contextBridge.exposeInMainWorld("api", {
    //IpcRenderer functions
});