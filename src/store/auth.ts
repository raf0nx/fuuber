import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authApi } from '../api/auth'

import { TokenData, User } from '../types/auth'

export interface Auth {
  user: User | null
  isLoggedIn: boolean
  idToken: string
  refreshToken: string
  expiresIn: string
}

const initialState: Auth = {
  user: null,
  isLoggedIn: false,
  idToken: '',
  refreshToken: '',
  expiresIn: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      state.user = payload
    },
    setTokenData(state, { payload }: PayloadAction<TokenData>) {
      state.idToken = payload.idToken
      state.refreshToken = payload.refreshToken
      state.expiresIn = payload.expiresIn
      state.isLoggedIn = !!payload.idToken
    },
    logout: () => initialState,
  },
  extraReducers: builder => {
    // TODO: Refactor this matcher (especially type assuming)
    builder.addMatcher(
      authApi.endpoints.getUserData.matchFulfilled,
      (state, { payload }) => {
        const foundUser = payload.find(
          user => user.localId === state.user?.localId
        )!
        state.user = {
          localId: foundUser.localId,
          email: foundUser.email,
          displayName: foundUser.displayName,
          emailVerified: foundUser.emailVerified,
          photoUrl: foundUser.photoUrl,
          createdAt: foundUser.createdAt,
          incompleteData: false,
        }
      }
    )
  },
})

export const { setUser, setTokenData, logout } = authSlice.actions

export default authSlice.reducer
