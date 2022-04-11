import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { firebaseConfig } from '../utils/config'

import { AuthResponse, TransformedAuthResponse } from '../types/auth-api'
import { AuthFormData, User } from '../types/auth'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/accounts',
  }),
  endpoints: build => ({
    signIn: build.mutation<TransformedAuthResponse, AuthFormData>({
      query: payload => ({
        url: `:signInWithPassword?key=${firebaseConfig.apiKey}`,
        method: 'POST',
        body: { ...payload, returnSecureToken: true },
      }),
      transformResponse: (response: AuthResponse) => {
        return {
          userData: {
            localId: response.localId,
            email: response.email,
            displayName: response.displayName,
            incompleteData: true,
          },
          tokenData: {
            idToken: response.idToken,
            refreshToken: response.refreshToken,
            expiresIn: response.expiresIn,
          },
        }
      },
    }),
    signUp: build.mutation<TransformedAuthResponse, AuthFormData>({
      query: payload => ({
        url: `:signUp?key=${firebaseConfig.apiKey}`,
        method: 'POST',
        body: { ...payload, returnSecureToken: true },
      }),
      transformResponse: (response: AuthResponse) => {
        return {
          userData: {
            localId: response.localId,
            email: response.email,
            displayName: response.displayName,
            incompleteData: true,
          },
          tokenData: {
            idToken: response.idToken,
            refreshToken: response.refreshToken,
            expiresIn: response.expiresIn,
          },
        }
      },
    }),
    getUserData: build.query<User[], string>({
      query: idToken => ({
        url: `:lookup?key=${firebaseConfig.apiKey}`,
        method: 'POST',
        body: { idToken },
      }),
      transformResponse: (response: { kind: string; users: User[] }) =>
        response.users,
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation, useLazyGetUserDataQuery } =
  authApi
