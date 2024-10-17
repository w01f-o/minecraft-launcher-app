import { registerMainEvent } from './initializer';
import { MainEvents } from '../enums/MainEventsEnum';
import { getMainWindow } from '../index';

const hideLauncherEvent = registerMainEvent({
  channel: MainEvents.HIDE_LAUNCHER,
  callback: (_event, args: 'hide' | 'show') => {
    const mainWindow = getMainWindow();

    switch (args) {
      case 'hide':
        mainWindow.hide();
        break;

      case 'show':
        mainWindow.show();
        break;
    }
  },
});

export default hideLauncherEvent;
