import { QueueItem } from '@/renderer/entities/modpack';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  downloadQueue: QueueItem | null;
}

const initialState: State = {
  downloadQueue: null,
};

export const downloadQueueSlice = createSlice({
  name: 'downloadStatus',
  initialState,
  reducers: {
    setDownloadQueue: (
      state,
      action: PayloadAction<Omit<QueueItem, 'downloadStatus'>>
    ) => {
      state.downloadQueue = {
        ...action.payload,
        downloadStatus: 0,
      };
    },
    removeFromDownloadQueue: state => {
      state.downloadQueue = null;
    },
    updateDownloadStatus: (state, action: PayloadAction<QueueItem>) => {
      state.downloadQueue = action.payload;
    },
  },
});

export const {
  removeFromDownloadQueue: removeFromDownloadQueueAction,
  setDownloadQueue: setDownloadQueueAction,
  updateDownloadStatus: updateDownloadStatusAction,
} = downloadQueueSlice.actions;

export default downloadQueueSlice.reducer;
