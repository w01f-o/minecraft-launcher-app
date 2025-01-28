import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { MainInvokeEvents } from '../enums/MainInvokeEventsEnum';

export type MainInvokeEventParams = {
  channel: MainInvokeEvents;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any> | any;
  once?: boolean;
};

export class MainInvokeEvent {
  public constructor(params: MainInvokeEventParams) {
    const { channel, callback, once } = params;

    if (once) {
      ipcMain.handleOnce(channel, callback);
    } else {
      ipcMain.handle(channel, callback);
    }
  }
}
