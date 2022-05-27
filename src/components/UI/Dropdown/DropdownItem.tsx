import classNames from 'classnames'

interface DropdownItemProps {
  classes?: string
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  classes = '',
}) => {
  return (
    <div className={classNames('flex flex-col text-sm py-1', classes)}>
      {children}
    </div>
  )
}
