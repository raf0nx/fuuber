import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { NavActions } from './NavActions'

import { customRender } from 'utils/test-utils/CustomRender'
import { AUTH_USER_MOCK } from 'utils/test-utils/mocked-data'

const mockedUseHistory = jest.fn()

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useHistory: () => ({
    replace: mockedUseHistory,
  }),
}))

describe('<NavActions />', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    customRender(
      <MemoryRouter>
        <NavActions />
      </MemoryRouter>,
      {
        initialState: {
          auth: {
            user: {
              email: AUTH_USER_MOCK.email,
              displayName: AUTH_USER_MOCK.displayName,
            },
          },
        },
      }
    )
  })

  test('Should open dropdown on avatar click', async () => {
    // When
    await userEvent.click(screen.getByRole(/button/i))

    // Then
    expect(screen.getByText(AUTH_USER_MOCK.email)).toBeInTheDocument()
  })

  test('Should logout user on sign out click', async () => {
    // When
    await userEvent.click(screen.getByRole(/button/i))
    await userEvent.click(screen.getByText(/sign out/i))

    // Then
    expect(mockedUseHistory).toBeCalledWith('/auth')
  })

  test('Should logout user on sign out [Space]/[Enter] keydown', async () => {
    // When
    await userEvent.click(screen.getByRole(/button/i))
    screen.getByText(/sign out/i).focus()
    await userEvent.keyboard('[Space]')

    // Then
    expect(mockedUseHistory).toBeCalledWith('/auth')
  })

  test('Should open dropdown on [Space]/[Enter]', async () => {
    // When
    screen.getByRole(/button/i).focus()
    await userEvent.keyboard('[Enter]')

    // Then
    expect(screen.getByText(AUTH_USER_MOCK.displayName)).toBeInTheDocument()
  })

  test('Should close dropdown on [Escape] and focus dropdown activator', async () => {
    // When
    await userEvent.click(screen.getByRole(/button/i))
    await userEvent.keyboard('[Escape]')

    // Then
    // We need to waitFor because dismissing animation lasts 300ms
    await waitFor(() =>
      expect(screen.queryByText(AUTH_USER_MOCK.email)).not.toBeInTheDocument()
    )
    expect(screen.getByRole(/button/i)).toHaveFocus()
  })

  test('Should close dropdown when last item is blurred', async () => {
    // When
    await userEvent.click(screen.getByRole(/button/i))
    screen.getByText(/sign out/i).focus()
    await userEvent.tab()

    // Then
    // We need to waitFor because dismissing animation lasts 300ms
    await waitFor(() =>
      expect(screen.queryByText(AUTH_USER_MOCK.email)).not.toBeInTheDocument()
    )
  })

  test('Should close dropdown when route is changed and leave it open when route is not changed', async () => {
    // When
    await userEvent.click(screen.getByRole(/button/i))
    await userEvent.click(screen.getByText(/profile/i))

    // Then
    // We need to waitFor because dismissing animation lasts 300ms
    await waitFor(() =>
      expect(screen.queryByText(AUTH_USER_MOCK.email)).not.toBeInTheDocument()
    )

    await userEvent.click(screen.getByRole(/button/i))
    await userEvent.click(screen.getByText(/profile/i))

    expect(await screen.findByText(AUTH_USER_MOCK.email)).toBeInTheDocument()
  })

  test('Should close dropdown on click outside', async () => {
    // When
    await userEvent.click(screen.getByRole(/button/i))
    await userEvent.click(document.body)

    // Then
    // We need to waitFor because dismissing animation lasts 300ms
    await waitFor(() =>
      expect(screen.queryByText(AUTH_USER_MOCK.email)).not.toBeInTheDocument()
    )
  })
})
