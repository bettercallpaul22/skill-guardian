import { AsyncThunkAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { RegisterResponse, User } from '../../model'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../services/authServices'
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react'



const authService = new AuthService()
const userToken = authService.getUserToken()

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PRODUCTION_URL,
  // withCredentials:true,

  headers: {
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${userToken}`,


  }
})

// Define a type for the slice state
interface StateType {
  user: User | null;
  token: string | null;
  _id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  mobile_number: string | null;
  loading?: boolean;
  error?: string | null;
}


interface LoginProps {
  email: string;
  password: string;
}

interface registerProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UpdateProps {
  avatar: string;
  state: string;
  skills: string;
  bvn: string;
  bank_number: string;
  charges: string;
  guarantor_name: string;
  about: string;
  guarantor_number: string;
  bank_name: string;

}




// LOGIN USER
export const loginUser = createAsyncThunk(
  'auth/loginUser', async (userData: LoginProps, { rejectWithValue }) => {
    try {

      const res = await AxiosInstance.post(`api/auth/login`, userData)
      return res.data
    } catch (error: any) {
      return rejectWithValue(error.response)
    }
  }
)


// REGISTER USER
export const register = createAsyncThunk(
  'auth/register', async (userData: registerProps, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(`/api/auth/register`, userData)
      return res.data
    } catch (error: any) {
      return rejectWithValue(error.response)
    }
  }
)






// Define the initial state u
const initialState = {
  _id: null,
  firstName: null,
  lastName: null,
  email: null,
  mobile_number: null,
  user: null,
  token: null,
  loading: false,
} as StateType

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    //action types
    setCredientials: (state, { payload }) => {
      const data:StateType = jwt_decode(payload)
      state._id = data._id
      state.firstName = data.firstName
      state.lastName = data.lastName
      state.email = data.email
      state.mobile_number = data.mobile_number
      state.token = payload
      authService.setUserToken(payload)
    },

    clearCredientials: (state) => {
      state.firstName =null
      state.lastName = null
      state.email = null
      state.user = null
      state._id = null
      state.token = null
      authService.clearUser()
    }
  },
  extraReducers: (builder) => {

    // LOGIN ACTIONS
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
    
      state.loading = false
      const data:StateType = jwt_decode(action.payload.token)
      state._id = data._id
      state.firstName = data.firstName
      state.lastName = data.lastName
      state.email = data.email
      state.mobile_number = data.mobile_number
      state.token = action.payload.token
    })

    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload
    })


    // REGISTER ACTIONS
    builder.addCase(register.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(register.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
      state.loading = false
      const data:StateType = jwt_decode(action.payload.token)
      state._id = data._id
      state.firstName = data.firstName
      state.lastName = data.lastName
      state.email = data.email
      state.mobile_number = data.mobile_number
      state.token = action.payload.token
      authService.setUserToken(action.payload.token)
      authService.setUserId(action.payload._id)
    })

    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload
    })
  },
})

export const { setCredientials, clearCredientials } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getUser = (state: RootState) => state.auth.user
export const getToken = (state: RootState) => state.auth.token

export default authSlice.reducer