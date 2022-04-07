import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '../../components/UI/Card/Card'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import { signIn, signUp } from '../../api/auth'

import { UserData } from '../../types/user'

import authBackground from '../../assets/auth-background.webp'

const initialUserData = {
  email: '',
  displayName: '',
  password: '',
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [userData, setUserData] = useState<UserData>(initialUserData)

  const navigate = useNavigate()

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
    <span className="text-xs select-none text-gray-900">
      {isLogin ? "Don't have an account? " : 'Already have an account? '}
      <div
        className="text-indigo-500 inline-block font-bold cursor-pointer"
        onClick={switchAuthModeHandler}
        tabIndex={0}
        role="button"
      >
        {isLogin ? 'Sign Up!' : 'Sign In!'}
      </div>
    </span>
  )

  const emailChangeHandler = (email: string) => {
    setUserData(prevUserData => ({ ...prevUserData, email }))
  }

  const nameChangeHandler = (displayName: string) => {
    setUserData(prevUserData => ({ ...prevUserData, displayName: displayName }))
  }
  const passwordChangeHandler = (password: string) => {
    setUserData(prevUserData => ({ ...prevUserData, password }))
  }

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      isLogin
        ? await signIn({
            email: userData.email,
            password: userData.password,
          })
        : await signUp(userData)

      navigate('/', { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

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
        classes="w-128"
        subtitle={getAuthModeSubtitle()}
        actions={authPageAction}
        actionsClasses="flex justify-center"
      >
        <form onSubmit={submitHandler}>
          <Input
            id="email"
            type="email"
            label="E-mail address"
            required={true}
            value={userData.email}
            changeHandler={emailChangeHandler}
            classes="mb-4"
          />
          {!isLogin && (
            <Input
              id="name"
              type="text"
              label="Name"
              required={true}
              value={userData.displayName}
              changeHandler={nameChangeHandler}
              classes="mb-4"
            />
          )}
          <Input
            id="password"
            type="password"
            label="Password"
            required={true}
            value={userData.password}
            changeHandler={passwordChangeHandler}
            classes="mb-6"
          />
          <Button
            text={isLogin ? 'Sign In' : 'Create Account'}
            category="primary"
            type="submit"
            name="Submit Button"
            classes="w-full"
          />
        </form>
      </Card>
    </section>
  )
}

export default Auth
