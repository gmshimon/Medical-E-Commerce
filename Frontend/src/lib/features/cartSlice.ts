import cartInterface from '@/Interface/cart.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cartState {
  carts: cartInterface[] | null
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
    setCartNull:state=>{
      state.carts = []
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
        existingItem.totalDiscount = existingItem.quantity * action.payload.discount
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
        existingItem.totalDiscount = existingItem.quantity * existingItem.discount
      }
    },
    decrementQuantity: (state, action: PayloadAction<cartInterface>) => {
        const existingItem = state.carts.find(item => item.name === action.payload.name && item.variant === action.payload.variant);
        
        if (existingItem) {
          if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
            existingItem.totalPrice = existingItem.totalPrice - action.payload.price
            existingItem.totalDiscount = existingItem.quantity * existingItem.discount
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

export const { addItems, reset,incrementQuantity,decrementQuantity,setCartNull } = cartSlice.actions

export default cartSlice.reducer
