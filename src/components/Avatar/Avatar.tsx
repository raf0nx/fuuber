import { MutableRefObject, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'

import Dropdown from 'components/UI/Dropdown'
import { DropdownItem } from 'components/UI/Dropdown'

import { logout } from 'store/slices/auth'
import { useAppSelector } from 'hooks/store-hooks'
import { useElementVisible } from 'hooks/use-element-visible'
import { isKeyEnterOrSpace } from 'utils/utils'

import { KeyboardEventCodes } from 'types/enums/KeyboardEventCodes'

import { ReactComponent as AvatarPlaceholder } from 'assets/icons/avatar-placeholder.svg'

interface AvatarProps {
  imageUrl?: string
}

export const Avatar: React.FC<AvatarProps> = ({ imageUrl }) => {
  const authUser = useAppSelector(state => state.auth.user)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const avatarRef = useRef() as MutableRefObject<HTMLImageElement>

  const { ref, isElementVisible, setIsElementVisible } =
    useElementVisible<HTMLDivElement>(false)

  useEffect(() => {
    isElementVisible && setIsElementVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const keyDownHandler = (event: React.KeyboardEvent) => {
    event.stopPropagation()

    if (event.nativeEvent.code === KeyboardEventCodes.ESCAPE) {
      dropdownKeyDownHandler(event.nativeEvent.code)
      return
    }

    if (!isKeyEnterOrSpace(event.nativeEvent.code)) return
    setIsElementVisible(!isElementVisible)
  }

  const dropdownKeyDownHandler = (code: string) => {
    if (code !== KeyboardEventCodes.ESCAPE || !isElementVisible) return

    setIsElementVisible(false)
    avatarRef.current.focus()
  }

  const logoutHandler = () => {
    dispatch(logout())
    history.replace('/auth')
  }

  return (
    <div
      className="relative"
      ref={ref}
      onKeyDown={({ nativeEvent }) => dropdownKeyDownHandler(nativeEvent.code)}
    >
      {imageUrl && (
        <img
          className="relative w-8 h-8 rounded-full ring-2 ring-gray-300 cursor-pointer"
          src={imageUrl}
          alt="User avatar"
          onClick={() => setIsElementVisible(!isElementVisible)}
          onKeyDown={keyDownHandler}
          ref={avatarRef}
          role="button"
          aria-expanded={isElementVisible}
          tabIndex={0}
        />
      )}
      {!imageUrl && (
        <div
          className="relative w-8 h-8 overflow-hidden bg-gray-100 ring-2 ring-gray-300 rounded-full cursor-pointer"
          onClick={() => setIsElementVisible(!isElementVisible)}
          onKeyDown={keyDownHandler}
          ref={avatarRef}
          role="button"
          aria-label="Avatar image placeholder"
          aria-expanded={isElementVisible}
          tabIndex={0}
        >
          <div className="absolute w-10 h-10 text-gray-400 -left-1">
            <AvatarPlaceholder />
          </div>
        </div>
      )}
      {isElementVisible && (
        <Dropdown classes="top-10 right-0 w-44">
          <DropdownItem classes="text-gray-900">
            <p className="px-4 pt-2">{authUser?.displayName}</p>
            <p className="px-4 pb-2 font-medium truncate">{authUser?.email}</p>
          </DropdownItem>
          <DropdownItem classes="text-gray-700">
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
          </DropdownItem>
          <DropdownItem>
            <div
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
              onClick={logoutHandler}
              onKeyDown={({ nativeEvent }) =>
                isKeyEnterOrSpace(nativeEvent.code) && logoutHandler()
              }
              onBlur={() => setIsElementVisible(false)}
              role="button"
              tabIndex={0}
            >
              <FiLogOut className="text-base" /> Sign out
            </div>
          </DropdownItem>
        </Dropdown>
      )}
    </div>
  )
}
