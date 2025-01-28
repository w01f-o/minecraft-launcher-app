import { characterApi } from '@/renderer/entities/character/api/character.api';
import { modpacksApi } from '@/renderer/entities/modpack/api/modpacks.api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import downloadQueueReducer from './reducers/downloadQueueSlice';
import minecraftReducer from './reducers/minecraftSlice';
import settingsReducer from './reducers/settingsSlice';

const rootReducer = combineReducers({
  minecraft: minecraftReducer,
  settings: settingsReducer,
  downloadQueue: downloadQueueReducer,
  [modpacksApi.reducerPath]: modpacksApi.reducer,
  [characterApi.reducerPath]: characterApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'minecraft'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(modpacksApi.middleware)
      .concat(characterApi.middleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
