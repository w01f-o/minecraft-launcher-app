import { registerMainEvent } from './initializer';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';
import log from 'electron-log/main';
import { dialog } from 'electron';
import { formatDate } from '../utils/formatDate';
import JSZip from 'jszip';
import fs from 'node:fs';
import { minecraftDirectory } from '../constants/constants';
import path from 'node:path';
import { addDirectoryToArchive } from '../utils/addDirectoryToArchive';

const getLauncherLogsEvent = registerMainEvent({
  invoke: true,
  channel: MainInvokeEvents.GET_LAUNCHER_LOGS,
  callback: async () => {
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
          const pathToLogsFolder = path.join(
            minecraftDirectory,
            modpack,
            'logs'
          );
          const pathToCrashReportsFolder = path.join(
            minecraftDirectory,
            modpack,
            'crash-reports'
          );

          if (fs.existsSync(pathToLogsFolder)) {
            addDirectoryToArchive(zip, pathToLogsFolder, `${modpack}/logs`);
          }

          if (fs.existsSync(pathToCrashReportsFolder)) {
            addDirectoryToArchive(
              zip,
              pathToCrashReportsFolder,
              `${modpack}/crash-reports`
            );
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
  },
});

export default getLauncherLogsEvent;
