import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'

import Dropdown from 'components/UI/Dropdown'
import { Avatar } from 'components/UI/Avatar'

import { logout } from 'store/slices/auth'
import { useAppSelector } from 'hooks/store-hooks'
import { isKeyEnterOrSpace } from 'utils/utils'

export const NavActions: React.FC = () => {
  const authUser = useAppSelector(state => state.auth.user)

  const history = useHistory()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    history.replace('/auth')
  }

  const dropdownItems = useMemo(
    () => [
      <React.Fragment key="user-details">
        <p className="text-gray-900 px-4 pt-2 truncate">
          {authUser?.displayName}
        </p>
        <p className="text-gray-900 px-4 pb-2 font-medium truncate">
          {authUser?.email}
        </p>
      </React.Fragment>,
      <React.Fragment key="nav-links">
        <NavLink
          to="/profile"
          className="flex items-center gap-2 px-4 py-2 transition-colors hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          exact
        >
          <FiUser className="text-base" /> Profile
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-2 px-4 py-2 transition-colors hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          exact
        >
          <FiSettings className="text-base" /> Settings
        </NavLink>
      </React.Fragment>,
      <div
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
        onClick={logoutHandler}
        onKeyDown={({ nativeEvent }) =>
          isKeyEnterOrSpace(nativeEvent.code) && logoutHandler()
        }
        role="button"
        tabIndex={0}
        key="logout-button"
      >
        <FiLogOut className="text-base" /> Sign out
      </div>,
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
  )

  return (
    <Dropdown items={dropdownItems} classes="top-10 right-0 w-44">
      <Avatar imageUrl={authUser?.photoUrl} />
    </Dropdown>
  )
}
