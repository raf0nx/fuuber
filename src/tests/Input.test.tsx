import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../components/UI/Input'

test('<Input /> should propagate on change event', () => {
  // Given
  const onChangeHandler = jest.fn()

  render(
    <Input
      id="testId"
      type="text"
      value="Test value"
      label="Input label"
      changeHandler={onChangeHandler}
    />
  )

  const input = screen.getByDisplayValue(/test value/i)

  // When
  input.focus()
  userEvent.type(input, 'Something new')

  // Then
  expect(onChangeHandler).toBeCalled()
})
