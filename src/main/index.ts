import { app, BrowserWindow, dialog, ipcMain, protocol, shell } from 'electron';
import { join } from 'path';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import * as path from 'node:path';
import * as fs from 'node:fs';
import log from 'electron-log/main';

import { unzipArchive } from './utils/unzipeArchive';
import { javasDirectory, minecraftDirectory } from './constants/constants';
import { autoUpdater } from 'electron-updater';
import * as os from 'node:os';
import JSZip from 'jszip';
import { addDirectoryToArchive } from './utils/addDirectoryToArchive';
import { formatDate } from './utils/formatDate';

(async (): Promise<void> => {
  const { default: unhandled } = await import('electron-unhandled');

  unhandled({
    logger: (error) => {
      log.error(error);
      BrowserWindow.getFocusedWindow()?.webContents.send('unhandled-error', error);
    },
  });
})();

log.initialize({
  spyRendererConsole: true,
});

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

  ipcMain.on('PRELOAD_ERROR', (_event, error) => {
    mainWindow.webContents.send('unhandled-error', error);
  });

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
      try {
        const { download } = await import('electron-dl');

        const url = `${import.meta.env.VITE_API_URL}/modpacks/download/${options.id}`;
        const directory = path.join(minecraftDirectory, options.directoryName);

        log.debug(`Modpack '${directory}' downloading...`);
        mainWindow.webContents.send('MINECRAFT_DOWNLOAD_STARTED', options.id);

        const downloadItem = await download(BrowserWindow.getFocusedWindow() ?? mainWindow, url, {
          directory,
          onProgress: (state) => {
            log.info(`Modpack '${directory}' download progress: `, state);
            mainWindow.webContents.send('MINECRAFT_DOWNLOAD_PROGRESS', { state, id: options.id });
          },
          saveAs: false,
          onCompleted: () => {
            log.debug(`Modpack '${directory}' downloaded, unzipping...`);
          },
        });

        const archivePath = downloadItem.savePath;

        await unzipArchive(archivePath, directory);
        fs.rmSync(archivePath);

        mainWindow.webContents.send('MINECRAFT_DOWNLOAD_COMPLETED', options.id);
        log.debug(`Modpack '${directory}' unzipped`);
      } catch (error) {
        log.error('Error while downloading modpack: ', error);
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
      log.error('Error saving screenshot:', error);
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
      const hashesFileDir = path.join(
        minecraftDirectory,
        directoryName,
        'tct-launcher-metadata.json',
      );
      const hashesFileContent = fs.readFileSync(hashesFileDir, 'utf8');
      const hashes = JSON.parse(hashesFileContent);
      log.info(`Modpack '${directoryName}' hashes: `, hashes);

      const url = `${import.meta.env.VITE_API_URL}/updates/modpack/check_update/${modpackId}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hashes),
      });

      if (res.ok) {
        const json = await res.json();

        log.debug('Update:', json);

        if (json.toDelete.length > 0) {
          for (const file of json.toDelete) {
            fs.rmSync(path.join(minecraftDirectory, file));
            log.debug('Deleted file from update:', file);
          }
        }

        if (json.downloadLink) {
          try {
            const { download } = await import('electron-dl');
            const downloadUrl = `${import.meta.env.VITE_API_URL}/updates/download/${json.downloadLink}`;
            const directory = path.join(minecraftDirectory, directoryName);

            const downloadItem = await download(
              BrowserWindow.getFocusedWindow() ?? mainWindow,
              downloadUrl,
              {
                directory,
                onProgress: (state) => {
                  log.info(`Downloading modpack '${directoryName}' update progress: `, state);
                  mainWindow.webContents.send('LAUNCHER_LOADING_PROGRESS', {
                    total: state.totalBytes,
                    task: state.transferredBytes,
                  });
                },
                onStarted: () => {
                  log.debug(`Downloading modpack '${directoryName}' update...`);
                },
              },
            );

            const archivePath = downloadItem.savePath;

            await unzipArchive(archivePath, directory);
            fs.rmSync(archivePath);

            log.debug(`Downloaded modpack '${directoryName}' update: `, json.downloadLink);
          } catch (error) {
            log.error(`Error while downloading modpack '${directoryName}' update: `, error);
          }
        }
      } else {
        log.error('Error while checking for updates', await res.text());
      }

      return;
    },
  );

  ipcMain.handle('CHECK_JAVA', async (_event, javaVersion) => {
    const osEnum = {
      win32: 'WINDOWS',
      linux: 'LINUX',
      darwin: 'MACOS',
    };

    let javaPath: string;

    switch (os.platform()) {
      case 'win32':
        javaPath = path.join(javasDirectory, javaVersion, 'bin', 'javaw.exe');
        break;
      case 'darwin':
        javaPath = path.join(javasDirectory, javaVersion, 'Contents', 'Home', 'bin', 'java');
        break;
      case 'linux':
        javaPath = path.join(javasDirectory, javaVersion, 'bin', 'java');
        break;
      default:
        throw new Error(`Unsupported platform: ${os.platform()}`);
    }

    if (!fs.existsSync(javaPath)) {
      try {
        const { download } = await import('electron-dl');

        const javaUrl = `${import.meta.env.VITE_API_URL}/java/download?${new URLSearchParams({
          os: osEnum[os.platform()],
          architecture: os.arch(),
          version: javaVersion,
        })}`;
        const directory = path.join(javasDirectory, javaVersion);

        const downloadJava = await download(
          BrowserWindow.getFocusedWindow() ?? mainWindow,
          javaUrl,
          {
            directory,
            onProgress: (state) => {
              log.info(`Downloading java '${javaVersion}' progress: `, state);
              mainWindow.webContents.send('LAUNCHER_LOADING_PROGRESS', {
                total: state.totalBytes,
                task: state.transferredBytes,
              });
            },
            onStarted: () => {
              log.debug(`Downloading java '${javaVersion}': ...`);
            },
            onCompleted: () => {
              log.debug(`Java ${javaVersion} downloaded`);
            },
          },
        );
        const archivePath = downloadJava.savePath;

        await unzipArchive(archivePath, directory);
        fs.rmSync(archivePath);

        log.debug('Java path:', javaPath);

        fs.chmod(javaPath, 0o755, (err) => {
          if (err) {
            log.error(`Error while changing java permissions: ${err}`);
          } else {
            log.log(`Changed java permissions: ${javaPath}`);
          }
        });

        return javaPath;
      } catch (error) {
        log.error('Error while downloading java', error);
      }
    }

    log.debug('Java already exists:', javaPath);

    return javaPath;
  });

  ipcMain.handle('DELETE_MODPACK', async (_event, directoryName) => {
    const dir = path.join(minecraftDirectory, directoryName);

    try {
      fs.rmSync(dir, { recursive: true });
      log.info(`Deleted modpack: ${directoryName}`);

      return { isSuccess: true };
    } catch (error) {
      log.error(`Error while deleting modpack '${directoryName}': `, error);
      return { isSuccess: false, error };
    }
  });

  ipcMain.handle('GET_LOGS', async () => {
    const logsPath = log.transports.file.getFile().path;

    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: `TCTLauncher-${formatDate(new Date())}.zip`,
      filters: [{ name: 'Logs', extensions: ['zip'] }],
    });

    if (canceled || !filePath) {
      return {
        type: 'canceled',
        filePath: null,
      };
    }

    const zip = new JSZip();

    try {
      const mainLogFile = fs.readFileSync(logsPath);
      zip.file('main.log', mainLogFile);

      const modpacks = fs.readdirSync(minecraftDirectory);

      for (const modpack of modpacks) {
        if (modpack !== 'javas') {
          const pathToLogsFolder = path.join(minecraftDirectory, modpack, 'logs');
          const pathToCrashReportsFolder = path.join(minecraftDirectory, modpack, 'crash-reports');

          if (fs.existsSync(pathToLogsFolder)) {
            addDirectoryToArchive(zip, pathToLogsFolder, `${modpack}/logs`);
          }

          if (fs.existsSync(pathToCrashReportsFolder)) {
            addDirectoryToArchive(zip, pathToCrashReportsFolder, `${modpack}/crash-reports`);
          }
        }
      }

      const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(filePath, zipContent);
      log.info('Downloaded logs archive:', filePath);

      return {
        type: 'success',
        filePath,
      };
    } catch (error) {
      log.error('Error while creating log archive:', error);

      return {
        type: 'error',
        error,
      };
    }
  });
}

app.whenReady().then(() => {
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

  autoUpdater.checkForUpdatesAndNotify();

  const updateInterval = 60 * 60 * 1000;

  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify();
  }, updateInterval);

  electronApp.setAppUserModelId('com.thechocolatethief.app');

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

autoUpdater.on('update-available', (info) => {
  log.info('Update available', info);

  dialog.showMessageBox({
    title: 'Обновление доступно',
    message: 'Доступно новое обновление. Оно будет загружено в фоновом режиме.',
  });
});

autoUpdater.on('update-downloaded', (event) => {
  log.info('Update downloaded', event);

  dialog
    .showMessageBox({
      title: 'Обновление загружено',
      message: 'Обновление загружено. Приложение будет перезапущено для применения обновления.',
    })
    .then(() => {
      autoUpdater.quitAndInstall();
    });
});

autoUpdater.on('error', (err) => {
  log.error('Update error', err);

  dialog.showErrorBox('Ошибка обновления', `Ошибка при обновлении: ${err.message}`);
});
