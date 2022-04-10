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
