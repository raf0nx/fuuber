import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Card from '../../components/UI/Card/Card'
import FormInput from '../../components/UI/Input/FormInput'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

import { useSignInMutation, useSignUpMutation } from '../../api/auth'
import { useAppDispatch } from '../../hooks/store-hooks'
import { setTokenData, setUser } from '../../store/auth'

import { AuthFormData } from '../../types/auth'

import authBackground from '../../assets/auth-background.webp'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<AuthFormData>({
    resolver: yupResolver(
      yup
        .object({
          email: yup
            .string()
            .required('Email is required')
            .email('Email must be a valid email address'),
          displayName: isLogin
            ? yup.string()
            : yup.string().required('Name is required').trim(),
          password: isLogin
            ? yup.string().required('Password is required')
            : yup
                .string()
                .required('Password is required')
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  'Password needs to have min 8 characters, at least one uppercase and lowercase letter and one number'
                ),
        })
        .required()
    ),
  })

  const dispatch = useAppDispatch()

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
        <form onSubmit={handleSubmit(submitHandler)}>
          <FormInput
            id="email"
            name="email"
            type="email"
            label="E-mail address"
            required={true}
            disabled={isSigningIn || isSigningUp}
            placeholder="eat@food.com"
            classes="mb-4"
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
              classes="mb-4"
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
            classes="mb-6"
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
      </Card>
    </section>
  )
}

export default Auth
