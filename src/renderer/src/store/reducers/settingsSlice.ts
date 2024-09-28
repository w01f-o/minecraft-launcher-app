import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  isDebugMode: boolean;
  isFullscreen: boolean;
  isAutoLogin: boolean;
  isLauncherHide: boolean;
  maxRam: number | null;
}

const initialState: State = {
  isAutoLogin: false,
  isDebugMode: false,
  isFullscreen: false,
  isLauncherHide: true,
  maxRam: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDebugMode: (state) => {
      if (!state.isDebugMode) {
        state.isLauncherHide = false;
      }

      state.isDebugMode = !state.isDebugMode;
    },
    toggleFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen;
    },
    toggleAutoLogin: (state) => {
      state.isAutoLogin = !state.isAutoLogin;
    },
    toggleLauncherHide: (state) => {
      if (!state.isLauncherHide) {
        state.isDebugMode = false;
      }

      state.isLauncherHide = !state.isLauncherHide;
    },
    setMaxRam: (state, action: PayloadAction<number>) => {
      state.maxRam = action.payload;
    },
  },
});

export const {
  toggleDebugMode: toggleDebugModeAction,
  toggleAutoLogin: toggleAutoLoginAction,
  toggleFullscreen: toggleFullscreenAction,
  setMaxRam: setMaxRamAction,
  toggleLauncherHide: toggleLauncherHideAction,
} = settingsSlice.actions;
export default settingsSlice.reducer;
