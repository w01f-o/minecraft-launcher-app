import { app } from 'electron';
import { MainEvents } from '../enums/MainEventsEnum';
import { registerMainEvent } from './initializer';

const restartAppEvent = registerMainEvent({
  channel: MainEvents.RESTART_APP,
  callback: () => {
    app.relaunch();
    app.exit(0);
  },
});

export default restartAppEvent;
