import { UtilsApi } from '../types/UtilsApi'
import os from 'node:os'

export const utilsApi: UtilsApi = {
  getMemory: () => {
    return os.totalmem()
  }
}
