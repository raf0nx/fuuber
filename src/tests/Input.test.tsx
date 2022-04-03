import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../components/UI/Input'

describe('<Input />', () => {
	test('should propagate on change event', () => {
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
		expect(screen.getByText('Input label')).toHaveClass('input-label--focus')
	})

	test("should not have 'input-label--focus' class when no value or placeholder is provided", () => {
			// Given
		const onChangeHandler = jest.fn()
	
		render(
			<Input
				id="testId"
				type="text"
				value=""
				label="Input label"
				changeHandler={onChangeHandler}
			/>
		)

		// Then
		expect(screen.getByText('Input label')).not.toHaveClass('input-label--focus')
	})
})
