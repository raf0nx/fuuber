import classNames from 'classnames'

export const Badge: React.FC<{ classes?: string }> = ({
  children,
  classes,
}) => {
  return (
    <span
      className={classNames(
        'absolute w-4 h-4 rounded-full text-xs text-center',
        classes
      )}
    >
      {children}
    </span>
  )
}
