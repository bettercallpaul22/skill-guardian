import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./baseApi";
import authReducer from "./features/userSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
export type Appdispatch = typeof store.dispatch;
export type RooState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)