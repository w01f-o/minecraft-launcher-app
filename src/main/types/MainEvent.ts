import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { MainEvents } from '../enums/MainEventsEnum';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';

export type MainEventParams =
  | {
      invoke?: false;
      channel: MainEvents;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (event: IpcMainEvent, ...args: any[]) => Promise<any> | any;
      once?: boolean;
    }
  | {
      invoke: true;
      channel: MainInvokeEvents;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any> | any;
      once?: boolean;
    };

export class MainEvent {
  public constructor(params: MainEventParams) {
    const { channel, callback, once, invoke } = params;

    if (invoke) {
      console.log(`Invoke: ${channel}`);
      once ? ipcMain.handleOnce(channel, callback) : ipcMain.handle(channel, callback);
    } else {
      console.log(`Default: ${channel}`);
      once ? ipcMain.once(channel, callback) : ipcMain.on(channel, callback);
    }
  }
}