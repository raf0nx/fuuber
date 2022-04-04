import { useState } from 'react'

import Card from '../../components/UI/Card/Card'

import authBackground from '../../assets/auth-background.webp'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  const switchAuthModeHandler = () => {
    setIsLogin(prevMode => !prevMode)
  }

  const getAuthModeTitle = () =>
    isLogin ? 'Really hungry? 🍕🍔' : 'Create a new account'

  const getAuthModeSubtitle = () =>
    isLogin
      ? 'But first, log in or create an account so that we can identify our foodie!'
      : 'Remember to be polite enough to provide real credentials 🥴'

  const authPageAction = (
    <span className="text-xs select-none">
      {isLogin ? "Don't have an account? " : 'Already have an account? '}
      <span
        className="text-indigo-500 font-bold opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={switchAuthModeHandler}
      >
        {isLogin ? 'Sign Up!' : 'Sign In!'}
      </span>
    </span>
  )

  return (
    <section className="w-full h-full flex justify-evenly items-center">
      <img
        className="absolute -z-10 bg-center object-cover h-full w-full"
        src={authBackground}
        alt="Food nicely presented"
      />
      <div />
      <Card
        title={getAuthModeTitle()}
        className="w-128"
        subtitle={getAuthModeSubtitle()}
        actions={authPageAction}
        actionsClasses="flex justify-center"
      >
        TBD...
      </Card>
    </section>
  )
}

export default Auth
