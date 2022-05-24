import { Redirect, Route, useLocation } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import HomePage from '../Home'
import Favourites from '../Favourites'
import AnimatedSwitch from '../../components/AnimatedSwitch'
import Orders from '../Orders'
import Profile from '../Profile'

export const HomeLayout: React.FC = () => {
  const location = useLocation()

  return (
    <div>
      <Navbar />
      <AnimatedSwitch location={location}>
        <Route path="/home" exact component={HomePage} />
        <Route path="/favourites" exact component={Favourites} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/profile" exact component={Profile} />
        <Redirect from="/" to="/home" />
      </AnimatedSwitch>
    </div>
  )
}
