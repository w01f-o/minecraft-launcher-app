import { app, BrowserWindow, protocol, shell } from 'electron';
import { join } from 'path';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import * as path from 'node:path';
import * as fs from 'node:fs';
import log from 'electron-log/main';
import { javasDirectory, minecraftDirectory } from './constants/constants';
import { autoUpdater } from 'electron-updater';
import * as os from 'node:os';
import { initializeMainEvents } from './events/initializer';

(async (): Promise<void> => {
  const { default: unhandled } = await import('electron-unhandled');

  unhandled({
    logger: (error) => {
      log.error(error);
      BrowserWindow.getFocusedWindow()?.webContents.send('unhandled-error', error);
    },
  });
})();

log.transports.file.maxSize = 50 * 1024 * 1024;
log.initialize({
  spyRendererConsole: true,
});

let mainWindow: BrowserWindow | null = null;

export const getMainWindow = (): BrowserWindow => {
  if (!mainWindow) throw new Error('Main window is not set');

  return mainWindow;
};

const createMainWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 730,
    minHeight: 730,
    minWidth: 1100,
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
    mainWindow!.show();
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

  initializeMainEvents();
};

const createLoadingWindow = (): void => {
  const loadingWindow = new BrowserWindow({
    width: 400,
    height: 350,
    show: false,
    autoHideMenuBar: true,
    title: 'The Chocolate Thief - loading...',
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
    },
    frame: false,
    resizable: false,
  });

  loadingWindow.on('ready-to-show', () => {
    loadingWindow.show();
  });

  loadingWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loadingWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/loading.html`);
  } else {
    loadingWindow.loadFile(join(__dirname, '../renderer/loading.html'));
  }
};

app.whenReady().then(async () => {
  log.info('Launcher is ready, client hardware information: ', {
    cpu: `${os.cpus()[0].model.trim()} (${os.cpus()[0].speed} MHz)`,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
  });

  if (!fs.existsSync(minecraftDirectory)) {
    fs.mkdirSync(minecraftDirectory);
    log.debug(`Created minecraft directory: ${minecraftDirectory}`);
  }

  if (!fs.existsSync(javasDirectory)) {
    fs.mkdirSync(javasDirectory);
    log.debug(`Created java directory: ${javasDirectory}`);
  }

  electronApp.setAppUserModelId('com.thechocolatethief.app');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createLoadingWindow();

  const updateResult = await autoUpdater.checkForUpdates();

  if (updateResult === null) {
    BrowserWindow.getAllWindows().forEach((win) => win.close());
    createMainWindow();
  } else {
    autoUpdater.on('update-downloaded', (event) => {
      log.info('Update downloaded: ', event);

      autoUpdater.quitAndInstall(true, true);
    });
  }

  protocol.handle('client-screenshots', async (request) => {
    const url = request.url.replace('client-screenshots://', '');
    const filePath = path.join(minecraftDirectory, url);

    try {
      const file = fs.readFileSync(filePath);
      log.debug('Sending screenshot: ', {
        url,
        filePath,
      });

      return new Response(file, {
        headers: { 'Content-Type': 'image/png' },
      });
    } catch (error) {
      log.error(error);
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
