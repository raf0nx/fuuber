import { Redirect, Route, useLocation } from 'react-router-dom'

import Navbar from 'components/UI/Navbar'
import AnimatedSwitch from 'components/AnimatedSwitch'
import HomePage from '../Home'
import Favourites from '../Favourites'
import Orders from '../Orders'
import Profile from '../Profile'

export const AppLayout: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatedSwitch location={location}>
        <Route path="/home" exact component={HomePage} />
        <Route path="/favourites" exact component={Favourites} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/profile" exact component={Profile} />
        <Redirect from="/" to="/home" />
      </AnimatedSwitch>
    </>
  )
}
