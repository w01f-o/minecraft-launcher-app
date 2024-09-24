import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  isDebugMode: boolean;
  isFullscreen: boolean;
  isAutoLogin: boolean;
  maxRam: number | null;
}

const initialState: State = {
  isAutoLogin: false,
  isDebugMode: false,
  isFullscreen: false,
  maxRam: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDebugMode: (state) => {
      state.isDebugMode = !state.isDebugMode;
    },
    toggleFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen;
    },
    toggleAutoLogin: (state) => {
      state.isAutoLogin = !state.isAutoLogin;
    },
    setMaxRam: (state, action: PayloadAction<number>) => {
      state.maxRam = action.payload;
    },
  },
});

export const { toggleDebugMode, toggleAutoLogin, toggleFullscreen, setMaxRam } =
  settingsSlice.actions;
export default settingsSlice.reducer;
