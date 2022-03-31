import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import App from '../App'

test('<App /> should render successfully', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
})
