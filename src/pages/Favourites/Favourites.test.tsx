import { screen } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'

import { Favourites } from './Favourites'

import { customRender } from 'utils/test-utils/CustomRender'
import { FAVOURITES_IDS_MOCK, FOODS_MOCK } from 'utils/test-utils/mocked-data'

describe('<Favourites />', () => {
  test('Should correctly show favourites sorted by most recently added', async () => {
    // Given
    customRender(
      <SnackbarProvider maxSnack={3}>
        <Favourites />
      </SnackbarProvider>,
      {
        initialState: {
          food: { availableMeals: FOODS_MOCK },
          favourites: { favouritesIds: FAVOURITES_IDS_MOCK },
        },
      }
    )

    // Then
    // The first article should be the most recently added favourite (see favouriteIds mocked array)
    expect(screen.getAllByRole(/article/i)[0]).toHaveTextContent(
      FOODS_MOCK[4].name
    )
    // The lsat article should be the least recently added favourite (see favouriteIds mocked array)
    expect(screen.getAllByRole(/article/i).slice(-1)[0]).toHaveTextContent(
      FOODS_MOCK[1].name
    )
  })

  test('Should display an information to an end user when there are no favourite meals', async () => {
    // Given
    customRender(
      <SnackbarProvider maxSnack={3}>
        <Favourites />
      </SnackbarProvider>,
      {
        initialState: {
          food: { availableMeals: FOODS_MOCK },
          favourites: { favouritesIds: null },
        },
      }
    )

    // Then
    expect(
      screen.getByText(/you have no favourite meals at this moment/i)
    ).toBeInTheDocument()
    expect(screen.queryByRole(/article/i)).not.toBeInTheDocument()
  })
})
