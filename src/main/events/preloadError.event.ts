import { registerMainEvent } from './initializer';
import { MainEvents } from '../enums/MainEventsEnum';
import { getMainWindow } from '../index';

const preloadErrorEvent = registerMainEvent({
  channel: MainEvents.PRELOAD_ERROR,
  callback: (_event, error) => {
    const mainWindow = getMainWindow();

    mainWindow.webContents.send('unhandled-error', error);
  },
});

export default preloadErrorEvent;
