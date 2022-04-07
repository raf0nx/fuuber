import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('<Button />', () => {
  test('primary', () => {
    // Given
    render(<Button text="Primary" category="primary" />)

    // When
    const primaryBtn = screen.getByText(/primary/i)

    // Then
    expect(primaryBtn).toHaveClass(
      'text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300'
    )
  })

  test('secondary', () => {
    // Given
    render(<Button text="Secondary" category="secondary" />)

    // When
    const primaryBtn = screen.getByText(/secondary/i)

    // Then
    expect(primaryBtn).toHaveClass(
      'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-gray-200'
    )
  })

  test('error', () => {
    // Given
    render(<Button text="Error" category="error" type="reset" />)

    // When
    const primaryBtn = screen.getByText(/error/i)

    // Then
    expect(primaryBtn).toHaveClass(
      'text-white bg-red-600 hover:bg-red-700 focus:ring-red-300'
    )
  })
})
