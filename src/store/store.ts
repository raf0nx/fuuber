import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authApi } from 'api/auth'
import { authMiddleware } from 'middlewares/auth-middleware'
import authReducer from './slices/auth'

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, authMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
