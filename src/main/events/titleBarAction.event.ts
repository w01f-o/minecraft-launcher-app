import { MainEvents } from '../enums/MainEventsEnum';
import { registerMainEvent } from './initializer';
import { getMainWindow } from '../index';

const titleBarActionEvent = registerMainEvent({
  channel: MainEvents.TITLE_BAR_ACTION,
  callback: (_event, args: 'minimize' | 'maximize' | 'close'): void => {
    const mainWindow = getMainWindow();

    switch (args) {
      case 'minimize':
        mainWindow.minimize();
        break;

      case 'maximize':
        mainWindow.isMaximized()
          ? mainWindow.unmaximize()
          : mainWindow.maximize();
        break;

      case 'close':
        mainWindow.close();
        break;
    }
  },
});

export default titleBarActionEvent;
