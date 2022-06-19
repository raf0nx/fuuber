import { screen } from '@testing-library/react'

import { Navbar } from './Navbar'

import { customRender } from 'utils/test-utils/CustomRender'
import { MemoryRouter } from 'react-router-dom'

describe('<Navbar />', () => {
  test('Should display a Badge with favourite foods count', () => {
    // Given
    customRender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      {
        initialState: { favourites: { favouritesIds: ['0', '1', '2'] } },
      }
    )

    // Then
    expect(screen.getByRole('presentation')).toHaveTextContent('3')
  })

  test('Should not display a Badge with favourite foods count when there are no favourites', () => {
    // Given
    customRender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      {
        initialState: { favourites: { favouritesIds: null } },
      }
    )

    // Then
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  })
})
