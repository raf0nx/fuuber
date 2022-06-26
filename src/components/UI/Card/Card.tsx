import classNames from 'classnames'

interface CardProps {
  classes?: string
  tabIndex?: number
  ariaLabelledby?: string
  onClick?: () => void
  onKeyDown?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  classes,
  tabIndex,
  ariaLabelledby,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) => {
  return (
    <article
      className={classNames(
        'bg-white rounded-lg border border-gray-200 shadow-md',
        classes
      )}
      tabIndex={tabIndex}
      aria-labelledby={ariaLabelledby}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </article>
  )
}
