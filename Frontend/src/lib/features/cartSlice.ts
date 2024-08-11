import cartInterface from '@/Interface/cart.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cartState {
    carts:cartInterface[],
    isCartItemAdded: boolean,
}

const initialState: cartState = {
    carts: [],
    isCartItemAdded: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) =>{
            state.isCartItemAdded = false;
        },
        addItems: (state, action: PayloadAction<cartInterface>) => {
            console.log(action.payload);
            const existingItem = state.carts.find(item => item.name === action.payload.name);
            
            if (existingItem) {
              existingItem.quantity += action.payload.quantity;
            } else {
              state.carts.push({ ...action.payload, quantity: action.payload.quantity });
            }
            
            state.isCartItemAdded = true;
          },
    },
    extraReducers:builder=> {
        // Handle other action types here
        // builder.addCase
    },
})

export const { addItems, reset} = cartSlice.actions;

export default cartSlice.reducer;