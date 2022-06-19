import { CSSTransition } from 'react-transition-group'
import { NavLink } from 'react-router-dom'
import { FaHamburger } from 'react-icons/fa'

import NavActions from '../../NavActions'
import Badge from '../Badge'

import { useAppSelector } from 'hooks/store-hooks'

export const Navbar: React.FC = () => {
  const favouritesCount = useAppSelector(
    state => state.favourites.favouritesIds?.length
  )

  return (
    <nav className="bg-indigo-500 text-white p-4 mb-1 rounded-b shadow shadow-indigo-500 flex justify-between items-center sticky top-0 z-10">
      <NavLink
        to="/home"
        exact
        className="font-bold text-xl flex items-center gap-2"
      >
        <FaHamburger /> React Food
      </NavLink>
      <ul className="flex gap-12 font-semibold transition-colors">
        <li>
          <NavLink
            to="/home"
            exact
            className="block h-full hover:text-indigo-900"
            activeClassName="text-indigo-900"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            exact
            className="block h-full relative hover:text-indigo-900 group"
            activeClassName="text-indigo-900"
          >
            <CSSTransition
              in={!!favouritesCount}
              timeout={{
                enter: 300,
                exit: 180,
              }}
              classNames={{
                enterActive: 'animate-scale',
                exitActive: 'animate-scale-down',
              }}
              unmountOnExit
            >
              <Badge classes="-top-2 -right-4 bg-red-500 text-white group-hover:text-white">
                {favouritesCount}
              </Badge>
            </CSSTransition>
            Favourites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            exact
            className="block h-full hover:text-indigo-900"
            activeClassName="text-indigo-900"
          >
            Orders
          </NavLink>
        </li>
      </ul>
      <NavActions />
    </nav>
  )
}
