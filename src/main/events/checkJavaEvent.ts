import { registerMainEvent } from './initializer';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';
import os from 'node:os';
import path from 'node:path';
import { javasDirectory } from '../constants/constants';
import fs from 'node:fs';
import { BrowserWindow } from 'electron';
import log from 'electron-log/main';
import { unzipArchive } from '../utils/unzipeArchive';
import { getMainWindow } from '../index';

const checkJavaEvent = registerMainEvent({
  invoke: true,
  channel: MainInvokeEvents.CHECK_JAVA,
  callback: async (_event, javaVersion) => {
    const mainWindow = getMainWindow();
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
          os: os.platform(),
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
  },
});

export default checkJavaEvent;
