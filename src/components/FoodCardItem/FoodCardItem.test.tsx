import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { SnackbarProvider } from 'notistack'

import { FoodCardItem } from './FoodCardItem'

import {
  FAVOURITES_IDS_MOCK,
  FOOD_ITEM_MOCK,
  USER_DATA_MOCK,
} from 'utils/test-utils/mocked-data'
import { customRender } from 'utils/test-utils/CustomRender'
import { firebaseConfig } from 'config/config'

const server = setupServer(
  rest.put(
    `${firebaseConfig.databaseURL}/favourites/${USER_DATA_MOCK.localId}.json`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(req.body))
    }
  )
)

describe('<FoodCardItem />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  describe('With authenticated user', () => {
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

    test('Should not display Add to Favourite button initally', async () => {
      // Then
      expect(
        screen.queryByLabelText(/add to favourites/i)
      ).not.toBeInTheDocument()
    })

    test('Should display Add to Favourite button on Food Card Item focus', async () => {
      // When
      await userEvent.tab()

      // Then
      expect(screen.getByLabelText(/add to favourites/i)).toBeInTheDocument()
    })

    test('Should display Add to Favourite button on Food Card Item hover', async () => {
      // When
      await userEvent.hover(screen.getByRole(/article/i))

      // Then
      expect(screen.getByLabelText(/add to favourites/i)).toBeInTheDocument()
    })

    test('Should not display Add to Favourite button when Food Card Item is unhovered', async () => {
      // Given
      const foodCardItem = screen.getByRole(/article/i)

      // When
      await userEvent.hover(foodCardItem)
      await userEvent.unhover(foodCardItem)

      // Then
      expect(
        screen.queryByLabelText(/add to favourites/i)
      ).not.toBeInTheDocument()
    })

    test('Should dismiss Food Card focus on Add To Cart button blur', async () => {
      // When
      // Tab 4 times to remove focus from Food Card completely
      await userEvent.tab()
      await userEvent.tab()
      await userEvent.tab()
      await userEvent.tab()

      // Then
      expect(
        screen.getByLabelText('Open modal with meal details')
      ).not.toHaveFocus()
      expect(screen.getByRole(/article/i)).not.toHaveClass('scale-105')
    })

    test('Should add item to favourites on Add to favourites click and remove item from favourites on Remove from favourites click', async () => {
      // When
      await userEvent.hover(screen.getByRole(/article/i))
      await userEvent.click(screen.getByLabelText(/add to favourites/i))

      // Then
      expect(
        await screen.findByLabelText(/remove from favourites/i)
      ).toBeInTheDocument()

      // When
      await userEvent.click(screen.getByLabelText(/remove from favourites/i))

      // Then
      expect(
        await screen.findByLabelText(/add to favourites/i)
      ).toBeInTheDocument()
    })

    test('Should add item to favourites on Add to favourites [Space]/[Enter] keydown', async () => {
      // When
      await userEvent.tab()
      await userEvent.tab()
      await userEvent.keyboard('[Enter]')

      // Then
      expect(
        await screen.findByLabelText(/remove from favourites/i)
      ).toBeInTheDocument()
    })
  })

  describe('Without authenticated user', () => {
    test("Shouldn't add item to favourites if there is no authenticated user", async () => {
      // Given
      customRender(
        <SnackbarProvider maxSnack={3}>
          <FoodCardItem item={FOOD_ITEM_MOCK} />
        </SnackbarProvider>,
        {
          initialState: {
            favourites: { favouritesIds: null },
          },
        }
      )

      // When
      await userEvent.hover(screen.getByRole(/article/i))
      await userEvent.click(screen.getByLabelText(/add to favourites/i))

      // Then
      // Add to favourites button is still in the document even after click
      expect(screen.getByLabelText(/add to favourites/i)).toBeInTheDocument()
    })
  })

  describe('With already added favorites', () => {
    test('Should add to favorites even when there are already favorites present', async () => {
      // Given
      customRender(
        <SnackbarProvider maxSnack={3}>
          <FoodCardItem item={FOOD_ITEM_MOCK} />
        </SnackbarProvider>,
        {
          initialState: {
            auth: { user: USER_DATA_MOCK },
            favourites: { favouritesIds: FAVOURITES_IDS_MOCK },
          },
        }
      )

      // When
      await userEvent.hover(screen.getByRole(/article/i))
      await userEvent.click(screen.getByLabelText(/add to favourites/i))

      // Then
      expect(
        await screen.findByLabelText(/remove from favourites/i)
      ).toBeInTheDocument()
    })
  })
})
