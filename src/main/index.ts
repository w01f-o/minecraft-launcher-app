import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { join } from 'path';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import * as path from 'node:path';
import { DownloadOptions } from '../preload/types/MinecraftApi';
import * as fs from 'node:fs';
import * as unzipper from 'unzipper';

export const minecraftDirectory = path.join(app.getPath('userData'), 'minecraft-game');

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
        console.log('Archive unpacked successfully');
      } catch (error) {
        console.error('Error while unpacking the archive:', error);
      }
    },
  );

  ipcMain.on('GET_MINECRAFT_PATH', (_event, directoryName: string) => {
    const dir = path.join(minecraftDirectory, directoryName);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    mainWindow.webContents.send('MINECRAFT_PATH', dir);
  });

  ipcMain.on('LAUNCHER_LOADING_PROGRESS', (_event, progress) => {
    mainWindow.webContents.send('LAUNCHER_LOADING_PROGRESS', progress);
  });
}

async function unzipArchive(archivePath: string, extractTo: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(archivePath)
      .pipe(unzipper.Extract({ path: extractTo }))
      .on('close', () => {
        console.log('Extraction complete');
        resolve();
      })
      .on('error', (error) => {
        console.error('Error during extraction:', error);
        reject(error);
      });
  });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
