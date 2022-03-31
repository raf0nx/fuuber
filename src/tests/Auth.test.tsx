import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Auth from '../pages/Auth'

describe('<Auth />', () => {
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
})
