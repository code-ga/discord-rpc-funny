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
  // developers tools
  console.log(isDev);
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
      devTools: true,
    },
  });
  // mainWindow.webContents.openDevTools();

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

// listen the channel `message` and resend the received message to the renderer process
// ipcMain.on("messages", (event: IpcMainEvent, message: any) => {
//   console.log(message);
//   setTimeout(() => event.sender.send("message", "hi from electron"), 500);
// });
interface inputType {
  clientId: string;
  details: string;
  state: string;
  largeImageKey?: string;
  smallImageKey?: string;
  largeImageText?: string;
  smallImageText?: string;
}
ipcMain.on("startSet", async (event: IpcMainEvent, message: inputType) => {
  const client = new RPC.Client({ transport: "ipc" });
  const startTime = Date.now();
  if (!message.largeImageKey) {
    message.largeImageText = undefined;
  }
  if (!message.smallImageKey) {
    message.smallImageText = undefined;
  }
  client.on("ready", () => {
    client.setActivity({
      details: message.details,
      state: message.state,
      startTimestamp: startTime,
      largeImageKey: message.largeImageKey,
      largeImageText: message.largeImageText,
      smallImageKey: message.smallImageKey,
      smallImageText: message.smallImageText,
      instance: false,
    });

    ipcMain.on("stopSet", async (event: IpcMainEvent, _message: any) => {
      await client.clearActivity();

      // await client.login({ clientId: message.clientId });
      await client.destroy();
      event.sender.send("stopRpc", "stop set rpc");
    });
  });
  RPC.register(message.clientId);
  await client.login({
    clientId: message.clientId,
  });

  event.sender.send("startRpc", "start set rpc");
});
