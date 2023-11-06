import { AsyncThunkAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { RegisterResponse, User } from '../../model'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../services/authServices'
import jwt_decode from "jwt-decode";



const authService = new AuthService()
const userToken = authService.getUserToken()
const url = process.env.REACT_APP_DEVELOPMENT_URL
console.log("token test", userToken)


const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DEVELOPMENT_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    "authorization": `Bearer ${userToken}`,


  }
})

// Define a type for the slice state
interface StateType {
  user: User | null;
  loading?: boolean;
  error?: string | null;
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




//GET MY PROFILE
export const get_my_profile = createAsyncThunk(
  'auth/get_my_profile', async () => {
    try {

      const res = await AxiosInstance.get(`api/user/get-me/${authService.getUserId()}`)
      return res.data
    } catch (error: any) {
      return error.response
    }
  }
)

// UPDATE USER PROFILE
export const update_profile = createAsyncThunk(
  'auth/update_profile', async (userData: UpdateProps, { rejectWithValue }) => {
    try {

      const res = await AxiosInstance.put(`/api/user/update/${authService.getUserId()}`, userData)
      return res.data
    }
    catch (error: any) {
      console.log('axios profile error res', error)

      return rejectWithValue(error.response)
    }
  }
)







// Define the initial state u
const initialState = {
  user: null,
  loading: false,
} as StateType

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    //action types
    setCredientials: (state, {payload}) => {
      state.user =payload.user
     
    },
    remove_user: (state) => {
      state.user =null
     
    },
 
  },
  extraReducers: (builder) => {

    builder.addCase(get_my_profile.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(get_my_profile.fulfilled, (state, {payload}) => {
      state.loading = false
      state.user = payload

    })

    builder.addCase(get_my_profile.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
  
    })


   


   

    builder.addCase(update_profile.pending, (state, action: PayloadAction<any>) => {
      state.loading = true
    })
    builder.addCase(update_profile.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.user = action.payload
    })

    builder.addCase(update_profile.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload
    })




  },
})

export const { remove_user} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const get_current_user = (state: RootState) => state.user.user
// export const getToken = (state: RootState) => state.auth.token

export default userSlice.reducer