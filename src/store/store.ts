import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authApi } from 'api/auth'
import { cartApi } from 'api/cart'
import { favouritesApi } from 'api/favourites'
import { foodApi } from 'api/food'
import { authMiddleware } from 'middlewares/auth-middleware'
import authReducer from './slices/auth'
import favouritesReducer from './slices/favourites'
import foodReducer from './slices/food'
import cartReducer from './slices/cart'

const rootReducer = combineReducers({
  auth: authReducer,
  favourites: favouritesReducer,
  food: foodReducer,
  cart: cartReducer,
  [authApi.reducerPath]: authApi.reducer,
  [foodApi.reducerPath]: foodApi.reducer,
  [favouritesApi.reducerPath]: favouritesApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      authMiddleware,
      foodApi.middleware,
      favouritesApi.middleware,
      cartApi.middleware
    ),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
