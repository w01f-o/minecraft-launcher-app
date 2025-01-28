import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastItem } from '@renderer/types/ToastItem.type';
import * as uuid from 'uuid';

export interface State {
  items: ToastItem[];
}

const initialState: State = {
  items: [],
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState: initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<ToastItem, 'id'>>) => {
      state.items.push({
        ...action.payload,
        id: uuid.v4(),
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToast: addToastAction, removeToast: removeToastAction } =
  toastSlice.actions;
export default toastSlice.reducer;
