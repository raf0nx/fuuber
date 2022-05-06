import { ErrorMessage } from '@hookform/error-message'
import {
  RegisterOptions,
  UseFormRegister,
  Path,
  DeepMap,
  FieldError,
  get,
} from 'react-hook-form'

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
      <Input name={name} {...props} {...(register && register(name, rules))} />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <p className="mt-2 text-xs text-red-600">{message}</p>
        )}
      />
    </div>
  )
}

export default FormInput
