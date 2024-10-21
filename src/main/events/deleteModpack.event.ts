import { registerMainEvent } from './initializer';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';
import path from 'node:path';
import { minecraftDirectory } from '../constants/constants';
import fs from 'fs/promises';
import log from 'electron-log/main';

const deleteModpackEvent = registerMainEvent({
  invoke: true,
  channel: MainInvokeEvents.DELETE_MODPACK,
  callback: async (_event, directoryName) => {
    const dir = path.join(minecraftDirectory, directoryName);

    try {
      await fs.rm(dir, { recursive: true });
      log.info(`Deleted modpack: ${directoryName}`);

      return { isSuccess: true };
    } catch (error) {
      log.error(`Error while deleting modpack '${directoryName}': `, error);

      return { isSuccess: false, error };
    }
  },
});

export default deleteModpackEvent;
