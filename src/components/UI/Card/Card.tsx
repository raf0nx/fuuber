import classNames from 'classnames'

interface CardProps {
  classes?: string
  tabIndex?: number
  ariaLabelledby?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  classes,
  tabIndex,
  ariaLabelledby,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <article
      className={classNames(
        'bg-white rounded-lg border border-gray-200 shadow-md',
        classes
      )}
      tabIndex={tabIndex}
      aria-labelledby={ariaLabelledby}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </article>
  )
}
