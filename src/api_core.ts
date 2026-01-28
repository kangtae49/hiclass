import {
  app, BrowserWindow, powerMonitor, ipcMain, shell, dialog,
  type IpcMainEvent,
  type IpcMainInvokeEvent,
} from 'electron'
import path from 'node:path';
import {SCRIPT_DIR} from "./constants.ts";
import * as fs from 'fs';
import {Env, DragStartItem, DialogResult, Versions, AppInfo} from "./types.ts";
import * as os from "node:os";
import {ExcalidrawData} from "@/app/excalidraw-data/excalidrawData.types.ts";
import {ExcalidrawState} from "@/app/excalidraw/excalidraw.types.ts";
import {FileWatcher} from "@/file_watcher.ts";
import {JsonData} from "@/app/json-data/jsonData.types.ts";


// const START_DRAG_IMG = nativeImage.createFromPath(getIconSubPath('download.png'))
const START_DRAG_IMG = getIconSubPath('assets/download.png')


export function handleEcho(_event: IpcMainInvokeEvent, message: string) {
    return message;
}
export function handleSetFullScreen(window: BrowserWindow, flag: boolean) {
  console.log('handleSetFullScreen', flag)
  window.setFullScreen(flag)
}

export function handleIsFullScreen(window: BrowserWindow) {
  return window.isFullScreen()
}
export function handleIsMaximized(window: BrowserWindow) {
  return window.isMaximized()
}

export function handleExistsFile(_event: IpcMainInvokeEvent, filePath: string) {
  return fs.existsSync(filePath)
}

export function getVersions(): Versions {
  return {
    isPackaged: app.isPackaged,
    app: app.getVersion(),
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
    v8: process.versions.v8,
    osType: os.type(),
    osArch: os.arch(),
    osRelease: os.release(),
  };
}




export function handleReadExcalidraw(_event: IpcMainInvokeEvent, filePath: string) {
  return readExcalidraw(filePath);
}

export function handleReadJson(_event: IpcMainInvokeEvent, filePath: string) {
  return readJson(filePath);
}

export function handleStartFile(_event: IpcMainInvokeEvent, filePath: string) {
  startFile(filePath);
}

export function handleIsLockScriptPath(_event: IpcMainInvokeEvent, filePath: string) {
  return isLockScriptPath(filePath);
}

export function handleGetEnv() {
  const myEnv: Env = { ...process.env };
  return myEnv;
}

export function handleOpenSaveDialog(_event: IpcMainInvokeEvent, filePath: string, defaultName: string) {
  return openSaveDialog(filePath, defaultName);
}

export function handleUploadFile(_event: IpcMainInvokeEvent, sourcePath: string, targetPath: string) {
  return uploadFile(sourcePath, targetPath);
}
export function handleStartWatching(fileWatcher: FileWatcher) {
  fileWatcher.startWatching();
}
export function handleStopWatching(fileWatcher: FileWatcher) {
  fileWatcher.stopWatching();
}

export function handleAddWatchPath(fileWatcher: FileWatcher, watchPath: string[]) {
  fileWatcher.add(watchPath);
}
export function handleUnWatchPath(fileWatcher: FileWatcher, watchPath: string[]) {
  fileWatcher.unwatch(watchPath);
}





function readExcalidraw(filePath: string): ExcalidrawData | null {
  if (!fs.existsSync(filePath)) {
    return null
  }

  // if (isLockScriptPath(filePath)) {
  //   return null
  // }

  const fileBuffer = fs.readFileSync(filePath, 'utf8');
  const fileStats = fs.statSync(filePath);
  const timestamp = fileStats.mtime.getTime();

  const excalidrawState = JSON.parse(fileBuffer) as ExcalidrawState;

  return {
    path: filePath,
    timestamp,
    data: excalidrawState
  }
}

function readJson(filePath: string): JsonData | null {
  if (!fs.existsSync(filePath)) {
    return null
  }

  // if (isLockScriptPath(filePath)) {
  //   return null
  // }

  const fileBuffer = fs.readFileSync(filePath, 'utf8');
  const fileStats = fs.statSync(filePath);
  const timestamp = fileStats.mtime.getTime();

  const data = JSON.parse(fileBuffer);

  return {
    path: filePath,
    timestamp,
    data: data
  }
}

function getAppResourcePath() {
  if (app.isPackaged) {
    // app.getAppPath(): C:\Users\kkt\AppData\Local\e_dcp_cu\app-1.0.0\resources\app.asar
    return path.dirname(app.getAppPath())
  } else {
    return app.getAppPath()
  }
}

export function getIconSubPath(subpath: string) {
  if (app.isPackaged) {
    // app.getAppPath(): C:\Users\kkt\AppData\Local\e_dcp_cu\app-1.0.0\resources\app.asar
    return path.join(path.dirname(app.getAppPath()), subpath)
  } else {
    return path.join(app.getAppPath(), 'src', subpath)
  }

}

export function getResourceSubPath(subpath: string) {
  return path.join(getAppResourcePath(), subpath)
}

export function getScriptPath() {
  if (process.env.SCRIPT_DIR) {
    return process.env.SCRIPT_DIR
  }
  return path.join(getResourceSubPath(SCRIPT_DIR))
}


function isLockScriptPath(filePath: string) {
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const lockFileName = `~$${fileName}`;
  const lockFilePath = path.join(fileDir, lockFileName);
  return fs.existsSync(lockFilePath)
}




function startFile(filePath: string) {
  shell.openPath(filePath)
}





export function onDragStart(event: IpcMainEvent, item: DragStartItem) {
  try {
    const icon = START_DRAG_IMG
    const file = item.file
    console.log(file, icon)
    if (!fs.existsSync(file)) {
      console.error('Not Exists file: ', file);
      return;
    }
    event.sender.startDrag({
      file,
      icon,
    });

  } catch (e) {
    console.error('Native drag failed:', e);
  }
}

const onWindowMinimize = (window: BrowserWindow) => {
  window.minimize()
}
const onWindowMaximize = (window: BrowserWindow) => {
  window.maximize();
}

const onWindowUnMaximize = (window: BrowserWindow) => {
  window.unmaximize();
}


const onWindowClose = (window: BrowserWindow) => {
  window.close()
}


const openSaveDialog = async (filePath: string, defaultName: string): Promise<DialogResult> => {
  const { filePath: savePath, canceled } = await dialog.showSaveDialog({
    title: 'Save',
    defaultPath: defaultName,
    buttonLabel: 'Save',
    filters: [
      { name: 'Excel Files', extensions: ['xlsx'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (canceled || !savePath) {
    return { success: false, message: 'Cancel' };
  }

  try {
    fs.copyFileSync(filePath, savePath)
    return { success: true, file: savePath, message: 'Success' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

function uploadFile (sourcePath: string, targetPath: string) {
  if (!fs.existsSync(sourcePath)) {
    return
  }
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath)
  }
  fs.copyFileSync(sourcePath, targetPath)
}

export const getAppInfo = async (): Promise<AppInfo> => {
  return {
    versions: getVersions(),
    resourcePath: getAppResourcePath(),
    scriptPath: getScriptPath(),
  }
}

export const registerHandlers = async (mainWindow: BrowserWindow, fileWatcher: FileWatcher) => {
  ipcMain.handle('get-app-info', async (_event) => await getAppInfo())
  ipcMain.handle('get-env', handleGetEnv)
  ipcMain.handle('echo', handleEcho);
  ipcMain.handle('set-full-screen', (_event, flag) => handleSetFullScreen(mainWindow, flag))
  ipcMain.handle('is-full-screen', (_event) => handleIsFullScreen(mainWindow))
  ipcMain.handle('is-maximized', (_event) => handleIsMaximized(mainWindow))
  ipcMain.handle('read-excalidraw', handleReadExcalidraw);
  ipcMain.handle('read-json', handleReadJson);
  ipcMain.handle('start-file', handleStartFile);
  ipcMain.handle('exists-file', handleExistsFile);
  ipcMain.handle('is-lock-script-path', handleIsLockScriptPath)
  ipcMain.handle('open-save-dialog', handleOpenSaveDialog)
  ipcMain.handle('upload-file', handleUploadFile)
  ipcMain.handle('start-watching', (_event) => handleStartWatching(fileWatcher))
  ipcMain.handle('stop-watching', (_event) => handleStopWatching(fileWatcher))
  ipcMain.handle('add-watch-path', (_event, watchPath: string[]) => handleAddWatchPath(fileWatcher, watchPath))
  ipcMain.handle('un-watch-path', (_event, watchPath: string[]) => handleUnWatchPath(fileWatcher, watchPath))

  ipcMain.on('ondragstart', onDragStart);
  ipcMain.on('window-minimize', () => onWindowMinimize(mainWindow))
  ipcMain.on('window-maximize', () => onWindowMaximize(mainWindow))
  ipcMain.on('window-unmaximize', () => onWindowUnMaximize(mainWindow))
  ipcMain.on('window-close', () => onWindowClose(mainWindow))

  powerMonitor.on('suspend', () => mainWindow.webContents.send('on-suspend'))
  mainWindow.on('enter-full-screen', () => mainWindow.webContents.send('on-change-full-screen', true))
  mainWindow.on('leave-full-screen', () => mainWindow.webContents.send('on-change-full-screen', false))
  mainWindow.on('maximize', () => mainWindow.webContents.send('on-change-maximize', true))
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('on-change-maximize', false))
}
