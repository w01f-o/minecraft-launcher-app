import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  isDownloading: boolean;
}

const initialState: State = {
  isDownloading: false,
};

export const downloadStatusSlice = createSlice({
  name: 'downloadStatus',
  initialState,
  reducers: {
    setIsDownloading: (state, action: PayloadAction<boolean>) => {
      state.isDownloading = action.payload;
    },
  },
});

export const { setIsDownloading: setIsDownloadingAction } =
  downloadStatusSlice.actions;

export default downloadStatusSlice.reducer;
