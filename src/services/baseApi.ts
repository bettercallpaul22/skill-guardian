import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredientials, logOut } from "./features/userSlice";
import { AuthService } from "./authServices";
import { RooState } from "./store";


const authService = new AuthService()
interface Enviroment {
    production: string | undefined;
    development: string | undefined;
}

const enviroment: Enviroment = {
    production: process.env.REACT_APP_PRODUCTION_URL,
    development: process.env.REACT_APP_DEVELOPMENT_URL,
}


const baseQuery = fetchBaseQuery({
    baseUrl: enviroment.production,
    credentials: "include",
    mode: "cors",

    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RooState
        if (state.auth.token) {
            headers.set("authorization", `Bearer ${state.auth.token}`)
        }
     
        return headers
    }
})

const baseQueryReAuth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    // console.log("base query ", result)
    if (result?.error?.status === 403) {
        // console.log("sending refresh token....")
        const refreshResult = await baseQuery("/api/auth/refresh", api, extraOptions)
        // console.log("refresh result", refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token
            // api.dispatch(setCredientials({ ...refreshResult.data, user }))

            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }

    }
    return result
}


// create our api
export const apiSlice = createApi({
    baseQuery: baseQueryReAuth,
    endpoints: () => ({})
})
