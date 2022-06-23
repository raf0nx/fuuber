import { screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { SnackbarProvider } from 'notistack'

import { Foods } from './Foods'

import { firebaseConfig } from 'config/config'
import { customRender } from 'utils/test-utils/CustomRender'
import { USER_DATA_MOCK } from 'utils/test-utils/mocked-data'

const server = setupServer(
  rest.get(`${firebaseConfig.databaseURL}/foods.json`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          description: 'Choco Sundae Cup (100 ml)',
          id: 0,
          img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/choco-sundae.e0d29fd156012e251c099c2771219d18.1.jpg?width=800',
          name: 'Choco Sundae',
          price: 29.99,
        },

        {
          description: 'Cornetto Double Chocolate Cone (105 ml)',
          id: 1,
          img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/cornetto-double-chocolate.acc21849ac732f2f85998ad73e532d40.1.jpg?width=522',
          name: 'Cornetto Double Chocolate',
          price: 38.99,
        },
      ])
    )
  }),
  rest.get(
    `${firebaseConfig.databaseURL}/favourites/${USER_DATA_MOCK.localId}.json`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(['0', '1']))
    }
  )
)

describe('<Foods />', () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test('Should display all available foods from the server', async () => {
    // Given
    customRender(
      <SnackbarProvider maxSnack={3}>
        <Foods />
      </SnackbarProvider>,
      {
        initialState: {
          auth: { user: USER_DATA_MOCK },
        },
      }
    )

    // Then
    expect(await screen.findAllByRole('article')).toHaveLength(2)
    // The first heading is the one we are interested in, the next ones are headings for food cards
    expect(screen.getAllByRole(/heading/i)[0]).toHaveTextContent(
      'Available meals (2)'
    )
  })

  test('Should display information when there are no available food', async () => {
    // Given
    server.use(
      rest.get(`${firebaseConfig.databaseURL}/foods.json`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json([]))
      })
    )

    customRender(
      <SnackbarProvider maxSnack={3}>
        <Foods />
      </SnackbarProvider>
    )

    // Then
    expect(
      await screen.findByText(/no meals available at this moment./i)
    ).toBeInTheDocument()
    // The first heading is the one we are interested in, the next one is a info that there are no foods available
    expect(screen.getAllByRole(/heading/i)[0]).toHaveTextContent(
      'Available meals (0)'
    )
  })

  test('Should display error when failed to retrieve foods data', async () => {
    // Given
    server.use(
      rest.get(`${firebaseConfig.databaseURL}/foods.json`, (_, res, ctx) => {
        return res(ctx.status(400))
      })
    )

    customRender(
      <SnackbarProvider maxSnack={3}>
        <Foods />
      </SnackbarProvider>
    )

    // Then
    expect(
      await screen.findByText(/Failed to fetch the data. Try again later./i)
    ).toBeInTheDocument()
    expect(screen.getByRole(/heading/i)).toHaveTextContent(
      'Available meals (0)'
    )
  })
})
