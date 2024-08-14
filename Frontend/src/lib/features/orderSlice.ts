import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'

interface orderInterface {
  orders: [] | null
  division: String | null
  district: String | null
  sub_district: String | null
  address: String | null
  name: String | null
  phone: String | null
  isCreateOrderPending: boolean | null
  isCreateOrderSuccess: boolean | null
  isCreateOrderError: boolean | null
  isGetOrderPending: boolean | null
  isGetOrderSuccess: boolean | null
  isGetOrderError: boolean | null
  isDeleteOrderPending: boolean | null
  isDeleteOrderSuccess: boolean | null
  isDeleteOrderError: boolean | null
  isUpdateOrderPending: boolean | null
  isUpdateOrderSuccess: boolean | null
  isUpdateOrderError: boolean | null
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
  isCreateOrderError: false,
  isGetOrderPending: false,
  isGetOrderSuccess: false,
  isGetOrderError: false,
  isDeleteOrderPending: false,
  isDeleteOrderSuccess: false,
  isDeleteOrderError: false,
  isUpdateOrderPending: false,
  isUpdateOrderSuccess: false,
  isUpdateOrderError: false,
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

export const getAllOrders = createAsyncThunk('getAllOrders', async () => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  const response = await axiosInstance.get('/order/get-orders', {
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
  return response.data.data
})

export const getMyOrders =  createAsyncThunk('getMyOrders', async () => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  const response = await axiosInstance.get('/order/my-order', {
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
  return response.data.data
})

export const deleteOrder = createAsyncThunk('deleteOrder',async id=>{
  const token = JSON.parse(localStorage.getItem('userToken'))
  const response = await axiosInstance.delete(`/order/delete-order/${id}`,{
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
  return id
})
export const changeStatus = createAsyncThunk('changeStatus',async (data)=>{

  const token = JSON.parse(localStorage.getItem('userToken'))
  const response = await axiosInstance.put(`/order/change-status`,data,{
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
  return data
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
      state.isGetOrderPending = false
      state.isGetOrderSuccess = false
      state.isGetOrderError = false
      state.isDeleteOrderPending=false
      state.isDeleteOrderSuccess=false
      state.isDeleteOrderError=false
      state.isUpdateOrderPending=false
      state.isUpdateOrderSuccess=false
      state.isUpdateOrderError=false
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
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.isCreateOrderSuccess = false
        state.isCreateOrderPending = true
        state.isCreateOrderError = false
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isCreateOrderSuccess = true
        state.isCreateOrderPending = false
        state.isCreateOrderError = false
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isCreateOrderSuccess = false
        state.isCreateOrderPending = false
        state.isCreateOrderError = true
      })
      .addCase(getAllOrders.pending, (state, action) => {
        state.isGetOrderPending= true;
        state.isGetOrderSuccess= false;
        state.isGetOrderError= false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isGetOrderPending= false;
        state.isGetOrderSuccess= true;
        state.isGetOrderError= false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isGetOrderPending= false;
        state.isGetOrderSuccess= false;
        state.isGetOrderError= true;
      })
      .addCase(getMyOrders.pending, (state, action) => {
        state.isGetOrderPending= true;
        state.isGetOrderSuccess= false;
        state.isGetOrderError= false;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isGetOrderPending= false;
        state.isGetOrderSuccess= true;
        state.isGetOrderError= false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isGetOrderPending= false;
        state.isGetOrderSuccess= false;
        state.isGetOrderError= true;
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.isDeleteOrderPending= true;
        state.isDeleteOrderSuccess= false;
        state.isDeleteOrderError= false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isDeleteOrderSuccess= true;
        state.isDeleteOrderPending= false;
        state.isDeleteOrderError= false;
        const result: [] = state.orders.filter(
          item => item._id !== action.payload
        )
        state.orders = result
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isDeleteOrderSuccess= false;
        state.isDeleteOrderPending= false;
        state.isDeleteOrderError= true;
      })
      .addCase(changeStatus.pending, (state, action) => {
        state.isUpdateOrderPending= true;
        state.isUpdateOrderSuccess= false;
        state.isUpdateOrderError= false;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.isUpdateOrderPending= false;
        state.isUpdateOrderSuccess= true;
        state.isUpdateOrderError= false;
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.isUpdateOrderPending= false;
        state.isUpdateOrderSuccess= false;
        state.isUpdateOrderError= true;
      })
  }
})

export const {
  reset,
  setDivision,
  setDistrict,
  setSubDistrict,
  setAddress,
  setName,
  setPhone
} = orderSlice.actions

export default orderSlice.reducer
