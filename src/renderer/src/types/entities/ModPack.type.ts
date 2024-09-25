import { Mod } from './Mod.type';
import { Screenshot } from './Screenshot.type';
import { Update } from './Update.type';

export interface ModPack {
  id: string;
  name: string;
  description: string;
  screenshots: Screenshot[];
  thumbnail: string;
  minecraftVersion: string;
  directoryName: string;
  modLoader: string;
  mods: Mod[] | null;
  updates: Update[];
  isDownloaded: boolean;
  isActual: boolean;
  isUpdated: boolean;
  size: number;
}
