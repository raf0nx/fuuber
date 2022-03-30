import { render, screen } from '@testing-library/react'

import Card from '../components/UI/Card'

test('Card component renders successfully with its props and children', () => {
  // Given
  const actionBtn = <button>Click me!</button>

  render(
    <Card title="Card Title" subtitle="Card subtitle" actions={actionBtn}>
      <p>Some dummy content</p>
    </Card>
  )

  const cardTitle = screen.getByText(/card title/i)
  const cardSubtitle = screen.getByText(/card subtitle/i)
  const childrenContent = screen.getByText(/some dummy content/i)
  const actions = screen.getByText(/click me!/i)

  // Then
  expect(cardTitle).toBeInTheDocument()
  expect(cardSubtitle).toBeInTheDocument()
  expect(childrenContent).toBeInTheDocument()
  expect(actions).toBeInTheDocument()
})
