import { DebugOptions, MinecraftApi, StartMinecraftOptions } from '../../types/MinecraftApi';
import { Authenticator, Client } from 'minecraft-launcher-core';
import * as electron from 'electron';

export const minecraftApi: MinecraftApi = {
  launcher: new Client(),
  start({
    setIsLoading,
    isFullscreen,
    isLauncherHide,
    navigateFunction,
    isDebugMode,
  }: StartMinecraftOptions) {
    this.launcher.launch({
      root: './minecraft',
      version: {
        number: '1.14',
        type: 'release',
      },
      memory: {
        max: '6G',
        min: '4G',
      },
      authorization: Authenticator.getAuth('w01f'),
      window: {
        fullscreen: isFullscreen,
      },
    });

    if (isDebugMode) {
      navigateFunction('/debug');
    }

    this.launcher.once('download', () => {
      setIsLoading(false);

      if (isLauncherHide) {
        electron.ipcRenderer.send('HIDE_LAUNCHER', 'hide');
        this.launcher.once('close', () => {
          electron.ipcRenderer.send('HIDE_LAUNCHER', 'show');
        });
      }
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
