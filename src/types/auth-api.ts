export interface SignUpResponse {
  displayName: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export interface SignInResponse extends SignUpResponse {
  registered: boolean
}
