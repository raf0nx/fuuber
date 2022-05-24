import { Redirect, Route } from 'react-router-dom'

import HomeLayout from './pages/HomeLayout'
import Auth from './pages/Auth'

import { useAppSelector } from './hooks/store-hooks'
import { usePersistAuthOnReload } from './hooks/persist-auth-on-reload'

const App: React.FC = () => {
  usePersistAuthOnReload()

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <main id="app" className="h-screen w-screen overflow-x-hidden">
      <Route path="/auth">{isLoggedIn ? <Redirect to="/" /> : <Auth />}</Route>
      <Route path="/">
        {isLoggedIn ? <HomeLayout /> : <Redirect to="/auth" />}
      </Route>
    </main>
  )
}

export default App
