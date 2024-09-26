export interface Mod {
  id: string;
  name: string;
  version: string;
  minecraftVersion: string;
  description: string;
  url: string;
  thumbnail: string | null;
  modrinthSlug: string;
}
