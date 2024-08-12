import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  email:string | null
  isUserRegisterError: boolean
  isUserRegisterSuccess: boolean
  isUserRegisterLoading: boolean
  isUserVerified: boolean
  isUserVerifiedError: boolean
  user: {}
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  email:null,
  isUserRegisterError: false,
  isUserRegisterSuccess: false,
  isUserRegisterLoading: false,
  isUserVerified: false,
  isUserVerifiedError: false,
  user: {}
}

export const registerUser = createAsyncThunk('registerUser', async data => {
  const response = await axiosInstance.post('/user/create-user', data,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const result = response.data.data
  return result
})

export const verifyOTP = createAsyncThunk("verifyOTP",async(data)=>{
  const response = await axiosInstance.post("otp/verify-otp",data)
  return response.data

})

export const counterSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: state => {
      state.isUserRegisterError = false
      state.isUserRegisterSuccess = false
      state.isUserRegisterLoading = false
      state.isUserVerifiedError= false
    },
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setisUserVerified:state=>{
      state.isUserVerified=false
    }
  },
  extraReducers:builder=>{
    builder
     .addCase(registerUser.pending, (state) => {
        state.isUserRegisterLoading = true
        state.isUserRegisterError = false
        state.isUserRegisterSuccess = false
      })
     .addCase(registerUser.fulfilled, (state, action) => {
        state.isUserRegisterLoading = false
        state.isUserRegisterSuccess = true
        state.isUserRegisterError = false
        state.email=action.payload
        console.log(action.payload)
      })
     .addCase(registerUser.rejected, (state) => {
        state.isUserRegisterLoading = false
        state.isUserRegisterError = true
        state.isUserRegisterSuccess = false
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isUserVerified = false
        state.isUserVerifiedError = false
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isUserVerified = true
        state.isUserVerifiedError = false
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.isUserVerified = false
        state.isUserVerifiedError = true
      })
  }
})

export const { reset,increment, decrement, incrementByAmount ,setisUserVerified} = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
