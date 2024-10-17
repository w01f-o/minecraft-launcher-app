import { registerMainEvent } from './initializer';
import { MainEvents } from '../enums/MainEventsEnum';
import path from 'node:path';
import { minecraftDirectory } from '../constants/constants';
import log from 'electron-log/main';
import { BrowserWindow } from 'electron';
import { unzipArchive } from '../utils/unzipeArchive';
import fs from 'node:fs';
import { getMainWindow } from '../index';

const downloadModpackEvent = registerMainEvent({
  channel: MainEvents.DOWNLOAD_MODPACK,
  callback: async (_event, options: { id: string; directoryName: string }) => {
    try {
      const { download } = await import('electron-dl');
      const mainWindow = getMainWindow();

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
});

export default downloadModpackEvent;
