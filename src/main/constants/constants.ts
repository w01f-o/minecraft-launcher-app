import { app } from 'electron';
import path from 'node:path';

export const minecraftDirectory = path.join(
  app.getPath('userData'),
  'minecraft'
);

export const javasDirectory = path.join(
  app.getPath('userData'),
  'minecraft',
  'javas'
);
