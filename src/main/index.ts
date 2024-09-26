import { app, BrowserWindow, dialog, ipcMain, protocol, shell } from 'electron';
import { join } from 'path';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import * as path from 'node:path';
import { DownloadOptions } from '../preload/types/MinecraftApi';
import * as fs from 'node:fs';

import { unzipArchive } from './utils/unzipeArchive';
import { minecraftDirectory } from './constants/constants';

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    minWidth: 1100,
    minHeight: 730,
    show: false,
    autoHideMenuBar: true,
    title: 'The Chocolate Thief',
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
    },
    frame: false,
    resizable: true,
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  ipcMain.on('TITLE_BAR_ACTION', (_event, args: 'minimize' | 'maximize' | 'close') => {
    switch (args) {
      case 'minimize':
        mainWindow.minimize();
        break;

      case 'maximize':
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
        break;

      case 'close':
        mainWindow.close();
        break;
    }
  });

  ipcMain.on('HIDE_LAUNCHER', (_event, args: 'hide' | 'show') => {
    switch (args) {
      case 'hide':
        mainWindow.hide();
        break;

      case 'show':
        mainWindow.show();
        break;
    }
  });

  ipcMain.on('DEBUG_WINDOW', (_event, args: 'hide' | 'show') => {
    switch (args) {
      case 'hide':
        mainWindow.hide();
        break;

      case 'show':
        mainWindow.show();
        break;
    }
  });

  ipcMain.on(
    'MINECRAFT_DOWNLOAD',
    async (_event, options: Omit<DownloadOptions, 'setDownloadProgress'>) => {
      const { download } = await import('electron-dl');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const url = `${import.meta.env.VITE_API_URL}/modpack/download/${options.id}`;
      const directory = path.join(minecraftDirectory, options.directoryName);

      const downloadItem = await download(BrowserWindow.getFocusedWindow() ?? mainWindow, url, {
        directory,
        onProgress: (state) => mainWindow.webContents.send('download-progress', state),
      });

      const archivePath = downloadItem.savePath;

      try {
        await unzipArchive(archivePath, directory);
        fs.rmSync(archivePath);
      } catch (error) {
        console.error('Error while unpacking the archive:', error);
      }
    },
  );

  ipcMain.handle('GET_MINECRAFT_PATH', (_event, directoryName: string) => {
    const dir = path.join(minecraftDirectory, directoryName);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    return dir;
  });

  ipcMain.on('LAUNCHER_LOADING_PROGRESS', (_event, progress) => {
    mainWindow.webContents.send('LAUNCHER_LOADING_PROGRESS', progress);
  });

  ipcMain.handle('GET_LAUNCHER_SCREENSHOTS', async () => {
    const modpacks = fs.readdirSync(minecraftDirectory);

    const screenshots: string[] = [];

    for (const modpack of modpacks) {
      const pathToScreenshotFolder = path.join(minecraftDirectory, modpack, 'screenshots');
      const screenshotsFromModpack = fs.readdirSync(pathToScreenshotFolder);

      for (const screenshot of screenshotsFromModpack) {
        const pathToScreenshot = path.join(modpack, 'screenshots', screenshot);

        screenshots.push(pathToScreenshot.replace(/\\/g, '/'));
      }
    }

    return screenshots;
  });

  ipcMain.on('SAVE_SCREENSHOT', async (_e, screenshotPath) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: path.basename(screenshotPath),
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
    });

    if (canceled || !filePath) {
      return;
    }

    try {
      const file = fs.readFileSync(path.join(minecraftDirectory, screenshotPath));
      fs.writeFileSync(filePath, file);
    } catch (error) {
      console.error('Error while saving screenshot:', error);
    }
  });

  ipcMain.on('DELETE_SCREENSHOT', async (_e, screenshotPath) => {
    try {
      fs.rmSync(path.join(minecraftDirectory, screenshotPath));
    } catch (error) {
      console.error('Error while saving screenshot:', error);
    }
  });

  ipcMain.on('OPEN_MODRINTH', (_e, link) => {
    shell.openExternal(`https://modrinth.com/${link}`);
  });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.thechocolatethief');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  protocol.handle('client-screenshots', async (request) => {
    const url = request.url.replace('client-screenshots://', '');
    const filePath = path.join(minecraftDirectory, url);

    try {
      const file = fs.readFileSync(filePath);

      return new Response(file, {
        headers: { 'Content-Type': 'image/png' },
      });
    } catch (error) {
      return new Response(null, {
        status: 404,
        statusText: 'File Not Found',
      });
    }
  });

  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));
  //
  // installExtension(REDUX_DEVTOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
