interface InputProps {
  id: string
  formId?: string
  label: string
  value: string
  type: string
  name?: string
  placeholder?: string
  step?: number
  min?: number
  max?: number
  required?: boolean
  classes?: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
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
  classes = '',
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <>
      <label
        className="inline-block mb-2 text-sm font-medium text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        form={formId}
        type={type}
        value={value}
        className={`bg-gray-50 border shadow-sm border-gray-300 border-opacity-50 text-gray-900 text-sm rounded-lg hover:border-opacity-100 focus:outline-none focus:ring-indigo-500 focus:ring-2 block w-full p-2.5 transition duration-200 ${classes}`}
        name={name}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        required={required}
        onChange={event => {
          onChange(event.target.value)
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  )
}

export default Input
