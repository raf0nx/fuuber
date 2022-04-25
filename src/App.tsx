import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'

import { useLazyGetUserDataQuery } from './api/auth'
import { useAppDispatch, useAppSelector } from './hooks/store-hooks'
import { setTokenData } from './store/auth'

const App: React.FC = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const [triggerGetUserData] = useLazyGetUserDataQuery()

  useEffect(() => {
    const idToken = sessionStorage.getItem('idToken')
    const refreshToken = sessionStorage.getItem('refreshToken')
    const expiresIn = sessionStorage.getItem('expiresIn')

    const hasAuthData = idToken && refreshToken && expiresIn

    idToken && triggerGetUserData(idToken)

    if (!isLoggedIn && hasAuthData) {
      dispatch(setTokenData({ idToken, refreshToken, expiresIn }))
    }
  }, [dispatch, isLoggedIn, triggerGetUserData])

  return (
    <main id="app" className="h-screen w-screen">
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/" /> : <Auth />}
        />
      </Routes>
    </main>
  )
}

export default App
