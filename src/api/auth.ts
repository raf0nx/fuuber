import axios, { AxiosResponse } from 'axios'
import { AuthResponse } from '../types/auth-api'

import { firebaseConfig } from '../utils/config'

import { AuthFormUserData } from '../types/user'

const URL_PREFIX = 'https://identitytoolkit.googleapis.com/v1/accounts'

export const signUp = (
  payload: AuthFormUserData
): Promise<AxiosResponse<AuthResponse>> => {
  return axios.post(`${URL_PREFIX}:signUp?key=${firebaseConfig.apiKey}`, {
    ...payload,
    returnSecureToken: true,
  })
}

export const signIn = (payload: {
  email: string
  password: string
}): Promise<AxiosResponse<AuthResponse>> => {
  return axios.post(
    `${URL_PREFIX}:signInWithPassword?key=${firebaseConfig.apiKey}`,
    { ...payload, returnSecureToken: true }
  )
}
