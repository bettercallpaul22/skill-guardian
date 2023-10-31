import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../model";
import {AuthService} from "../../services/authServices";

const authService = new AuthService()

const initialState = {
    _id: null, 
    user: null, 
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setCredientials: (state, { payload }) => {
            console.log("payload now", payload.user);
            const { user, token } = payload
            state._id = user._id
            state.user = user.user
            state.token = token
        },

        logOut:(state)=>{
            state._id = null
            state.user = null
            state.token = null
            authService.clearUser()
        }

    }
})

export const {setCredientials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state:any) => state.auth.user
export const selectCurrentToken = (state:any) => state.auth.token