import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  totalRam: number | null;
}

const initialState: State = {
  totalRam: null,
};

export const specsSlice = createSlice({
  name: 'specs',
  initialState,
  reducers: {
    setTotalRam: (state, action: PayloadAction<number>) => {
      state.totalRam = action.payload;
    },
  },
});

export const { setTotalRam } = specsSlice.actions;
export default specsSlice.reducer;
