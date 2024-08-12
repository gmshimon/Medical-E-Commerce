import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface categoryInterface {
  categories: []
  isCategoryCreateError: boolean
  isCategoryCreateSuccess: boolean
  isCategoryCreateLoading: boolean
  isCategoryDeleteError: boolean
  isCategoryDeleteSuccess: boolean
  isCategoryDeleteLoading: boolean
  // isCategoryGetByIdError: boolean,
  // isCategoryGetByIdSuccess: boolean,
  // isCategoryGetByIdLoading: boolean,
  // categoryId: string | null,
  // category: {} | null,
  // isCategoryUpdateError: boolean,
  // isCategoryUpdateSuccess: boolean,
}

const initialState: categoryInterface = {
  categories: [],
  isCategoryCreateError: false,
  isCategoryCreateSuccess: false,
  isCategoryCreateLoading: false,
  isCategoryDeleteError: false,
  isCategoryDeleteSuccess: false,
  isCategoryDeleteLoading: false
}

export const createCategory = createAsyncThunk('createCategory', async data => {
  const response = await axiosInstance.post('/category', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data.data
})

export const getAllCategories = createAsyncThunk(
  'getAllCategories',
  async () => {
    const response = await axiosInstance.get('/category')
    return response.data.data
  }
)

export const deleteCategory = createAsyncThunk('deleteCategory',async(id)=>{
    const response = await axiosInstance.delete(`/category/delete-category/${id}`)
    return id
  
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: state => {
      state.isCategoryCreateError = false
      state.isCategoryCreateSuccess = false
      state.isCategoryCreateLoading = false
      state.isCategoryDeleteError = false
      state.isCategoryDeleteSuccess = false
      state.isCategoryDeleteLoading = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(createCategory.pending, state => {
        state.isCategoryCreateLoading = true
        state.isCategoryCreateError = false
        state.isCategoryCreateSuccess = false
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isCategoryCreateLoading = false
        state.isCategoryCreateSuccess = true
        state.isCategoryCreateError = false
        state.categories.push(action.payload)
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isCategoryCreateLoading = false
        state.isCategoryCreateSuccess = false
        state.isCategoryCreateError = true
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isCategoryDeleteLoading = false
        state.isCategoryDeleteSuccess = false
        state.isCategoryDeleteError = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isCategoryDeleteLoading = false
        state.isCategoryDeleteSuccess = true
        state.isCategoryDeleteError = false
        const result:[] = state.categories.filter(item=>item._id !== action.payload)
        state.categories = result
      })
      .addCase(deleteCategory.pending,(state)=>{
        state.isCategoryDeleteLoading = true
        state.isCategoryDeleteSuccess = false
        state.isCategoryDeleteError = false
      })
  }
})

export const { reset } = categorySlice.actions
export default categorySlice.reducer
