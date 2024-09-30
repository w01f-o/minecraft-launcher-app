import { ElectronAPI } from '@electron-toolkit/preload';
import { MinecraftApi } from './types/MinecraftApi';
import { UtilsApi } from './types/UtilsApi';

declare global {
  interface Window {
    electron: ElectronAPI;
    minecraft: MinecraftApi;
    utils: UtilsApi;
  }
}
