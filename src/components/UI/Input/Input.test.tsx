import { render } from '@testing-library/react'
import Input from './Input'

test('<Input /> should render correctly with props', () => {
  // Given
  const onChangeHandler = jest.fn()

  render(
    <Input
      id="testId"
      type="text"
      value="Test value"
      label="Input label"
      onChange={onChangeHandler}
    />
  )
})
