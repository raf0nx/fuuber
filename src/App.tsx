import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './hooks/store-hooks'

import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'

const App: React.FC = () => {
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
