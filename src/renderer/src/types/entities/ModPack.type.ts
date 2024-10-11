import { Mod } from './Mod.type';
import { Screenshot } from './Screenshot.type';
import { ModLoaders } from '../../enums/ModLoaders.enum';

export interface ModPack {
  id: string;
  name: string;
  description: string;
  icon: string;
  directoryName: string;
  modLoader: ModLoaders;
  minecraftVersion: string;
  screenshots: Screenshot[];
  mods: Mod[];
  javaVersion: string;
  isDownloaded: boolean;
  isActual: boolean;
}
