import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { minecraftApi } from './services/minecraft';
import { utilsApi } from './services/utils';

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('minecraft', minecraftApi);
    contextBridge.exposeInMainWorld('utils', utilsApi);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.minecraft = minecraftApi;
  // @ts-ignore (define in dts)
  window.utils = utilsApi;
}
