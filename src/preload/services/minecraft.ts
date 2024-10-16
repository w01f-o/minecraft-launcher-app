import { DebugOptions, MinecraftApi, StartMinecraftOptions } from '../types/MinecraftApi';
import { Authenticator, Client, ILauncherOptions } from 'minecraft-launcher-core';
import * as electron from 'electron';
import { fabric, quilt } from 'tomate-loaders';
import log from 'electron-log/node';
import { getForgeConfig } from './forge';
import { MainInvokeEvents } from '../../main/enums/MainInvokeEventsEnum';
import { MainEvents } from '../../main/enums/MainEventsEnum';

export const minecraftApi: MinecraftApi = {
  launcher: new Client(),
  async start({
    navigateFunction,
    isDebugMode,
    isLauncherHide,
    setIsLoading,
    isFullscreen,
    clientOptions: {
      javaVersion,
      directoryName,
      modpackId,
      maxRam,
      username,
      modLoader,
      gameVersion,
      autoLogin,
    },
  }: StartMinecraftOptions) {
    navigateFunction('/loading');

    await electron.ipcRenderer.invoke(MainInvokeEvents.CHECK_MODPACK_UPDATES, {
      modpackId: modpackId,
      directoryName: directoryName,
    });

    const javaPath = await electron.ipcRenderer.invoke(MainInvokeEvents.CHECK_JAVA, javaVersion);
    const rootPath = await electron.ipcRenderer.invoke(
      MainInvokeEvents.GET_MINECRAFT_PATH,
      directoryName,
    );

    let modloaderConfig: {
      root: string;
      version: { number: string; type: string; custom?: string };
      forge?: string;
    };

    try {
      switch (modLoader) {
        case 'FABRIC':
          modloaderConfig = await fabric.getMCLCLaunchConfig({
            gameVersion: gameVersion,
            rootPath,
          });
          break;
        case 'QUILT':
          modloaderConfig = await quilt.getMCLCLaunchConfig({
            gameVersion: gameVersion,
            rootPath,
          });
          break;
        case 'FORGE':
          modloaderConfig = await getForgeConfig({
            gameVersion,
            rootPath,
          });

          break;
        default:
          log.error(`Invalid modloader: ${modLoader}`);

          throw new Error(`Invalid modloader: ${modLoader}`);
      }

      const launcherConfig: ILauncherOptions = {
        ...modloaderConfig,
        memory: {
          max: Math.round(maxRam / 1024 / 1024),
          min: 0,
        },
        authorization: Authenticator.getAuth(username),
        window: {
          fullscreen: isFullscreen,
        },
        javaPath,
        ...(autoLogin.isAutoLogin
          ? {
              quickPlay: {
                type: 'multiplayer',
                identifier: autoLogin.serverIp,
              },
            }
          : {}),
      };

      log.info('Minecraft will be started with: ', launcherConfig);

      this.launcher.once('arguments', (args) => {
        setIsLoading(false);
        log.info('Minecraft started with java arguments: ', args);

        if (isDebugMode) {
          navigateFunction('/debug');
        } else {
          navigateFunction('/');
        }

        if (isLauncherHide) {
          electron.ipcRenderer.send(MainEvents.HIDE_LAUNCHER, 'hide');

          this.launcher.once('close', () => {
            electron.ipcRenderer.send(MainEvents.HIDE_LAUNCHER, 'show');
          });
        }
      });

      this.launcher.on('progress', (e) => {
        log.info(`Minecraft with modpack '${directoryName}' loading progress: `, e);
        electron.ipcRenderer.send(MainEvents.MINECRAFT_LOADING_PROGRESS, e);
      });

      const process = await this.launcher.launch(launcherConfig);
      process?.on('close', () => {
        console.log('CLOSED');
      });
    } catch (e) {
      log.error(e);
      electron.ipcRenderer.send(MainEvents.PRELOAD_ERROR, e);
    }
  },
  debug({ setDebugInfo, isDebugMode }: DebugOptions) {
    if (isDebugMode) {
      const debugHandler = (e: string): void => {
        setDebugInfo((prev) => [...prev, e]);
      };

      const dataHandler = (e: string): void => {
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
