import { combineReducers, configureStore } from '@reduxjs/toolkit'
import minecraftReducer from './reducers/minecraftSlice'
import settingsReducer from './reducers/settingsSlice'
import specsReducer from './reducers/specsSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  minecraft: minecraftReducer,
  settings: settingsReducer,
  specs: specsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'specs']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
