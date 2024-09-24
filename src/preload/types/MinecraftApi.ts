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
}

export interface DebugOptions {
  isDebugMode: boolean;
  setDebugInfo: Dispatch<SetStateAction<string[]>>;
}

export interface MinecraftApi {
  launcher: Client;
  start: (options: StartMinecraftOptions) => void;
  debug: (options: DebugOptions) => void;
}
