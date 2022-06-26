import classNames from 'classnames'

interface ButtonProps {
  category: 'primary' | 'secondary' | 'error'
  type?: 'button' | 'submit' | 'reset'
  name?: string
  disabled?: boolean
  classes?: string
  ariaLabel?: string
  onClick?: (event: React.MouseEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  category,
  type = 'button',
  name,
  disabled = false,
  classes = '',
  ariaLabel,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
}) => {
  const buttonStyles = classNames(
    'py-2.5 px-5 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2',
    {
      'text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300':
        category === 'primary',
    },
    {
      'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:ring-gray-200':
        category === 'secondary',
    },
    {
      'text-white bg-red-600 hover:bg-red-700 focus:ring-red-300':
        category === 'error',
    },
    classes,
    { 'cursor-not-allowed opacity-60': disabled }
  )

  return (
    <button
      className={buttonStyles}
      type={type}
      name={name}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </button>
  )
}
