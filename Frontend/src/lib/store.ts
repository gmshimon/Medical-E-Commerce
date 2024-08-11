import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import userSlice from './features/userSlice'
import cartSlice from './features/cartSlice'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const reducer = combineReducers({
  user: userSlice,
  cart: cartSlice
})
const persistedReducers = persistReducer(persistConfig, reducer)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
