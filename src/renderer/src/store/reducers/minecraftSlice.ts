import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModPack } from '../../types/ModPack.type'

export interface State {
  currentModPack: ModPack | null
}

const initialState: State = {
  currentModPack: null
}

export const minecraftSlice = createSlice({
  name: 'minecraft',
  initialState,
  reducers: {
    setCurrentModPack: (state, action: PayloadAction<ModPack>) => {
      state.currentModPack = action.payload
    }
  }
})

export const { setCurrentModPack } = minecraftSlice.actions
export default minecraftSlice.reducer
