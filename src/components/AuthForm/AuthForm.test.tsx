import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import AuthForm from '.'

import { customRender } from 'utils/test-utils/CustomRender'
import {
  AUTH_USER_MOCK,
  BASE_AUTH_URL_MOCK,
} from 'utils/test-utils/mocked-data'

const server = setupServer(
  rest.post(`${BASE_AUTH_URL_MOCK}:signInWithPassword`, (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        localId: 'localId',
        email: AUTH_USER_MOCK.email,
        displayName: AUTH_USER_MOCK.displayName,
        idToken: 'authToken',
        refreshToken: 'refreshToken',
        expiresIn: 'timestamp',
      })
    )
  }),
  rest.post(`${BASE_AUTH_URL_MOCK}:signUp`, (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        localId: 'localId',
        email: AUTH_USER_MOCK.email,
        displayName: AUTH_USER_MOCK.displayName,
        idToken: 'authToken',
        refreshToken: 'refreshToken',
        expiresIn: 'timestamp',
      })
    )
  })
)

const mockedUseHistory = jest.fn()

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useHistory: () => ({
    replace: mockedUseHistory,
  }),
}))

describe('<AuthForm />', () => {
  beforeAll(() => server.listen())

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    customRender(<AuthForm />)
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test('Should change auth mode', async () => {
    // Given
    expect(screen.getByText(/really hungry?/i)).toBeInTheDocument()

    // When
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.keyboard('[space]')

    // Then
    expect(screen.queryByText(/really hungry?/i)).not.toBeInTheDocument()
    expect(screen.getByText(/create a new account/i)).toBeInTheDocument()
  })

  test('Should update email, name and password', async () => {
    // Given
    const changeAuthModeBtn = screen.getByText(/sign up!/i)

    // When
    await userEvent.click(changeAuthModeBtn)

    const emailInput = screen.getByLabelText(/e-mail address/i)
    const nameInput = screen.getByLabelText(/name/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await userEvent.type(emailInput, AUTH_USER_MOCK.email)
    await userEvent.type(nameInput, AUTH_USER_MOCK.displayName)
    await userEvent.type(passwordInput, AUTH_USER_MOCK.password)

    // Then
    expect((emailInput as HTMLInputElement).value).toBe(AUTH_USER_MOCK.email)
    expect((nameInput as HTMLInputElement).value).toBe(
      AUTH_USER_MOCK.displayName
    )
    expect((passwordInput as HTMLInputElement).value).toBe(
      AUTH_USER_MOCK.password
    )
  })

  test('Should sign in user in login mode', async () => {
    // Given

    const emailInput = screen.getByLabelText(/e-mail address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByText(/sign in/i)

    // When
    await userEvent.type(emailInput, AUTH_USER_MOCK.email)
    await userEvent.type(passwordInput, AUTH_USER_MOCK.password)
    await userEvent.click(signInButton)

    // Then
    await screen.findByText(/please wait.../i)
    await waitFor(() => expect(mockedUseHistory).toHaveBeenCalled())
  })

  test('Should sign up a user in register mode', async () => {
    // Given
    const changeAuthModeBtn = screen.getByText(/sign up!/i)

    // When
    await userEvent.click(changeAuthModeBtn)

    const emailInput = screen.getByLabelText(/e-mail address/i)
    const nameInput = screen.getByLabelText(/name/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signUpButton = screen.getByText(/create account/i)

    await userEvent.type(emailInput, AUTH_USER_MOCK.email)
    await userEvent.type(nameInput, AUTH_USER_MOCK.displayName)
    await userEvent.type(passwordInput, AUTH_USER_MOCK.password)
    await userEvent.click(signUpButton)

    // Then
    expect(await screen.findByText(/please wait.../i)).toBeInTheDocument()
    await waitFor(() => expect(mockedUseHistory).toHaveBeenCalled())
  })

  test('Should catch a server side error, display error message in the alert and dismiss the alert', async () => {
    // Given
    server.use(
      rest.post(
        'https://identitytoolkit.googleapis.com/v1/accounts/:signInWithPassword',
        (_, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: {
                message: 'Invalid password',
                code: 400,
              },
            })
          )
        }
      )
    )

    const emailInput = screen.getByLabelText(/e-mail address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByText(/sign in/i)

    // When
    await userEvent.type(emailInput, AUTH_USER_MOCK.email)
    await userEvent.type(passwordInput, AUTH_USER_MOCK.password)
    await userEvent.click(signInButton)

    // Then
    expect(await screen.findByText(/invalid password/i)).toBeInTheDocument()

    const closeAlertBtn = screen.getByRole('button', { name: 'Close' })
    await userEvent.click(closeAlertBtn)

    await waitFor(() =>
      expect(screen.queryByText(/invalid password/i)).not.toBeInTheDocument()
    )
  })
})
