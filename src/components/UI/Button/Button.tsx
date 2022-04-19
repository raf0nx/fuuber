interface ButtonProps {
  category: 'primary' | 'secondary' | 'error'
  type?: 'button' | 'submit' | 'reset'
  name?: string
  disabled?: boolean
  classes?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  category,
  type = 'button',
  name,
  disabled = false,
  classes = '',
  onClick,
}) => {
  let styles =
    'text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300'

  if (disabled) {
    styles = styles.concat(
      ' cursor-not-allowed bg-indigo-400 hover:bg-indigo-400'
    )
  }

  if (category === 'secondary') {
    styles =
      'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-gray-200'
  }

  if (category === 'error') {
    styles = 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-300'
  }

  return (
    <button
      className={`py-2.5 px-5 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${styles} ${classes}`}
      type={type}
      name={name}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
