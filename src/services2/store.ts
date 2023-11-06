import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from './features/authSlice'
import  userSlice  from './features/userSlice'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
// ...

const persistConfig = {
  key:'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer )

//  export const store = configureStore({
//   reducer: {
//   //  auth:authReducer
//    auth:persistedReducer
//   },
// })
 export const store = configureStore({
  reducer: {
   auth:authReducer,
   user:userSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch