import classNames from 'classnames'

interface CardProps {
  classes?: string
  tabIndex?: number
  ariaLabelledby?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  classes,
  tabIndex,
  ariaLabelledby,
}) => {
  return (
    <article
      className={classNames(
        'bg-white rounded-lg border border-gray-200 shadow-md',
        classes
      )}
      tabIndex={tabIndex}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </article>
  )
}
