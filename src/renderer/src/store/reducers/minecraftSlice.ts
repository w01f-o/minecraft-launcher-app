import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModPack } from '../../types/entities/ModPack.type';

export interface State {
  currentModPack: ModPack | null;
  downloadedModPacks: ModPack[];
  username: string | null;
}

const initialState: State = {
  currentModPack: null,
  downloadedModPacks: [],
  username: null,
};

export const minecraftSlice = createSlice({
  name: 'minecraft',
  initialState,
  reducers: {
    setCurrentModPack: (state, action: PayloadAction<ModPack>) => {
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
  },
});

export const { setCurrentModPack, addDownloadedModPacks, removeDownloadedModPacks, setUsername } =
  minecraftSlice.actions;
export default minecraftSlice.reducer;
