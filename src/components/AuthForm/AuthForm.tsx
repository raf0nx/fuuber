import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import FormInput from '../UI/FormInput'
import Spinner from '../UI/Spinner'
import Card from '../UI/Card'
import Button from '../UI/Button'
import Alert from '../UI/Alert'

import { useAppDispatch } from 'hooks/store-hooks'
import { useSignInMutation, useSignUpMutation } from 'api/auth'
import { setTokenData, setUser } from 'store/slices/auth'
import { authFormValidationSchema } from './validation-schema'
import { capitalize, snakeCaseToSentenceCase } from 'utils/string-utils'

import { AuthFormData } from 'types/auth'
import { ErrorResponse } from 'types/auth-api'

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<AuthFormData>({
    resolver: yupResolver(authFormValidationSchema(isLogin)),
  })

  const [signIn, { isLoading: isSigningIn }] = useSignInMutation()
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation()

  const history = useHistory()

  const switchAuthModeHandler = () => {
    clearErrors()
    setIsAlertVisible(false)
    !isSigningIn && !isSigningUp && setIsLogin(prevMode => !prevMode)
  }

  const dismissAlertHandler = () => {
    setIsAlertVisible(false)
  }

  const submitHandler = async (data: AuthFormData) => {
    try {
      const { userData, tokenData } = isLogin
        ? await signIn(data).unwrap()
        : await signUp(data).unwrap()

      dispatch(setUser(userData))
      dispatch(setTokenData(tokenData))

      history.replace('/home')
    } catch (error) {
      const { data } = error as ErrorResponse

      setIsAlertVisible(true)
      setAlertMessage(
        capitalize(snakeCaseToSentenceCase(data.error.message.toLowerCase()))
      )
    }
  }

  const submitButtonContent = () => {
    if (isSigningIn || isSigningUp) {
      return <Spinner>Please wait...</Spinner>
    }

    return isLogin ? 'Sign In' : 'Create Account'
  }

  return (
    <Card classes="w-128 p-6 shadow-slate-400">
      <h1 className="text-2xl antialiased font-bold text-gray-900 mb-2">
        {isLogin ? 'Really hungry? 🍕🍔' : 'Create a new account'}
      </h1>
      <h2 className="text-sm opacity-60">
        {isLogin
          ? 'But first, log in or create an account so that we can identify our foodie!'
          : 'Remember to be polite enough to provide real credentials!'}
      </h2>
      <div className="my-8">
        <form onSubmit={handleSubmit(submitHandler)} className="relative mt-11">
          <CSSTransition
            in={isAlertVisible}
            timeout={{
              enter: 700,
              exit: 280,
            }}
            mountOnEnter
            unmountOnExit
            classNames={{
              enterActive: 'animate-slide-in',
              exitActive: 'animate-fade-out',
            }}
          >
            <Alert
              type="danger"
              message={alertMessage}
              dismissable={true}
              onDismissAlert={dismissAlertHandler}
              classes="absolute w-full -top-16"
            />
          </CSSTransition>
          <FormInput
            id="email"
            name="email"
            type="email"
            label="E-mail address"
            required={true}
            disabled={isSigningIn || isSigningUp}
            placeholder="eat@food.com"
            register={register}
            errors={errors}
          />
          {!isLogin && (
            <FormInput
              id="displayName"
              name="displayName"
              type="text"
              label="Name"
              required={true}
              disabled={isSigningIn || isSigningUp}
              placeholder="John Doe"
              register={register}
              errors={errors}
            />
          )}
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            required={true}
            disabled={isSigningIn || isSigningUp}
            placeholder="••••••••"
            classes="mb-4"
            register={register}
            errors={errors}
          />
          <Button
            category="primary"
            type="submit"
            name="Submit Button"
            classes="w-full flex justify-center items-center"
            disabled={
              isSigningIn || isSigningUp || !!Object.keys(errors).length
            }
          >
            {submitButtonContent()}
          </Button>
        </form>
      </div>
      <div className="flex justify-center">
        <span className="text-xs select-none text-gray-900">
          {isLogin ? "Don't have an account? " : 'Already a member? '}
          <div
            className={classNames(
              'text-indigo-500 inline-block font-bold cursor-pointer',
              {
                'cursor-not-allowed text-indigo-300':
                  isSigningIn || isSigningUp,
              }
            )}
            onClick={switchAuthModeHandler}
            onKeyDown={(event: React.KeyboardEvent) =>
              (event.code === 'Enter' || event.code === 'Space') &&
              switchAuthModeHandler()
            }
            tabIndex={0}
            role="button"
          >
            {isLogin ? 'Sign Up!' : 'Sign In!'}
          </div>
        </span>
      </div>
    </Card>
  )
}
