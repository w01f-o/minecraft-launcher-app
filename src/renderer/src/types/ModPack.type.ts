import { Mod } from './Mod.type';
import { Update } from './Update.type';

export interface ModPack {
  id: string;
  name: string;
  description: string;
  screenshots: string[];
  thumbnail: string;
  version: string;
  directoryName: string;
  modLoader: string;
  mods: Mod[];
  updates: Update[];
  isDownloaded: boolean;
  isActual: boolean;
  isUpdated: boolean;
  size: number;
}
