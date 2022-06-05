import { MemoryRouter } from 'react-router-dom'
import { screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import App from 'App'

import { customRender } from 'utils/test-utils/CustomRender'
import { BASE_AUTH_URL_MOCK } from 'utils/test-utils/mocked-data'

describe('<App />', () => {
  test('should render login page while user not authenticated', () => {
    // Given
    customRender(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // Then
    expect(screen.getByText(/really hungry?/i)).toBeInTheDocument()
  })

  test('should render home page while user logged in', () => {
    // Given
    customRender(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { initialState: { auth: { isLoggedIn: true } } }
    )

    // Then
    expect(screen.getByText(/welcome home!/i)).toBeInTheDocument()
  })

  test('should get user data when the page is (re)loaded and auth data is present in the session storage', async () => {
    // Given
    const server = setupServer(
      rest.post(`${BASE_AUTH_URL_MOCK}:lookup`, (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            kind: 'test',
            users: [
              {
                localId: 'localId',
                email: 'test@email.com',
                displayName: 'Test',
                emailVerified: false,
                photoUrl: 'png',
                createdAt: 'now',
              },
            ],
          })
        )
      })
    )
    server.listen()

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('test')
    customRender(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // Then
    expect(await waitFor(() => screen.findByText('Test'))).toBeInTheDocument()
    server.close()
  })
})
