import { registerMainEvent } from './initializer';
import { MainEvents } from '../enums/MainEventsEnum';
import { getMainWindow } from '../index';

const minecraftLoadingProgressEvent = registerMainEvent({
  channel: MainEvents.MINECRAFT_LOADING_PROGRESS,
  callback: (_event, progress) => {
    const mainWindow = getMainWindow();

    mainWindow.webContents.send(MainEvents.MINECRAFT_LOADING_PROGRESS, progress);
  },
});

export default minecraftLoadingProgressEvent;
