import cartInterface from '@/Interface/cart.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cartState {
  carts: cartInterface[]
  isCartItemAdded: boolean
}

const initialState: cartState = {
  carts: [],
  isCartItemAdded: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: state => {
      state.isCartItemAdded = false
    },
    addItems: (state, action: PayloadAction<cartInterface>) => {
      const existingItem = state.carts.find(
        item =>
          item.name === action.payload.name &&
          item.variant === action.payload.variant
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
        existingItem.totalPrice = existingItem.quantity * action.payload.price
      } else {
        state.carts.push({
          ...action.payload,
          quantity: action.payload.quantity
        })
      }

      state.isCartItemAdded = true
    },
    incrementQuantity: (
      state,
      action: PayloadAction<cartInterface>
    ) => {
      const existingItem = state.carts.find(
        item =>
          item.name === action.payload.name &&
          item.variant === action.payload.variant
      )

      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice = existingItem.quantity * action.payload.price
      }
    },
    decrementQuantity: (state, action: PayloadAction<cartInterface>) => {
        const existingItem = state.carts.find(item => item.name === action.payload.name && item.variant === action.payload.variant);
        
        if (existingItem) {
          if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
            existingItem.totalPrice = existingItem.totalPrice - action.payload.price
          } else {
            // Optionally remove the item if quantity becomes zero
            state.carts = state.carts.filter(item => item.name !== action.payload.name || item.variant !== action.payload.variant);
          }
        }
      },
  },
  extraReducers: builder => {
    // Handle other action types here
    // builder.addCase
  }
})

export const { addItems, reset,incrementQuantity,decrementQuantity } = cartSlice.actions

export default cartSlice.reducer
