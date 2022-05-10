import classNames from 'classnames'

interface AlertProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'danger'
  classes?: string
}

export const Alert: React.FC<AlertProps> = ({
  message,
  type,
  classes = '',
}) => {
  const alertStyles = classNames(
    'flex p-4 mb-4 text-sm rounded-lg ',
    { 'text-green-700 bg-green-100': type === 'success' },
    { 'text-blue-700 bg-blue-100': type === 'info' },
    { 'text-yellow-700 bg-yellow-100': type === 'warning' },
    { 'text-red-700 bg-red-100': type === 'danger' },
    classes
  )

  return (
    <div className={alertStyles} role="alert">
      <svg
        className="inline flex-shrink-0 mr-3 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="font-medium">{message}</div>
    </div>
  )
}
