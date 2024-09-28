import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModPack } from '../../types/entities/ModPack.type';

export interface State {
  currentModPack: ModPack | null;
  downloadedModPacks: ModPack[];
  username: string | null;
  isDownloading: boolean;
}

const initialState: State = {
  currentModPack: null,
  downloadedModPacks: [],
  username: null,
  isDownloading: false,
};

export const minecraftSlice = createSlice({
  name: 'minecraft',
  initialState,
  reducers: {
    setCurrentModPack: (state, action: PayloadAction<ModPack | null>) => {
      state.currentModPack = action.payload;
    },
    addDownloadedModPacks: (state, action: PayloadAction<ModPack>) => {
      state.downloadedModPacks.push(action.payload);
    },
    removeDownloadedModPacks: (state, action: PayloadAction<ModPack>) => {
      state.downloadedModPacks = state.downloadedModPacks.filter(
        (modPack) => modPack.id !== action.payload.id,
      );
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setIsDownloading: (state, action: PayloadAction<boolean>) => {
      state.isDownloading = action.payload;
    },
  },
});

export const {
  setCurrentModPack: setCurrentModPackAction,
  addDownloadedModPacks: addDownloadedModPacksAction,
  removeDownloadedModPacks: removeDownloadedModPacksAction,
  setUsername: setUsernameAction,
  setIsDownloading: setIsDownloadingAction,
} = minecraftSlice.actions;
export default minecraftSlice.reducer;
