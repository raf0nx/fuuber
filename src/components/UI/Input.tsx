import { ChangeEvent } from 'react'

import './Input.css'

interface InputProps {
  id: string
  formId?: string
  type: string
  value: string
  label: string
  name?: string
  placeholder?: string
  step?: number
  min?: number
  max?: number
  required?: boolean
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  focusHandler?: () => void
  blurHandler?: () => void
}

const Input: React.FC<InputProps> = ({
  id,
  formId,
  label,
  value,
  type,
  name,
  placeholder,
  step,
  min,
  max,
  required,
  changeHandler,
  focusHandler,
  blurHandler,
}) => {
  return (
    <label className="relative" htmlFor={id}>
      <input
        id={id}
        form={formId}
        type={type}
        value={value}
        className="w-full border-2 border-gray-300 border-opacity-50 px-4 py-2 rounded shadow-sm hover:border-opacity-100 focus:outline-none focus:border-indigo-500 transition duration-200"
        name={name}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        required={required}
        onChange={event => {
          changeHandler(event)
        }}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      <span className="text-gray-700 text-opacity-80 absolute left-0 top-0 mx-3 px-1 transition duration-200 input-text">
        {label}
      </span>
    </label>
  )
}

export default Input
