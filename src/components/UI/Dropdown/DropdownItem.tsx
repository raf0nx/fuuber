import classNames from 'classnames'

interface DropdownItemProps {
  classes?: string
  onBlur?: () => void
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  classes = '',
  onBlur,
}) => {
  return (
    <li
      className={classNames('flex flex-col text-sm py-1', classes)}
      onBlur={onBlur}
    >
      {children}
    </li>
  )
}
