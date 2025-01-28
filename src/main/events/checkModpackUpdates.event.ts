import { registerMainEvent } from './initializer';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';
import path from 'node:path';
import { minecraftDirectory } from '../constants/constants';
import fs from 'node:fs';
import log from 'electron-log/main';
import { CheckUpdateResult } from '../types/CheckUpdateResult';
import os from 'node:os';
import { BrowserWindow } from 'electron';
import { unzipArchive } from '../utils/unzipeArchive';
import { getMainWindow } from '../index';
import { MainEvents } from '../enums/MainEventsEnum';

const checkModpackUpdatesEvent = registerMainEvent({
  invoke: true,
  channel: MainInvokeEvents.CHECK_MODPACK_UPDATES,
  callback: async (
    _event,
    { modpackId, directoryName }: { modpackId: string; directoryName: string }
  ) => {
    const mainWindow = getMainWindow();
    const hashesFileDir = path.join(
      minecraftDirectory,
      directoryName,
      'tct-launcher-metadata.json'
    );
    const hashesFileContent = fs.readFileSync(hashesFileDir, 'utf8');
    const hashes = JSON.parse(hashesFileContent);
    log.info(`Modpack '${directoryName}' hashes: `, hashes);

    const url = `${import.meta.env.VITE_API_URL}/updates/modpack/check/${modpackId}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hashes),
    });

    if (res.ok) {
      const checkUpdateResult: CheckUpdateResult = await res.json();

      log.debug('Update:', checkUpdateResult);

      const { toDelete, serverMetadata, downloadLink } = checkUpdateResult;

      if (toDelete.length) {
        toDelete.forEach((file: string) => {
          if (os.platform() === 'linux' || os.platform() === 'darwin') {
            file = file.replace(/\\/g, '/');
          }

          fs.rmSync(path.join(minecraftDirectory, file));
          log.debug('Deleted file from update:', file);
        });
      }

      if (serverMetadata !== null) {
        fs.writeFileSync(hashesFileDir, JSON.stringify(serverMetadata));
      }

      if (downloadLink !== null) {
        try {
          const { download } = await import('electron-dl');
          const downloadUrl = `${import.meta.env.VITE_API_URL}/updates/modpack/download/${downloadLink}`;
          const directory = path.join(minecraftDirectory, directoryName);

          const downloadItem = await download(
            BrowserWindow.getFocusedWindow() ?? mainWindow,
            downloadUrl,
            {
              directory,
              onProgress: state => {
                log.info(
                  `Downloading modpack '${directoryName}' update progress: `,
                  state
                );
                mainWindow.webContents.send(
                  MainEvents.MINECRAFT_LOADING_PROGRESS,
                  {
                    total: state.totalBytes,
                    task: state.transferredBytes,
                  }
                );
              },
              onStarted: () => {
                log.debug(`Downloading modpack '${directoryName}' update...`);
              },
            }
          );

          const archivePath = downloadItem.savePath;

          await unzipArchive(archivePath, directory);
          fs.rmSync(archivePath);

          log.debug(
            `Downloaded modpack '${directoryName}' update: `,
            downloadLink
          );
        } catch (error) {
          log.error(
            `Error while downloading modpack '${directoryName}' update: `,
            error
          );
        }
      }
    } else {
      log.error('Error while checking for updates', await res.text());
    }

    return;
  },
});

export default checkModpackUpdatesEvent;
