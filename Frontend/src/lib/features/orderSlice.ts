import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface orderInterface {
  orders: {} | null
  division: String | null
  district: String | null
  sub_district: String | null
  address: String | null
  name: String | null
  phone: String | null
  isCreateOrderPending: boolean | null
  isCreateOrderSuccess: boolean | null
  isCreateOrderError: boolean | null
}

const initialState: orderInterface = {
  orders: null,
  division: '',
  district: '',
  sub_district: '',
  address: '',
  name: '',
  phone: '',
  isCreateOrderPending: false,
  isCreateOrderSuccess: false,
  isCreateOrderError: false
}

export const createOrder = createAsyncThunk('createOrder', async data => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  const response = await axiosInstance.post('/order', data, {
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
  return response.data.data
})

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: state => {
      state.division = null
      state.district = null
      state.sub_district = null
      state.address = null
      state.name = null
      state.phone = null
      state.isCreateOrderSuccess = false
      state.isCreateOrderPending = false
      state.isCreateOrderError = false
    },
    setDivision: (state, action) => {
      state.division = action.payload
    },
    setDistrict: (state, action) => {
      state.district = action.payload
    },
    setSubDistrict: (state, action) => {
      state.sub_district = action.payload
    },
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setPhone: (state, action) => {
      state.phone = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.isCreateOrderSuccess = false
      state.isCreateOrderPending = true
      state.isCreateOrderError = false
    })
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isCreateOrderSuccess = true
      state.isCreateOrderPending = false
      state.isCreateOrderError = false
    })
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isCreateOrderSuccess = false
      state.isCreateOrderPending = false
      state.isCreateOrderError = true
    })
  }
})

export const {reset,setDivision,setDistrict,setSubDistrict,setAddress,setName,setPhone} = orderSlice.actions

export default orderSlice.reducer