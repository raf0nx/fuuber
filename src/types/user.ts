export interface User {
  localId: string
  email: string
  displayName: string
  emailVerified: boolean
  photoUrl: string
}
export interface AuthFormUserData {
  email: string
  displayName: string
  password: string
}
