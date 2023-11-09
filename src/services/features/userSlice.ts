import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../model";
import {AuthService} from "../../services/authServices";
import { RooState } from "../store";

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
            
            // console.log("payload now", payload.user);
            const { user, token, _id } = payload
            state._id = _id
            state.user = user
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

export const selectCurrentUser = (state:RooState) => state.auth.user
export const selectCurrentToken = (state:RooState) => state.auth.token