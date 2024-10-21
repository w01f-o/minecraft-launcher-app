import { registerMainEvent } from './initializer';
import { MainEvents } from '../enums/MainEventsEnum';
import { getMainWindow } from '../index';

const debugWindowEvent = registerMainEvent({
  channel: MainEvents.DEBUG_WINDOW,
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

export default debugWindowEvent;
