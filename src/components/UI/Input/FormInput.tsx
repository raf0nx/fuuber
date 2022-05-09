import { ErrorMessage } from '@hookform/error-message'
import {
  RegisterOptions,
  UseFormRegister,
  Path,
  DeepMap,
  FieldError,
  get,
} from 'react-hook-form'
import classNames from 'classnames'

import Input, { InputProps } from './Input'

type FormInputProps<TFormValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  classes?: string
} & Omit<InputProps, 'name'>

const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  classes = '',
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div className={classes}>
      <Input
        name={name}
        classes={classNames({
          'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500':
            hasError,
        })}
        labelClasses={classNames({ 'text-red-700': hasError })}
        {...props}
        {...(register && register(name, rules))}
      />
      <p className="my-1 text-xs text-red-600 min-h-4">
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => <span>{message}</span>}
        />
      </p>
    </div>
  )
}

export default FormInput
