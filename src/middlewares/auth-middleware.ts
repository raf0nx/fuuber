import { Middleware } from '@reduxjs/toolkit'

import { logout, setTokenData } from '../store/auth'
import { RootState } from '../store/store'

export const authMiddleware: Middleware<{}, RootState> =
  _ => next => action => {
    if (setTokenData.match(action)) {
      sessionStorage.setItem('idToken', action.payload.idToken)
      sessionStorage.setItem('refreshToken', action.payload.refreshToken)
      sessionStorage.setItem('expiresIn', action.payload.expiresIn)
    }

    if (logout.match(action)) {
      sessionStorage.removeItem('idToken')
      sessionStorage.removeItem('refreshToken')
      sessionStorage.removeItem('expiresIn')
    }

    next(action)
  }
