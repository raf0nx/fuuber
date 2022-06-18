import { MemoryRouter } from 'react-router-dom'
import { screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import App from 'App'

import { customRender } from 'utils/test-utils/CustomRender'
import { BASE_AUTH_URL_MOCK } from 'utils/test-utils/mocked-data'
import { firebaseConfig } from 'config/config'

describe('<App />', () => {
  test('Should render login page while user not authenticated', () => {
    // Given
    customRender(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // Then
    expect(screen.getByText(/really hungry?/i)).toBeInTheDocument()
  })

  test('Should render home page while user logged in', () => {
    // Given
    customRender(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { initialState: { auth: { isLoggedIn: true } } }
    )

    // Then
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })

  test('Should get user data when the page is (re)loaded and auth data is present in the session storage', async () => {
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
      }),
      rest.get(`${firebaseConfig.databaseURL}/foods.json`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json([]))
      }),
      rest.get(
        `${firebaseConfig.databaseURL}/favourites/localId.json`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(null))
        }
      )
    )
    server.listen()

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('test')
    customRender(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // Then
    expect(
      await waitFor(() => screen.findByText('Welcome, Test!'))
    ).toBeInTheDocument()
    server.close()
  })
})
