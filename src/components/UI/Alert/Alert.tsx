import { useEffect } from 'react'
import classNames from 'classnames'

import { ReactComponent as InfoIcon } from 'assets/icons/info.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'

interface AlertProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'danger'
  timeout?: number
  classes?: string
  dismissable?: boolean
  onDismissAlert?: () => void
}

export const Alert: React.FC<AlertProps> = ({
  message,
  type,
  timeout = 5000,
  classes = '',
  dismissable = false,
  onDismissAlert,
}) => {
  const alertStyles = classNames(
    'flex p-4 mb-4 text-sm rounded-lg',
    { 'text-green-700 bg-green-100': type === 'success' },
    { 'text-blue-700 bg-blue-100': type === 'info' },
    { 'text-yellow-700 bg-yellow-100': type === 'warning' },
    { 'text-red-700 bg-red-100': type === 'danger' },
    classes
  )

  const closeBtnStyles = classNames(
    'ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 focus:outline-none',
    {
      'bg-green-100 text-green-500 focus:ring-green-400 hover:bg-green-200':
        type === 'success',
    },
    {
      'bg-blue-100 text-blue-500 focus:ring-blue-400 hover:bg-blue-200':
        type === 'info',
    },
    {
      'bg-yellow-100 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200':
        type === 'warning',
    },
    {
      'bg-red-100 text-red-500 focus:ring-red-400 hover:bg-red-200':
        type === 'danger',
    }
  )

  useEffect(() => {
    if (onDismissAlert) {
      const dismissTimeout = setTimeout(() => {
        onDismissAlert()
      }, timeout)

      return () => {
        clearTimeout(dismissTimeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={alertStyles} role="alert">
      <div className="inline flex-shrink-0 mr-3 w-5 h-5">
        <InfoIcon />
      </div>
      <div className="font-medium">{message}</div>
      {dismissable && (
        <button
          onClick={onDismissAlert}
          type="button"
          className={closeBtnStyles}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
