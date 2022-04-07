import axios, { AxiosResponse } from 'axios'
import { SignInResponse, SignUpResponse } from '../types/auth-api'

import { firebaseConfig } from '../utils/config'

import { UserData } from '../types/user'

const URL_PREFIX = 'https://identitytoolkit.googleapis.com/v1/accounts'

export const signUp = (
  payload: UserData
): Promise<AxiosResponse<SignUpResponse>> => {
  return axios.post(
    `${URL_PREFIX}:signUp?key=${firebaseConfig.apiKey}`,
    payload
  )
}

export const signIn = (payload: {
  email: string
  password: string
}): Promise<AxiosResponse<SignInResponse>> => {
  return axios.post(
    `${URL_PREFIX}:signInWithPassword?key=${firebaseConfig.apiKey}`,
    payload
  )
}
