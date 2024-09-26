export interface UtilsApi {
  getMemory: () => number;
  getHwid: () => Promise<string>;
}
