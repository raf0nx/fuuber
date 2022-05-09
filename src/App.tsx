import { Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'

import { useAppSelector } from './hooks/store-hooks'
import { usePersistAuthOnReload } from './hooks/persist-auth-on-reload'

const App: React.FC = () => {
  usePersistAuthOnReload()

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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
