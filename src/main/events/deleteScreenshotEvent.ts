import { registerMainEvent } from './initializer';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';
import fs from 'node:fs';
import path from 'node:path';
import { minecraftDirectory } from '../constants/constants';

const deleteScreenshotEvent = registerMainEvent({
  invoke: true,
  channel: MainInvokeEvents.DELETE_SCREENSHOT,
  callback: async (_e, screenshotPath) => {
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
  },
});

export default deleteScreenshotEvent;
