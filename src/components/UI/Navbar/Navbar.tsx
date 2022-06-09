import { NavLink } from 'react-router-dom'
import { FaHamburger } from 'react-icons/fa'

import NavActions from '../../NavActions'

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-500 text-white p-4 mb-1 rounded-b shadow shadow-indigo-500 flex justify-between items-center sticky top-0 z-10">
      <NavLink
        to="/home"
        exact
        className="font-bold text-xl flex items-center gap-2"
      >
        <FaHamburger /> React Food
      </NavLink>
      <ul className="flex gap-4 font-semibold transition-colors">
        <li className="hover:text-indigo-900">
          <NavLink
            to="/home"
            exact
            className="block h-full"
            activeClassName="text-indigo-900"
          >
            Home
          </NavLink>
        </li>
        <li className="hover:text-indigo-900">
          <NavLink
            to="/favourites"
            exact
            className="block h-full"
            activeClassName="text-indigo-900"
          >
            Favourites
          </NavLink>
        </li>
        <li className="hover:text-indigo-900">
          <NavLink
            to="/orders"
            exact
            className="block h-full"
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
