import { NavLink } from 'react-router-dom'

import { FaHamburger } from 'react-icons/fa'

export const Navbar = () => {
  return (
    <nav className="bg-indigo-500 text-white p-4 rounded-b shadow shadow-indigo-500 flex justify-between items-center sticky top-0">
      <NavLink
        to="/"
        exact
        className="font-bold text-xl flex items-center gap-2"
      >
        <FaHamburger /> React Food
      </NavLink>
      <ul className="flex gap-4 font-medium">
        <NavLink
          to="/home"
          exact
          className="hover:text-indigo-900 transition-colors"
          activeClassName="text-indigo-900"
        >
          Home
        </NavLink>
        <NavLink
          to="/favourites"
          exact
          className="hover:text-indigo-900 transition-colors"
          activeClassName="text-indigo-900"
        >
          Favourites
        </NavLink>
        <NavLink
          to="/orders"
          exact
          className="hover:text-indigo-900 transition-colors"
          activeClassName="text-indigo-900"
        >
          Orders
        </NavLink>
        <NavLink
          to="/profile"
          exact
          className="hover:text-indigo-900 transition-colors"
          activeClassName="text-indigo-900"
        >
          Profile
        </NavLink>
        <li>Logout</li>
      </ul>
    </nav>
  )
}
