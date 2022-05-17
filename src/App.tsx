import { Redirect, Route, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'
import AnimatedSwitch from './components/AnimatedSwitch'

import { useAppSelector } from './hooks/store-hooks'
import { usePersistAuthOnReload } from './hooks/persist-auth-on-reload'

const App: React.FC = () => {
  const location = useLocation()
  usePersistAuthOnReload()

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <main id="app" className="h-screen w-screen overflow-x-hidden">
      <AnimatedSwitch location={location}>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/auth">
          {isLoggedIn ? <Redirect to="/" /> : <Auth />}
        </Route>
      </AnimatedSwitch>
    </main>
  )
}

export default App
