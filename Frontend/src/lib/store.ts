import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import userSlice from './features/userSlice'
import cartSlice from './features/cartSlice'
import storage from 'redux-persist/lib/storage'
import  categorySlice  from './features/categorySlice'
import  productSlice  from './features/productSlice'
import variantSlice from './features/variantSlice'
import orderSlice  from './features/orderSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const reducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  category:categorySlice,
  product:productSlice,
  variant:variantSlice,
  order:orderSlice
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
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
