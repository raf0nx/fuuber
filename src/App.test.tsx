import { MemoryRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'

import App from './App'

import { customRender } from './utils/test-utils'

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
})
