"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win;
var args = process.argv.slice(1),
  serve = args.some(function (val) {
    return val === "--serve";
  });
function createWindow() {
  var electronScreen = electron_1.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;
  // Create the browser window:
  win = new electron_1.BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve ? true : false,
      contextIsolation: false, // false if you want to run e2e tests with Spectron
      // enableRemoteModule: true, // true if you want to run e2e tests with Spectron or use remote module in renderer context (i.e. Angular apps)
    },
  });
  if (serve) {
    win.webContents.openDevTools();
    require("electron-reload")(__dirname, {
      electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    });
    win.loadURL("http://localhost:4200");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/boilerplate-monorepo/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }
  // Emitted when the window is closed.
  win.on("closed", function () {
    // Deference from the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win.off;
  });
  return win;
}
try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400ms to fix the black background issue while using a transparent window.
  electron_1.app.on("ready", function () {
    return setTimeout(createWindow, 400);
  });
  // Quit when all windows are closed.
  electron_1.app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      electron_1.app.quit();
    }
  });
  electron_1.app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // handle error
}
//# sourceMappingURL=main.js.map
