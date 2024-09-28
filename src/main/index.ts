import { app, BrowserWindow, dialog, ipcMain, protocol, shell } from 'electron';
import { join } from 'path';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import * as path from 'node:path';
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
    'DOWNLOAD_MINECRAFT',
    async (_event, options: { id: string; directoryName: string }) => {
      console.log(options.directoryName);
      const { download } = await import('electron-dl');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const url = `${import.meta.env.VITE_API_URL}/modpack/download/${options.id}`;
      const directory = path.join(minecraftDirectory, options.directoryName);

      const downloadItem = await download(BrowserWindow.getFocusedWindow() ?? mainWindow, url, {
        directory,
        onProgress: (state) =>
          mainWindow.webContents.send('MINECRAFT_DOWNLOAD_PROGRESS', { state, id: options.id }),
        saveAs: false,
        onStarted: () => {
          mainWindow.webContents.send('MINECRAFT_DOWNLOAD_STARTED', options.id);
        },
        onCompleted: () => {
          mainWindow.webContents.send('MINECRAFT_DOWNLOAD_COMPLETED', options.id);
        },
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

      if (!fs.existsSync(pathToScreenshotFolder)) {
        continue;
      }
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

  ipcMain.handle('DELETE_SCREENSHOT', async (_e, screenshotPath) => {
    try {
      fs.rmSync(path.join(minecraftDirectory, screenshotPath));

      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  });

  ipcMain.handle(
    'CHECK_UPDATES',
    async (_event, { modpackId, directoryName }: { modpackId: string; directoryName: string }) => {
      const hashesFileDir = path.join(minecraftDirectory, directoryName, 'launcher-hashes.json');
      const hashesFileContent = fs.readFileSync(hashesFileDir, 'utf8');
      const hashes = JSON.parse(hashesFileContent);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const url = `${import.meta.env.VITE_API_URL}/modpack/check_update/${modpackId}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hashes),
      });

      if (res.ok) {
        const { downloadLink, toDelete } = await res.json();

        if (toDelete.length > 0) {
          for (const file of toDelete) {
            fs.rmSync(path.join(minecraftDirectory, file));
          }
        }

        if (downloadLink) {
          const { download } = await import('electron-dl');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          const downloadUrl = `${import.meta.env.VITE_API_URL}/modpack/get_update/${downloadLink}`;
          const directory = path.join(minecraftDirectory, directoryName);

          const downloadItem = await download(
            BrowserWindow.getFocusedWindow() ?? mainWindow,
            downloadUrl,
            {
              directory,
              onProgress: (state) => {
                mainWindow.webContents.send('LAUNCHER_LOADING_PROGRESS', {
                  total: state.totalBytes,
                  task: state.transferredBytes,
                });
              },
            },
          );

          const archivePath = downloadItem.savePath;
          try {
            await unzipArchive(archivePath, directory);
            fs.rmSync(archivePath);
          } catch (error) {
            console.error('Error while unpacking the archive:', error);
          }
        }
      }

      return;
    },
  );

  ipcMain.handle('DELETE_MODPACK', async (_event, directoryName) => {
    const dir = path.join(minecraftDirectory, directoryName);

    try {
      fs.rmSync(dir, { recursive: true });

      return { isSuccess: true };
    } catch (error) {
      return { isSuccess: false, error };
    }
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
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
