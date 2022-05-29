import React from 'react'

import { ReactComponent as AvatarPlaceholder } from 'assets/icons/avatar-placeholder.svg'

interface AvatarProps {
  imageUrl?: string
  role?: string
  ariaExpanded?: boolean
  onClick?: () => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}
export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ imageUrl, role, ariaExpanded, onClick, onKeyDown }, ref) => {
    return (
      <>
        {imageUrl && (
          <img
            className="relative w-8 h-8 rounded-full ring-2 ring-gray-300 cursor-pointer"
            src={imageUrl}
            alt="User avatar"
            onClick={onClick}
            onKeyDown={onKeyDown}
            ref={ref}
            role={role}
            aria-expanded={ariaExpanded}
            tabIndex={0}
          />
        )}
        {!imageUrl && (
          <div
            className="relative w-8 h-8 overflow-hidden bg-gray-100 ring-2 ring-gray-300 rounded-full cursor-pointer"
            onClick={onClick}
            onKeyDown={onKeyDown}
            ref={ref}
            role={role}
            aria-label="Avatar image placeholder"
            aria-expanded={ariaExpanded}
            tabIndex={0}
          >
            <div className="absolute w-10 h-10 text-gray-400 -left-1">
              <AvatarPlaceholder />
            </div>
          </div>
        )}
      </>
    )
  }
)
