import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  currentModpack: string | null;
  downloadedModpacks: string[];
  username: string | null;
}

const initialState: State = {
  currentModpack: null,
  downloadedModpacks: [],
  username: null,
};

export const minecraftSlice = createSlice({
  name: 'minecraft',
  initialState,
  reducers: {
    setCurrentModPack: (state, action: PayloadAction<string | null>) => {
      state.currentModpack = action.payload;
    },
    addDownloadedModPacks: (state, action: PayloadAction<string>) => {
      state.downloadedModpacks.push(action.payload);
    },
    removeDownloadedModPacks: (state, action: PayloadAction<string>) => {
      state.downloadedModpacks = state.downloadedModpacks.filter(
        id => id !== action.payload
      );
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const {
  setCurrentModPack: setCurrentModPackAction,
  addDownloadedModPacks: addDownloadedModPacksAction,
  removeDownloadedModPacks: removeDownloadedModPacksAction,
  setUsername: setUsernameAction,
} = minecraftSlice.actions;
export default minecraftSlice.reducer;
