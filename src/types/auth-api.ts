import { TokenData, User } from './auth'

export interface AuthResponse {
  displayName: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  kind: string
  registered?: boolean
}

export interface TransformedAuthResponse {
  userData: User
  tokenData: TokenData
}

export interface ErrorResponse {
  data: { error: { message: string; code: number }; status: number }
}
