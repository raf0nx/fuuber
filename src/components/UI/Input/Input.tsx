import React from 'react'

export interface InputProps {
  id: string
  name: string
  type: string
  label: string
  labelClasses?: string
  required?: boolean
  disabled?: boolean
  formId?: string
  placeholder?: string
  classes?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type,
      label,
      labelClasses = '',
      required,
      disabled,
      formId,
      placeholder,
      classes = '',
      ...props
    },
    ref
  ) => {
    let styles =
      'bg-gray-50 border shadow-sm border-gray-300 border-opacity-50 text-gray-900 text-sm rounded-lg hover:border-opacity-100 focus:outline-none focus:ring-indigo-500 focus:ring-2 focus:border-opacity-0 block w-full p-2.5 transition duration-200'

    if (disabled) {
      styles = styles.concat(
        ' cursor-not-allowed opacity-50 hover:border-opacity-50'
      )
    }

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
          className={`${styles} ${classes}`}
          {...props}
        />
      </>
    )
  }
)
export default Input
