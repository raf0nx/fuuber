export interface User {
  localId: string
  email: string
  displayName: string
  emailVerified?: boolean
  photoUrl?: string
  createdAt?: string
  // Needed for fetching more data about user than we get just from authenticating
  incompleteData?: boolean
}

export interface AuthFormData {
  email: string
  displayName: string
  password: string
}

export interface TokenData {
  idToken: string
  refreshToken: string
  expiresIn: string
}
