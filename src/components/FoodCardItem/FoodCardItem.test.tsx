import { SnackbarProvider } from 'notistack'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FoodCardItem } from './FoodCardItem'

import { FOOD_ITEM_MOCK, USER_DATA_MOCK } from 'utils/test-utils/mocked-data'
import { customRender } from 'utils/test-utils/CustomRender'

describe('<FoodCardItem />', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    customRender(
      <SnackbarProvider maxSnack={3}>
        <FoodCardItem item={FOOD_ITEM_MOCK} />
      </SnackbarProvider>,
      {
        initialState: {
          auth: { user: USER_DATA_MOCK },
          favourites: { favouritesIds: null },
        },
      }
    )
  })

  // TODO: Refactor tests when FoodModal is completely ready
  test("Should open a dialog with food details on FoodCardItem click and close the dialog on 'Close modal' button click", async () => {
    // When
    await userEvent.click(screen.getByRole(/article/i))

    // Then
    expect(screen.getByRole(/dialog/)).toBeInTheDocument()

    // When
    await userEvent.click(screen.getByLabelText(/close modal/i))

    // Then
    await waitFor(() =>
      expect(screen.queryByRole(/dialog/)).not.toBeInTheDocument()
    )
  })

  test('Should open a dialog with food details on [Space]/[Enter] keydown while FoodCardItem is focused', async () => {
    // When
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    // Then
    expect(screen.getByRole(/dialog/)).toBeInTheDocument()
  })

  test('Should open a dialog with food details on FoodCardItem button click', async () => {
    // When
    await userEvent.click(
      screen.getByLabelText(/open modal with meal details/i)
    )

    // Then
    expect(screen.getByRole(/dialog/)).toBeInTheDocument()
  })

  test("Should open a dialog with Food details on [Space]/[Enter] keydown while FoodCardItem button is focused and close the dialog on 'Close modal' button [Space]/[Enter] keydown", async () => {
    // When
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    // Then
    expect(screen.getByRole(/dialog/)).toBeInTheDocument()

    // When
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    // Then
    await waitFor(() =>
      expect(screen.queryByRole(/dialog/)).not.toBeInTheDocument()
    )
  })
})
