import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../api/auth'

import authReducer from './auth'

export const store = configureStore({
  reducer: { auth: authReducer, [authApi.reducerPath]: authApi.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
