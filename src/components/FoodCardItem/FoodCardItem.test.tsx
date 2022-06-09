import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FoodCardItem } from './FoodCardItem'

import { FOOD_ITEM_MOCK } from 'utils/test-utils/mocked-data'

describe('<FoodCardItem />', () => {
  beforeEach(() => {
    render(<FoodCardItem item={FOOD_ITEM_MOCK} />)
  })

  test('Should display Food Card focused on Add To Cart button focus', async () => {
    // When
    // Tab 2 times to focus button inside the Food Card
    await userEvent.tab()
    await userEvent.tab()

    // Then
    expect(screen.getByLabelText(/open modal with meal details/i)).toHaveFocus()
    expect(screen.getByTestId(/cardArticle/i)).toHaveClass('scale-105')
  })

  test('Should dismiss Food Card focused display on Add To Cart button blur', async () => {
    // When
    // Tab 3 times to remove focus from Food Card completely
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()

    // Then
    expect(
      screen.getByLabelText('Open modal with meal details')
    ).not.toHaveFocus()
    expect(screen.getByTestId(/cardArticle/i)).not.toHaveClass('scale-105')
  })
})
