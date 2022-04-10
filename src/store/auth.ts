import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types/user'

export interface Auth {
  user: User | null
  idToken: string
  refreshToken: string
  expiresIn: string
}

const initialState: Auth = {
  user: null,
  idToken: '',
  refreshToken: '',
  expiresIn: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const authActions = authSlice.actions

export default authSlice.reducer
