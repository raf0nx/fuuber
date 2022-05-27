import classNames from 'classnames'

interface DropdownProps {
  children: JSX.Element | JSX.Element[]
  classes?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  classes = '',
}) => {
  return (
    <ul
      className={classNames(
        'z-10 absolute bg-white divide-y divide-gray-100 rounded shadow text-gray-700',
        classes
      )}
    >
      {children}
    </ul>
  )
}
