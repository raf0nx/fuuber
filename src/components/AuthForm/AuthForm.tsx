import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'

import FormInput from '../UI/Input/FormInput'
import Spinner from '../UI/Spinner/Spinner'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'

import { useAppDispatch } from '../../hooks/store-hooks'
import { useSignInMutation, useSignUpMutation } from '../../api/auth'
import { setTokenData, setUser } from '../../store/auth'
import { authFormValidationSchema } from './validation-schema'

import { AuthFormData } from '../../types/auth'

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
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

  const navigate = useNavigate()

  const switchAuthModeHandler = () => {
    clearErrors()
    !isSigningIn && !isSigningUp && setIsLogin(prevMode => !prevMode)
  }

  const submitHandler = async (data: AuthFormData) => {
    try {
      const { userData, tokenData } = isLogin
        ? await signIn(data).unwrap()
        : await signUp(data).unwrap()

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
      : 'Remember to be polite enough to provide real credentials!'

  const submitButtonContent = () => {
    if (isSigningIn || isSigningUp) {
      return <Spinner>Please wait...</Spinner>
    }

    return isLogin ? 'Sign In' : 'Create Account'
  }

  const authPageAction = (
    <span className="text-xs select-none text-gray-900">
      {isLogin ? "Don't have an account? " : 'Already a member? '}
      <div
        className={classNames(
          'text-indigo-500 inline-block font-bold cursor-pointer',
          { 'cursor-not-allowed text-indigo-300': isSigningIn || isSigningUp }
        )}
        onClick={switchAuthModeHandler}
        tabIndex={0}
        role="button"
      >
        {isLogin ? 'Sign Up!' : 'Sign In!'}
      </div>
    </span>
  )

  return (
    <Card
      title={getAuthModeTitle()}
      classes="w-128"
      subtitle={getAuthModeSubtitle()}
      actions={authPageAction}
      actionsClasses="flex justify-center"
    >
      <form onSubmit={handleSubmit(submitHandler)}>
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
          disabled={isSigningIn || isSigningUp || !!Object.keys(errors).length}
        >
          {submitButtonContent()}
        </Button>
      </form>
    </Card>
  )
}

export default AuthForm
