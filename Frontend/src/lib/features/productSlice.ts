import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface productInterface {
  products: [] | null
  isProductCreateSuccess: boolean
  isProductCreateError: boolean
  isProductCreatePending: boolean
}

const initialState: productInterface = {
  products: null,
  isProductCreateSuccess: false,
  isProductCreateError: false,
  isProductCreatePending: false
}

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async productData => {
    const response = await axiosInstance.post(
      '/product/create-product',
      productData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data.data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: state => {
      state.isProductCreateSuccess = false
      state.isProductCreateError = false
      state.isProductCreatePending = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createProduct.pending, state => {
        state.isProductCreatePending = true
        state.isProductCreateError = false
        state.isProductCreateSuccess = false
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isProductCreatePending = false
        state.isProductCreateError = false
        state.isProductCreateSuccess = true
        state.products?.push(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isProductCreatePending = false
        state.isProductCreateError = true
        state.isProductCreateSuccess = false
      })
  }
})

export const { reset } = productSlice.actions
export default productSlice.reducer
