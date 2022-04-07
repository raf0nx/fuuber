import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import Auth from './Auth'

import { firebaseConfig } from '../../utils/config'

// Mock Axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedUsedNavigate = jest.fn()

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

describe('<Auth />', () => {
  const URL_PREFIX = 'https://identitytoolkit.googleapis.com/v1/accounts'

  const testUserData = {
    email: 'test@email.com',
    displayName: 'Name',
    password: 'Password',
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should change auth mode', () => {
    // Given
    render(<Auth />)

    // When
    expect(screen.getByText(/really hungry?/i)).toBeInTheDocument()
    const changeAuthModeBtn = screen.getByText(/sign up!/i)
    userEvent.click(changeAuthModeBtn)

    // Then
    expect(screen.queryByText(/really hungry?/i)).not.toBeInTheDocument()
    expect(screen.getByText(/create a new account/i)).toBeInTheDocument()
  })

  test('should update email, name and password', () => {
    // Given
    render(<Auth />)
    const changeAuthModeBtn = screen.getByText(/sign up!/i)

    // When
    userEvent.click(changeAuthModeBtn)

    const emailInput = screen.getByLabelText(/e-mail address/i)
    const nameInput = screen.getByLabelText(/name/i)
    const passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(emailInput, testUserData.email)
    userEvent.type(nameInput, testUserData.displayName)
    userEvent.type(passwordInput, 'Password')

    // Then
    expect(screen.getByText(/e-mail address/i)).toBeInTheDocument()
    expect(screen.getByText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/password/i)).toBeInTheDocument()
  })

  // TODO: Needs to be refactored
  test('should sign in user in login mode', () => {
    // Given
    render(<Auth />)
    mockedAxios.post.mockImplementation(() => Promise.resolve())

    const emailInput = screen.getByLabelText(/e-mail address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByText(/sign in/i)

    // When
    userEvent.type(emailInput, testUserData.email)
    userEvent.type(passwordInput, testUserData.password)
    userEvent.click(signInButton)

    // Then
    expect(axios.post).toHaveBeenCalledWith(
      `${URL_PREFIX}:signInWithPassword?key=${firebaseConfig.apiKey}`,
      { email: testUserData.email, password: testUserData.password }
    )
  })

  // TODO: Needs to be refactored
  test('should register a user in register mode', () => {
    // Given
    render(<Auth />)
    mockedAxios.post.mockImplementation(() => Promise.resolve())

    const changeAuthModeBtn = screen.getByText(/sign up!/i)
    userEvent.click(changeAuthModeBtn)

    const emailInput = screen.getByLabelText(/e-mail address/i)
    const nameInput = screen.getByLabelText(/name/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signUpButton = screen.getByText(/create account/i)

    // When
    userEvent.type(emailInput, testUserData.email)
    userEvent.type(nameInput, testUserData.displayName)
    userEvent.type(passwordInput, testUserData.password)
    userEvent.click(signUpButton)

    // Then
    expect(axios.post).toHaveBeenCalledWith(
      `${URL_PREFIX}:signUp?key=${firebaseConfig.apiKey}`,
      {
        email: testUserData.email,
        displayName: testUserData.displayName,
        password: testUserData.password,
      }
    )
  })

  // TODO: Needs to be refactored
  test('should catch an error while authenticating', async () => {
    // Given
    render(<Auth />)
    mockedAxios.post.mockImplementation(() => Promise.reject({ status: 400 }))

    const emailInput = screen.getByLabelText(/e-mail address/i)
    const signInButton = screen.getByText(/sign in/i)

    // When
    userEvent.type(emailInput, testUserData.email)
    userEvent.click(signInButton)

    // Then
    await expect(axios.post).rejects.toEqual({ status: 400 })
  })
})
