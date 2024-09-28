import { Client } from 'minecraft-launcher-core';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { ModLoaders } from '../enums/ModLoaders.enum';

export interface StartMinecraftOptions {
  isFullscreen: boolean;
  isLauncherHide: boolean;
  isDebugMode: boolean;
  navigateFunction: NavigateFunction;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  clientOptions: {
    gameVersion: string;
    directoryName: string;
    modpackId: string;
    modLoader: ModLoaders;
    javaVersion: string;
    username: string;
    maxRam: number;
    autoLogin:
      | {
          isAutoLogin: true;
          serverIp: string;
        }
      | {
          isAutoLogin: false;
        };
  };
}

export interface DebugOptions {
  isDebugMode: boolean;
  setDebugInfo: Dispatch<SetStateAction<string[]>>;
}

export interface MinecraftApi {
  launcher: Client;
  start: (options: StartMinecraftOptions) => Promise<void>;
  debug: (options: DebugOptions) => void;
}
