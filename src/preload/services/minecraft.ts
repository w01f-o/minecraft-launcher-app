import {
  DebugOptions,
  DownloadOptions,
  MinecraftApi,
  StartMinecraftOptions,
} from '../types/MinecraftApi';
import { Authenticator, Client } from 'minecraft-launcher-core';
import * as electron from 'electron';
import { fabric } from 'tomate-loaders';

export const minecraftApi: MinecraftApi = {
  launcher: new Client(),
  async download({ setDownloadProgress, id, directoryName }: DownloadOptions) {
    electron.ipcRenderer.on('download-progress', (_event, state) => {
      setDownloadProgress(state.percent * 100);
    });

    electron.ipcRenderer.on('download-error', (_event, error) => {
      console.log(error);
    });

    electron.ipcRenderer.send('MINECRAFT_DOWNLOAD', { id, directoryName });
  },
  async start({
    setIsLoading,
    isFullscreen,
    isLauncherHide,
    navigateFunction,
    isDebugMode,
    clientOptions,
  }: StartMinecraftOptions) {
    navigateFunction('/loading');

    electron.ipcRenderer.send('GET_MINECRAFT_PATH', clientOptions.directoryName);
    electron.ipcRenderer.once('MINECRAFT_PATH', async (_event, path) => {
      const rootPath: string = path;

      const fabricConfig = await fabric.getMCLCLaunchConfig({
        gameVersion: clientOptions.gameVersion,
        rootPath,
      });

      this.launcher.once('arguments', () => {
        setIsLoading(false);

        if (isDebugMode) {
          navigateFunction('/debug');
        } else {
          navigateFunction('/');
        }

        if (isLauncherHide) {
          electron.ipcRenderer.send('HIDE_LAUNCHER', 'hide');
          this.launcher.once('close', () => {
            electron.ipcRenderer.send('HIDE_LAUNCHER', 'show');
          });
        }
      });

      this.launcher.on('progress', (e) => {
        electron.ipcRenderer.send('LAUNCHER_LOADING_PROGRESS', e);
      });

      this.launcher.on('download-status', (e) => {
        console.log(e);
      });

      await this.launcher.launch({
        ...fabricConfig,
        memory: {
          max: '6G',
          min: '4G',
        },
        authorization: Authenticator.getAuth('w01f'),
        window: {
          fullscreen: isFullscreen,
        },
      });
    });
  },
  debug({ setDebugInfo, isDebugMode }: DebugOptions) {
    if (isDebugMode) {
      const debugHandler = (e: string): void => {
        console.log(e);
        setDebugInfo((prev) => [...prev, e]);
      };

      const dataHandler = (e: string): void => {
        console.log(e);
        setDebugInfo((prev) => [...prev, e]);
      };

      this.launcher.on('debug', debugHandler);
      this.launcher.on('data', dataHandler);

      this.launcher.once('close', () => {
        this.launcher.removeListener('debug', debugHandler);
        this.launcher.removeListener('data', dataHandler);
      });
    }
  },
};
