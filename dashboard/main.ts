import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the app
  mainWindow.loadURL("http://localhost:5173"); 
  // if (process.env.NODE_ENV === "development") {
  // } else {
  //   mainWindow.loadFile("index.html");
  // }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
