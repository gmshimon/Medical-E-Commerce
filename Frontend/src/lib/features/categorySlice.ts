import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface categoryInterface {
  id: string | null
  categories: []
  isCategoryCreateError: boolean
  isCategoryCreateSuccess: boolean
  isCategoryCreateLoading: boolean
  isCategoryDeleteError: boolean
  isCategoryDeleteSuccess: boolean
  isCategoryDeleteLoading: boolean
  isUpdateCategoryImageSuccess: boolean
  isUpdateCategoryImageError: boolean
  // isCategoryGetByIdError: boolean,
  // isCategoryGetByIdSuccess: boolean,
  // isCategoryGetByIdLoading: boolean,
  // categoryId: string | null,
  // category: {} | null,
  isCategoryUpdateError: boolean
  isCategoryUpdateSuccess: boolean
  isCategoryUpdateLoading: boolean
}

const initialState: categoryInterface = {
  id: null,
  categories: [],
  isCategoryCreateError: false,
  isCategoryCreateSuccess: false,
  isCategoryCreateLoading: false,
  isCategoryDeleteError: false,
  isCategoryDeleteSuccess: false,
  isCategoryDeleteLoading: false,
  isCategoryUpdateError: false,
  isCategoryUpdateSuccess: false,
  isCategoryUpdateLoading: false,
  isUpdateCategoryImageSuccess: false,
  isUpdateCategoryImageError: false
}

export const createCategory = createAsyncThunk('createCategory', async data => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  const response = await axiosInstance.post('/category', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
       authorization: `Bearer ${token.accessToken}`
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

export const updateCategoryImage = createAsyncThunk(
  'updateCategoryImage',
  async data => {
    const token = JSON.parse(localStorage.getItem('userToken'))
    const response = await axiosInstance.put(
      '/category/update-category-image',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token.accessToken}`
        }
      }
    )
  }
)
export const updateCategory = createAsyncThunk(
  'updateCategory',
  async data => {
    const token = JSON.parse(localStorage.getItem('userToken'))
    const response = await axiosInstance.put(
      '/category/update-category',
      data,{
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).accessToken}`
        }
      }
    )
    return response.data
  }
)

export const deleteCategory = createAsyncThunk('deleteCategory', async id => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  const response = await axiosInstance.delete(`/category/delete-category/${id}`,{
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
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
      state.isCategoryUpdateError = false
      state.isCategoryUpdateSuccess = false
      state.isCategoryUpdateLoading = false
      state.isUpdateCategoryImageSuccess = false
      state.isUpdateCategoryImageError = false
    },
    setCategoryId: (state, action) => {
      state.id = action.payload
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
        const result: [] = state.categories.filter(
          item => item._id !== action.payload
        )
        state.categories = result
      })
      .addCase(deleteCategory.pending, state => {
        state.isCategoryDeleteLoading = true
        state.isCategoryDeleteSuccess = false
        state.isCategoryDeleteError = false
      })
      .addCase(updateCategoryImage.pending, state => {
        state.isUpdateCategoryImageError = false
        state.isUpdateCategoryImageSuccess = false
      })
      .addCase(updateCategoryImage.fulfilled, state => {
        state.isUpdateCategoryImageError = false
        state.isUpdateCategoryImageSuccess = true
      })
      .addCase(updateCategoryImage.rejected, state => {
        state.isUpdateCategoryImageError = true
        state.isUpdateCategoryImageSuccess = false
      })
      .addCase(updateCategory.pending, state => {
        state.isCategoryUpdateLoading = true
        state.isCategoryUpdateError = false
        state.isCategoryUpdateSuccess = false
      })
      .addCase(updateCategory.fulfilled, state => {
        state.isCategoryUpdateLoading = false
        state.isCategoryUpdateError = false
        state.isCategoryUpdateSuccess = true
      })
      .addCase(updateCategory.rejected, state => {
        state.isCategoryUpdateLoading = false
        state.isCategoryUpdateError = true
        state.isCategoryUpdateSuccess = false
      })
  }
})

export const { reset, setCategoryId } = categorySlice.actions
export default categorySlice.reducer
