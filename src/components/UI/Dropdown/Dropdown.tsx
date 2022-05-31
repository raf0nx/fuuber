import { MutableRefObject, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { DropdownItem } from './DropdownItem'

import { useElementVisible } from 'hooks/use-element-visible'
import { isKeyEnterOrSpace } from 'utils/utils'

import { KeyboardEventCodes } from 'types/enums/KeyboardEventCodes'

interface DropdownProps {
  items: JSX.Element[]
  classes?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  children,
  classes,
}) => {
  const { ref, isElementVisible, setIsElementVisible } =
    useElementVisible<HTMLDivElement>(false)
  const dropdownActivatorRef = useRef() as MutableRefObject<HTMLDivElement>

  const location = useLocation()

  useEffect(() => {
    isElementVisible && setIsElementVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const keyDownHandler = (code: string) => {
    if (code === KeyboardEventCodes.ESCAPE && isElementVisible) {
      setIsElementVisible(false)
      dropdownActivatorRef.current.focus()
    }
  }

  return (
    <div
      className="relative"
      ref={ref}
      onKeyDown={({ nativeEvent }) => keyDownHandler(nativeEvent.code)}
    >
      <div
        onClick={() => setIsElementVisible(!isElementVisible)}
        onKeyDown={({ nativeEvent }) =>
          isKeyEnterOrSpace(nativeEvent.code) &&
          setIsElementVisible(!isElementVisible)
        }
        ref={dropdownActivatorRef}
        tabIndex={0}
        role="button"
        aria-expanded={isElementVisible}
        aria-controls={isElementVisible ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
      >
        {children}
      </div>
      <CSSTransition
        in={isElementVisible}
        timeout={{
          enter: 400,
          exit: 280,
        }}
        classNames={{
          enterActive: 'animate-rotate-x origin-top-right',
          exitActive: 'animate-fade-out',
        }}
        unmountOnExit
      >
        <ul
          id="dropdown-menu"
          className={classNames(
            'z-10 absolute bg-white divide-y divide-gray-100 rounded shadow text-gray-700',
            classes
          )}
        >
          {!!items.length &&
            items.map((item, index) => (
              <DropdownItem
                onBlur={() =>
                  index === items.length - 1 && setIsElementVisible(false)
                }
                key={item.key}
              >
                {item}
              </DropdownItem>
            ))}
        </ul>
      </CSSTransition>
    </div>
  )
}
