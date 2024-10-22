import { registerMainEvent } from './initializer';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';
import fs from 'node:fs';
import { minecraftDirectory } from '../constants/constants';
import path from 'node:path';

const getModpacksScreenshotsEvent = registerMainEvent({
  invoke: true,
  channel: MainInvokeEvents.GET_MODPACKS_SCREENSHOTS,
  callback: async () => {
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
  },
});

export default getModpacksScreenshotsEvent;
