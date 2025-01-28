import { ModLoaders } from '@/renderer/shared/model';
import { Mod } from './Mod.type';
import { Screenshot } from './Screenshot.type';

export interface Modpack {
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
  author: string;
}
