import { DebugOptions, MinecraftApi, StartMinecraftOptions } from '../types/MinecraftApi';
import { Authenticator, Client } from 'minecraft-launcher-core';
import * as electron from 'electron';
import { fabric } from 'tomate-loaders';

export const minecraftApi: MinecraftApi = {
  launcher: new Client(),
  async start({
    setIsLoading,
    isFullscreen,
    isLauncherHide,
    navigateFunction,
    isDebugMode,
  }: StartMinecraftOptions) {
    const minecraftDirectory: string = './minecraft';

    if (isDebugMode) {
      navigateFunction('/debug');
    }

    const fabricConfig = await fabric.getMCLCLaunchConfig({
      gameVersion: '1.20.1',
      rootPath: minecraftDirectory,
    });

    this.launcher.once('download', () => {
      setIsLoading(false);

      if (isLauncherHide) {
        electron.ipcRenderer.send('HIDE_LAUNCHER', 'hide');
        this.launcher.once('close', () => {
          electron.ipcRenderer.send('HIDE_LAUNCHER', 'show');
        });
      }
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
