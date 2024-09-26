import { UtilsApi } from '../types/UtilsApi';
import os from 'node:os';

export const utilsApi: UtilsApi = {
  getMemory: () => {
    return os.totalmem();
  },
  getHwid: async () => {
    const { getHWID } = await import('hwid');

    return await getHWID();
  },
};
