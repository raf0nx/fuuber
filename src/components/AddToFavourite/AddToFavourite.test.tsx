import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { SnackbarProvider } from 'notistack'

import { AddToFavourite } from './AddToFavourite'

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

describe('<AddToFavourite />', () => {
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
          <AddToFavourite item={FOOD_ITEM_MOCK} />
        </SnackbarProvider>,
        {
          initialState: {
            auth: { user: USER_DATA_MOCK },
            favourites: { favouritesIds: null },
          },
        }
      )
    })

    test('Should add item to favourites on Add to favourites click and remove item from favourites on Remove from favourites click', async () => {
      // When
      await userEvent.click(screen.getByLabelText(/add to favourites/i))

      // Then
      expect(
        await screen.findByText(
          `${FOOD_ITEM_MOCK.name}'s been added to favourites`
        )
      ).toBeInTheDocument()

      // When
      await userEvent.click(screen.getByLabelText(/remove from favourites/i))

      // Then
      expect(
        await screen.findByText(
          `${FOOD_ITEM_MOCK.name}'s been removed from favourites`
        )
      ).toBeInTheDocument()
    })

    test('Should add item to favourites on Add to favourites [Space]/[Enter] keydown', async () => {
      // When
      await userEvent.tab()
      await userEvent.keyboard('[Enter]')

      // Then
      expect(
        await screen.findByText(
          `${FOOD_ITEM_MOCK.name}'s been added to favourites`
        )
      ).toBeInTheDocument()
    })
  })

  describe('Without authenticated user', () => {
    test("Shouldn't add item to favourites if there is no authenticated user", async () => {
      // Given
      customRender(
        <SnackbarProvider maxSnack={3}>
          <AddToFavourite item={FOOD_ITEM_MOCK} />
        </SnackbarProvider>,
        {
          initialState: {
            favourites: { favouritesIds: null },
          },
        }
      )

      // When
      await userEvent.click(screen.getByLabelText(/add to favourites/i))

      // Then
      expect(
        screen.queryByText(`${FOOD_ITEM_MOCK.name}'s been added to favourites`)
      ).not.toBeInTheDocument()
    })
  })

  describe('With already added favorites', () => {
    test('Should add to favorites even if there are already favorites present', async () => {
      // Given
      customRender(
        <SnackbarProvider maxSnack={3}>
          <AddToFavourite item={FOOD_ITEM_MOCK} />
        </SnackbarProvider>,
        {
          initialState: {
            auth: { user: USER_DATA_MOCK },
            favourites: { favouritesIds: FAVOURITES_IDS_MOCK },
          },
        }
      )

      // When
      await userEvent.click(screen.getByLabelText(/add to favourites/i))

      // Then
      expect(
        await screen.findByText(
          `${FOOD_ITEM_MOCK.name}'s been added to favourites`
        )
      ).toBeInTheDocument()
    })
  })

  describe('With some server error', () => {
    test('Should display error Snackbar when adding a new favourite item failed', async () => {
      // Given
      server.use(
        rest.put(
          `${firebaseConfig.databaseURL}/favourites/${USER_DATA_MOCK.localId}.json`,
          (_, res, ctx) => {
            return res(ctx.status(400))
          }
        )
      )

      customRender(
        <SnackbarProvider maxSnack={3}>
          <AddToFavourite item={FOOD_ITEM_MOCK} />
        </SnackbarProvider>,
        {
          initialState: {
            auth: { user: USER_DATA_MOCK },
            favourites: { favouritesIds: null },
          },
        }
      )

      // When
      await userEvent.click(screen.getByLabelText(/add to favourites/i))

      // Then
      expect(
        await screen.findByText(
          'Adding meal to favourite failed! Please try again'
        )
      ).toBeInTheDocument()
    })
  })
})
