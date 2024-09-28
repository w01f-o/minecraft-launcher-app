import path from 'node:path';
import { app } from 'electron';

export const minecraftDirectory = path.join(app.getPath('userData'), 'minecraft-game');
export const javasDirectory = path.join(app.getPath('userData'), 'minecraft-game', 'javas');
