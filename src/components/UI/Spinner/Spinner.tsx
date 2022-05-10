import classNames from 'classnames'

import { ReactComponent as SpinnerIcon } from '../../../assets/icons/spinner.svg'

interface SpinnerProps {
  textPosition?: 'right'
  classes?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  children,
  textPosition = 'right',
  classes = '',
}) => {
  return (
    <>
      <div
        className={classNames(
          'inline mr-2 w-4 h-4 text-white animate-spin',
          classes
        )}
      >
        <SpinnerIcon />
      </div>
      {textPosition === 'right' && children}
    </>
  )
}
