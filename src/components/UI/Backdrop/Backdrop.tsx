import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

export const Backdrop: React.FC<{ show: boolean }> = ({ show }) =>
  ReactDOM.createPortal(
    <CSSTransition
      in={show}
      timeout={{ enter: 300, exit: 280 }}
      classNames={{
        enterActive: 'animate-fade-in',
        exitActive: 'animate-fade-out',
      }}
      unmountOnExit
    >
      <div
        className="absolute z-10 top-0 left-0 w-full h-full bg-black/50"
        role="presentation"
      />
    </CSSTransition>,
    document.body
  )
