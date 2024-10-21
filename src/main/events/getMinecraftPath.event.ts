import { registerMainEvent } from './initializer';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';
import path from 'node:path';
import { minecraftDirectory } from '../constants/constants';
import fs from 'node:fs';

const getMinecraftPathEvent = registerMainEvent({
  invoke: true,
  channel: MainInvokeEvents.GET_MINECRAFT_PATH,
  callback: (_event, directoryName: string) => {
    const dir = path.join(minecraftDirectory, directoryName);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    return dir;
  },
});

export default getMinecraftPathEvent;
