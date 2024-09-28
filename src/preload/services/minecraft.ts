import {
  DebugOptions,
  DownloadOptions,
  MinecraftApi,
  StartMinecraftOptions,
} from '../types/MinecraftApi';
import { Authenticator, Client } from 'minecraft-launcher-core';
import * as electron from 'electron';
import { fabric, forge, quilt } from 'tomate-loaders';

export const minecraftApi: MinecraftApi = {
  launcher: new Client(),
  async download({ setDownloadProgress, id, directoryName }: DownloadOptions) {
    electron.ipcRenderer.on('MINECRAFT_DOWNLOAD_PROGRESS', (_event, { state }) => {
      setDownloadProgress(state.percent * 100);
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

    await electron.ipcRenderer.invoke('CHECK_UPDATES', {
      modpackId: clientOptions.modpackId,
      directoryName: clientOptions.directoryName,
    });

    const rootPath = await electron.ipcRenderer.invoke(
      'GET_MINECRAFT_PATH',
      clientOptions.directoryName,
    );
    let modloaderConfig: {
      root: string;
      version: { number: string; type: string; custom: string };
    };

    switch (clientOptions.modLoader) {
      case 'FABRIC':
        modloaderConfig = await fabric.getMCLCLaunchConfig({
          gameVersion: clientOptions.gameVersion,
          rootPath,
        });
        break;
      case 'QUILT':
        modloaderConfig = await quilt.getMCLCLaunchConfig({
          gameVersion: clientOptions.gameVersion,
          rootPath,
        });
        break;
      case 'FORGE':
        modloaderConfig = await forge.getMCLCLaunchConfig({
          gameVersion: clientOptions.gameVersion,
          rootPath,
        });
        break;
      default:
        throw new Error('Invalid modloader');
    }

    this.launcher.once('arguments', () => {
      setIsLoading(false);

      if (isDebugMode) {
        navigateFunction('/debug');
      } else {
        navigateFunction('/');
      }

      if (isLauncherHide) {
        electron.ipcRenderer.send('HIDE_LAUNCHER', 'hide');

        this.launcher.on('close', () => {
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
      ...modloaderConfig,
      memory: {
        max: Math.round(clientOptions.maxRam / 1024 / 1024),
        min: 0,
      },
      authorization: Authenticator.getAuth(clientOptions.username),
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
