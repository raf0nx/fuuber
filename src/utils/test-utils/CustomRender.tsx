import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { authApi } from 'api/auth'
import { authMiddleware } from 'middlewares/auth-middleware'
import { foodApi } from 'api/food'
import { favouritesApi } from 'api/favourites'
import { cartApi } from 'api/cart'
import authReducer from 'store/slices/auth'
import favouritesReducer from 'store/slices/favourites'
import foodReducer from 'store/slices/food'
import cartReducer from 'store/slices/cart'

interface WrapperProps {
  children: JSX.Element
}

const customRender = (
  component: JSX.Element,
  {
    initialState = {},
    store = configureStore({
      reducer: {
        auth: authReducer,
        favourites: favouritesReducer,
        food: foodReducer,
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        [foodApi.reducerPath]: foodApi.reducer,
        [favouritesApi.reducerPath]: favouritesApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
      },
      preloadedState: initialState,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
          authApi.middleware,
          authMiddleware,
          foodApi.middleware,
          favouritesApi.middleware,
          cartApi.middleware
        ),
    }),
    ...renderOptions
  }: any = {}
) => {
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  return rtlRender(component, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { customRender }
