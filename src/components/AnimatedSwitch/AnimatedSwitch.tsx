import { Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Location } from 'history'

interface AnimatedSwitchProps {
  location: Location<unknown>
  children: JSX.Element | JSX.Element[]
}

export const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({
  children,
  location,
}) => (
  <TransitionGroup component={null}>
    <CSSTransition
      key={location.pathname}
      classNames={{
        enter: 'transition-transform duration-500 ease-out translate-x-full',
        enterActive: 'translate-x-0',
        exit: 'transition-transform duration-500 ease-out absolute top-16 left-0 w-full translate-x-0',
        exitActive: '-translate-x-full',
      }}
      timeout={500}
    >
      <Switch location={location}>{children}</Switch>
    </CSSTransition>
  </TransitionGroup>
)
