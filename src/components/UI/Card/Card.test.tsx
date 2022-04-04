import { render } from '@testing-library/react'

import Card from './Card'

test('<Card /> should render successfully with its props and children', () => {
  render(
    <Card
      title="Card Title"
      subtitle="Card subtitle"
      actions={<button>Click me!</button>}
    >
      <p>Some dummy content</p>
    </Card>
  )
})
