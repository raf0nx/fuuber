import React from 'react'
import classNames from 'classnames'

export interface InputProps {
  id: string
  name: string
  type: string
  label: string
  labelClasses?: string
  required?: boolean
  disabled?: boolean
  hasError?: boolean
  formId?: string
  placeholder?: string
  classes?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type,
      label,
      labelClasses = '',
      required,
      disabled,
      hasError,
      formId,
      placeholder,
      classes = '',
      ...props
    },
    ref
  ) => {
    const inputStyles = classNames(
      'border shadow-sm border-opacity-50 text-sm rounded-lg hover:border-opacity-100 focus:outline-none focus:ring-2 focus:border-opacity-0 block w-full p-2.5 transition duration-200',
      hasError
        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500'
        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500',
      classes,
      { 'cursor-not-allowed opacity-50 hover:border-opacity-50': disabled }
    )

    return (
      <>
        <label
          className={`inline-block mb-2 text-sm font-medium text-gray-900 transition-colors duration-200 ${labelClasses}`}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          id={id}
          form={formId}
          ref={ref}
          name={name}
          type={type}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={inputStyles}
          {...props}
        />
      </>
    )
  }
)
