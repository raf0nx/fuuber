import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Backdrop from '../Backdrop'

export const Modal: React.FC<{ show: boolean }> = ({ show, children }) => (
  <>
    <Backdrop show={show} />
    {ReactDOM.createPortal(
      <CSSTransition
        in={show}
        timeout={{
          enter: 300,
          exit: 500,
        }}
        classNames={{
          enterActive: 'animate-slide-in',
          exitActive: 'animate-slide-out',
        }}
        unmountOnExit
      >
        <div
          className="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center"
          role="presentation"
        >
          {children}
        </div>
      </CSSTransition>,
      document.body
    )}
  </>
)
