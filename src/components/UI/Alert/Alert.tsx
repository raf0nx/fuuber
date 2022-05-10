import classNames from 'classnames'

import { ReactComponent as InfoIcon } from '../../../assets/icons/info.svg'

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
    'flex p-4 mb-4 text-sm rounded-lg',
    { 'text-green-700 bg-green-100': type === 'success' },
    { 'text-blue-700 bg-blue-100': type === 'info' },
    { 'text-yellow-700 bg-yellow-100': type === 'warning' },
    { 'text-red-700 bg-red-100': type === 'danger' },
    classes
  )

  return (
    <div className={alertStyles} role="alert">
      <div className="inline flex-shrink-0 mr-3 w-5 h-5">
        <InfoIcon />
      </div>
      <div className="font-medium">{message}</div>
    </div>
  )
}
