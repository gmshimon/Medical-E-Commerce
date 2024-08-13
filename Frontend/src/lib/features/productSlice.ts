import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface productInterface {
  productID:String | null
  products: [] | null
  isProductCreateSuccess: boolean
  isProductCreateError: boolean
  isProductCreatePending: boolean
  isProductGetSuccess: boolean
  isProductGetError: boolean
  isProductGetPending: boolean
  isProductDeleteSuccess: boolean
  isProductDeleteError: boolean
  isProductDeletePending: boolean
  isProductUpdateSuccess: boolean
  isProductUpdateError: boolean
  isProductUpdatePending: boolean
}

const initialState: productInterface = {
  productID:null,
  products: null,
  isProductCreateSuccess: false,
  isProductCreateError: false,
  isProductCreatePending: false,
  isProductGetSuccess: false,
  isProductGetError: false,
  isProductGetPending: false,
  isProductDeleteSuccess:false,
  isProductDeleteError:false,
  isProductDeletePending:false,
  isProductUpdateSuccess: false,
  isProductUpdateError: false,
  isProductUpdatePending: false,
}

export const createProduct = createAsyncThunk(
  'createProduct',
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

export const getAllProduct = createAsyncThunk('getAllProduct',async()=>{
  const result = await axiosInstance.get('/product')
  return result.data.data
})

export const updateProduct = createAsyncThunk('updateProduct',async({id,data})=>{
  const token = JSON.parse(localStorage.getItem('userToken'))
  const result = await axiosInstance.put(`/product/update-product/${id}`,data,{
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
  return result.data
})

export const deleteProduct = createAsyncThunk('deleteProduct',async(id)=>{
  const token = JSON.parse(localStorage.getItem('userToken'))
  const result = await axiosInstance.delete(`/product/delete-product/${id}`,{
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
  return id
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: state => {
      state.isProductCreateSuccess = false
      state.isProductCreateError = false
      state.isProductCreatePending = false
      state.isProductGetSuccess=false;
      state.isProductGetError=false;
      state.isProductGetPending=false;
      state.isProductDeleteSuccess=false;
      state.isProductDeleteError=false;
      state.isProductDeletePending=false;
      state.isProductUpdateSuccess=false;
      state.isProductUpdateError=false;
      state.isProductUpdatePending=false;
    },
    setProductId:(state,action)=>{
      state.productID = action.payload
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
      .addCase(getAllProduct.pending, (state, action) => {
        state.isProductGetError=false
        state.isProductGetPending = true
        state.isProductGetSuccess=false
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isProductGetError=false
        state.isProductGetPending = false
        state.isProductGetSuccess=true
        state.products = action.payload
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isProductGetError=true
        state.isProductGetPending = false
        state.isProductGetSuccess=false
      })
      .addCase(deleteProduct.pending,(state,action)=>{
        state.isProductDeleteSuccess=false;
        state.isProductDeleteError=false;
        state.isProductDeletePending=true;
      })
      .addCase(deleteProduct.fulfilled,(state,action)=>{
        state.isProductDeleteSuccess=true;
        state.isProductDeleteError=false;
        state.isProductDeletePending=false;
        const result: [] = state.products.filter(
          item => item._id !== action.payload
        )
        state.products = result
      })
      .addCase(deleteProduct.rejected,(state,action)=>{
        state.isProductDeleteSuccess=false;
        state.isProductDeleteError=true;
        state.isProductDeletePending=false;
      })
      .addCase(updateProduct.pending,(state,action)=>{
        state.isProductUpdateSuccess=false;
        state.isProductUpdateError=false;
        state.isProductUpdatePending=true;
      })
      .addCase(updateProduct.fulfilled,(state,action)=>{
        state.isProductUpdateSuccess=true;
        state.isProductUpdateError=false;
        state.isProductUpdatePending=false
      })
      .addCase(updateProduct.rejected,(state,action)=>{
        state.isProductUpdateSuccess=false;
        state.isProductUpdateError=true;
        state.isProductUpdatePending=false;
      })
  }
})

export const { reset,setProductId } = productSlice.actions
export default productSlice.reducer
