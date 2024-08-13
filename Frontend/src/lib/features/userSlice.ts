import axiosInstance from '@/utilis/axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  email: string | null
  isUserRegisterError: boolean
  isUserRegisterSuccess: boolean
  isUserRegisterLoading: boolean
  isUserVerified: boolean
  isUserVerifiedError: boolean
  isLoginError: boolean
  isLoginSuccess: boolean
  isLoginPending: boolean
  user: {} | null
  users:[] | null
  isGetAllUsersSuccess: boolean
  isGetAllUsersLoading: boolean
  isGetAllUsersError: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  email: null,
  isUserRegisterError: false,
  isUserRegisterSuccess: false,
  isUserRegisterLoading: false,
  isUserVerified: false,
  isUserVerifiedError: false,
  isLoginError: false,
  isLoginSuccess: false,
  isLoginPending: false,
  user: null,
  users: null,
  isGetAllUsersSuccess: false,
  isGetAllUsersLoading: false,
  isGetAllUsersError: false,
}

export const registerUser = createAsyncThunk('registerUser', async data => {
  const response = await axiosInstance.post('/user/create-user', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const result = response.data.data
  return result
})

export const loginUser = createAsyncThunk('loginUser', async data => {
  const response = await axiosInstance.post('/user/login', data)
  const result = response.data
  if (result.data) {
    const tokenExpiration = new Date().getTime() + 5 * 60 * 60 * 1000
    localStorage.setItem(
      'userToken',
      JSON.stringify({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        tokenExpiration: tokenExpiration
      })
    )
  }
  return result.data
})

export const getAllUsers = createAsyncThunk('getAllUsers',async()=>{
  const token = JSON.parse(localStorage.getItem('userToken'))
  const result = await axiosInstance.get('/user/get-users',{
    headers: {
      authorization: `Bearer ${token.accessToken}`
    }
  })
  return result.data.data
})

export const verifyOTP = createAsyncThunk('verifyOTP', async data => {
  const response = await axiosInstance.post('otp/verify-otp', data)
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
      state.isUserVerifiedError = false
      state.isLoginError = false
      state.isLoginSuccess = false
      state.isLoginPending = false
      state.isGetAllUsersSuccess=false
      state.isGetAllUsersLoading=false
      state.isGetAllUsersError=false
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
    setisUserVerified: state => {
      state.isUserVerified = false
    },
    setUserNull: state => {
      state.user = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isUserRegisterLoading = true
        state.isUserRegisterError = false
        state.isUserRegisterSuccess = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isUserRegisterLoading = false
        state.isUserRegisterSuccess = true
        state.isUserRegisterError = false
        state.email = action.payload
        console.log(action.payload)
      })
      .addCase(registerUser.rejected, state => {
        state.isUserRegisterLoading = false
        state.isUserRegisterError = true
        state.isUserRegisterSuccess = false
      })
      .addCase(verifyOTP.pending, state => {
        state.isUserVerified = false
        state.isUserVerifiedError = false
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isUserVerified = true
        state.isUserVerifiedError = false
      })
      .addCase(verifyOTP.rejected, state => {
        state.isUserVerified = false
        state.isUserVerifiedError = true
      })
      .addCase(loginUser.pending, state => {
        state.isLoginPending = true
        state.isLoginError = false
        state.isLoginSuccess = false
      })
      .addCase(loginUser.fulfilled, (state,action) => {
        state.isLoginPending = false
        state.isLoginError = false
        state.isLoginSuccess = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected, state => {
        state.isLoginPending = false
        state.isLoginError = true
        state.isLoginSuccess = false
      })
      .addCase(getAllUsers.pending,state=>{
        state.isGetAllUsersLoading = true
        state.isGetAllUsersError = false
        state.isGetAllUsersSuccess = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isGetAllUsersLoading = false
        state.isGetAllUsersError = false
        state.isGetAllUsersSuccess = true
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, state => {
        state.isGetAllUsersLoading = false
        state.isGetAllUsersError = true
        state.isGetAllUsersSuccess = false
      })
  }
})

export const {
  reset,
  increment,
  decrement,
  incrementByAmount,
  setisUserVerified,
  setUserNull
} = counterSlice.actions

export default counterSlice.reducer
