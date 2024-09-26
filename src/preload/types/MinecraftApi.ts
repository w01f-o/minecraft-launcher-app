import { Client } from 'minecraft-launcher-core';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export interface StartMinecraftOptions {
  isFullscreen: boolean;
  isAutoLogin: boolean;
  isLauncherHide: boolean;
  isDebugMode: boolean;
  navigateFunction: NavigateFunction;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  clientOptions: {
    gameVersion: string;
    directoryName: string;
    modLoader: string;
    username: string;
  };
}

export interface DebugOptions {
  isDebugMode: boolean;
  setDebugInfo: Dispatch<SetStateAction<string[]>>;
}

export interface DownloadOptions {
  directoryName: string;
  id: string;
  setDownloadProgress: Dispatch<SetStateAction<number | null>>;
}

export interface MinecraftApi {
  launcher: Client;
  download: (options: DownloadOptions) => void;
  start: (options: StartMinecraftOptions) => Promise<void>;
  debug: (options: DebugOptions) => void;
}
