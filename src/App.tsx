import { Redirect, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'

import { useAppSelector } from './hooks/store-hooks'
import { usePersistAuthOnReload } from './hooks/persist-auth-on-reload'

const App: React.FC = () => {
  usePersistAuthOnReload()

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <main id="app" className="h-screen w-screen">
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/auth">
          {isLoggedIn ? <Redirect to="/" /> : <Auth />}
        </Route>
      </Switch>
    </main>
  )
}

export default App
