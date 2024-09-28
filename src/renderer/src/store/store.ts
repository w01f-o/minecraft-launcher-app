import { combineReducers, configureStore } from '@reduxjs/toolkit';
import minecraftReducer from './reducers/minecraftSlice';
import settingsReducer from './reducers/settingsSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { modPacksApi } from '@renderer/services/modPacks.api';
import { characterApi } from '../services/character.api';

const rootReducer = combineReducers({
  minecraft: minecraftReducer,
  settings: settingsReducer,
  [modPacksApi.reducerPath]: modPacksApi.reducer,
  [characterApi.reducerPath]: characterApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'minecraft'],
};
// 'settings', 'minecraft'
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(modPacksApi.middleware)
      .concat(characterApi.middleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
