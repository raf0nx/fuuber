import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FoodCardItem } from './FoodCardItem'

import { FOOD_ITEM_MOCK } from 'utils/test-utils/mocked-data'

describe('<FoodCardItem />', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<FoodCardItem item={FOOD_ITEM_MOCK} />)
  })

  test('Should not display Add to Favourite button initally', async () => {
    // Then
    expect(screen.queryByLabelText(/add to favourite/i)).not.toBeInTheDocument()
  })

  test('Should display Add to Favourite button on Food Card Item focus', async () => {
    // When
    await userEvent.tab()

    // Then
    expect(screen.getByLabelText(/add to favourite/i)).toBeInTheDocument()
  })

  test('Should display Add to Favourite button on Food Card Item hover', async () => {
    // When
    await userEvent.hover(screen.getByRole(/article/i))

    // Then
    expect(screen.getByLabelText(/add to favourite/i)).toBeInTheDocument()
  })

  test('Should not display Add to Favourite button when Food Card Item is unhovered', async () => {
    // Given
    const foodCardItem = screen.getByRole(/article/i)

    // When
    await userEvent.hover(foodCardItem)
    await userEvent.unhover(foodCardItem)

    // Then
    expect(screen.queryByLabelText(/add to favourite/i)).not.toBeInTheDocument()
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
})
