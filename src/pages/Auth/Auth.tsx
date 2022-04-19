import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '../../components/UI/Card/Card'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import { useSignInMutation, useSignUpMutation } from '../../api/auth'
import { useAppDispatch } from '../../hooks/store-hooks'
import { setTokenData, setUser } from '../../store/auth'

import { AuthFormData } from '../../types/auth'

import authBackground from '../../assets/auth-background.webp'
import Spinner from '../../components/UI/Spinner/Spinner'

const initialAuthFormData = {
  email: '',
  displayName: '',
  password: '',
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [authFormData, setAuthFormData] =
    useState<AuthFormData>(initialAuthFormData)

  const dispatch = useAppDispatch()

  const [signIn, { isLoading: isSigningIn }] = useSignInMutation()
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation()

  const navigate = useNavigate()

  const switchAuthModeHandler = () => {
    !isSigningIn && !isSigningUp && setIsLogin(prevMode => !prevMode)
  }

  const emailChangeHandler = (email: string) => {
    setAuthFormData(prevAuthFormData => ({ ...prevAuthFormData, email }))
  }

  const nameChangeHandler = (displayName: string) => {
    setAuthFormData(prevAuthFormData => ({
      ...prevAuthFormData,
      displayName: displayName,
    }))
  }
  const passwordChangeHandler = (password: string) => {
    setAuthFormData(prevAuthFormData => ({ ...prevAuthFormData, password }))
  }

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const { userData, tokenData } = isLogin
        ? await signIn(authFormData).unwrap()
        : await signUp(authFormData).unwrap()

      dispatch(setUser(userData))
      dispatch(setTokenData(tokenData))

      navigate('/', { replace: true })
    } catch (error) {}
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
        className={`text-indigo-500 inline-block font-bold cursor-pointer ${
          isSigningIn || isSigningUp ? 'cursor-not-allowed text-indigo-300' : ''
        }`}
        onClick={switchAuthModeHandler}
        tabIndex={0}
        role="button"
      >
        {isLogin ? 'Sign Up!' : 'Sign In!'}
      </div>
    </span>
  )

  const submitButtonContent = () => {
    if (isSigningIn || isSigningUp) {
      return <Spinner>Please wait...</Spinner>
    }

    return isLogin ? 'Sign In' : 'Create Account'
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
            value={authFormData.email}
            onChange={emailChangeHandler}
            classes="mb-4"
            disabled={isSigningIn || isSigningUp}
          />
          {!isLogin && (
            <Input
              id="name"
              type="text"
              label="Name"
              required={true}
              value={authFormData.displayName}
              onChange={nameChangeHandler}
              classes="mb-4"
              disabled={isSigningIn || isSigningUp}
            />
          )}
          <Input
            id="password"
            type="password"
            label="Password"
            required={true}
            value={authFormData.password}
            onChange={passwordChangeHandler}
            classes="mb-6"
            disabled={isSigningIn || isSigningUp}
          />
          <Button
            category="primary"
            type="submit"
            name="Submit Button"
            classes="w-full flex justify-center items-center"
            disabled={isSigningIn || isSigningUp}
          >
            {submitButtonContent()}
          </Button>
        </form>
      </Card>
    </section>
  )
}

export default Auth
