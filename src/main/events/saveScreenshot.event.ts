import { registerMainEvent } from './initializer';
import { MainEvents } from '../enums/MainEventsEnum';
import { dialog } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { minecraftDirectory } from '../constants/constants';
import log from 'electron-log/main';

const saveScreenshotEvent = registerMainEvent({
  channel: MainEvents.SAVE_SCREENSHOT,
  callback: async (_e, screenshotPath) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: path.basename(screenshotPath),
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
    });

    if (canceled || !filePath) {
      return;
    }

    try {
      const file = fs.readFileSync(
        path.join(minecraftDirectory, screenshotPath)
      );
      fs.writeFileSync(filePath, file);
    } catch (error) {
      log.error('Error saving screenshot:', error);
    }
  },
});

export default saveScreenshotEvent;
