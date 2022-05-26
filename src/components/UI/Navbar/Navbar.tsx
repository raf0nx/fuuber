import { NavLink } from 'react-router-dom'
import { FaHamburger } from 'react-icons/fa'

import Avatar from '../../Avatar'

import { useAppSelector } from 'hooks/store-hooks'

export const Navbar: React.FC = () => {
  const photoUrl = useAppSelector(state => state.auth.user?.photoUrl)

  return (
    <nav className="bg-indigo-500 text-white p-4 mb-1 rounded-b shadow shadow-indigo-500 flex justify-between items-center sticky top-0">
      <NavLink
        to="/home"
        exact
        className="font-bold text-xl flex items-center gap-2"
      >
        <FaHamburger /> React Food
      </NavLink>
      <ul className="flex gap-4 font-semibold">
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
      </ul>
      <Avatar imageUrl={photoUrl} />
    </nav>
  )
}
