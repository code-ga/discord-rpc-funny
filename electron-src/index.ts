// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import RPC from "discord-rpc";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
const client = new RPC.Client({ transport: "ipc" });
// listen the channel `message` and resend the received message to the renderer process
// ipcMain.on("messages", (event: IpcMainEvent, message: any) => {
//   console.log(message);
//   setTimeout(() => event.sender.send("message", "hi from electron"), 500);
// });
ipcMain.on("startSet", async (event: IpcMainEvent, message: any) => {
  const startTime = Date.now();
  console.log(message);
  client.on("ready", () => {
    client.setActivity({
      details: message.details,
      state: message.state,
      startTimestamp: startTime,
      largeImageKey: message.largeImageKey,
      largeImageText: message.largeImageText,
      smallImageKey: message.smallImageKey,
      smallImageText:
        message.smallImageText.length > 0
          ? message.smallImageText
          : message.largeImageText,
      instance: false,
    });
  });
  await client.login({ clientId: message.clientId });
  event.sender.send("startRpc", "start set rpc");
});
ipcMain.on("stopSet", async (event: IpcMainEvent, message: any) => {
  console.log(message);
  client.on("ready", () => {
    client.clearActivity();
  });
  await client.login({ clientId: message.clientId });
  event.sender.send("stopRpc", "stop set rpc");
})