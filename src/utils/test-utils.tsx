import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import authReducer from '../store/auth'
import { authApi } from '../api/auth'
import { authMiddleware } from '../middlewares/auth-middleware'

interface WrapperProps {
  children: JSX.Element
}

const customRender = (
  component: JSX.Element,
  {
    initialState = {},
    store = configureStore({
      reducer: { auth: authReducer, [authApi.reducerPath]: authApi.reducer },
      preloadedState: initialState,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware, authMiddleware),
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
