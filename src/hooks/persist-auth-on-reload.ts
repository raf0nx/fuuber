import { useEffect } from 'react'

import { useLazyGetUserDataQuery } from '../api/auth'
import { setTokenData } from '../store/slices/auth'
import { useAppDispatch, useAppSelector } from './store-hooks'

export const usePersistAuthOnReload = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const [triggerGetUserData] = useLazyGetUserDataQuery()

  useEffect(() => {
    const idToken = sessionStorage.getItem('idToken')
    const refreshToken = sessionStorage.getItem('refreshToken')
    const expiresIn = sessionStorage.getItem('expiresIn')

    const hasAuthData = !!(idToken && refreshToken && expiresIn)
    hasAuthData && triggerGetUserData(idToken)

    if (!isLoggedIn && hasAuthData) {
      dispatch(setTokenData({ idToken, refreshToken, expiresIn }))
    }
  }, [dispatch, isLoggedIn, triggerGetUserData])
}
