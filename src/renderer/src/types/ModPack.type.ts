import { Mod } from './Mod.type';

export interface ModPack {
  id: string;
  name: string;
  version: string;
  description: string;
  thumbnail: string;
  mods: Mod[];
}
