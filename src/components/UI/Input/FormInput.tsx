import { RegisterOptions, UseFormRegister, Path } from 'react-hook-form'

import Input, { InputProps } from './Input'

type FormInputProps<TFormValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
} & Omit<InputProps, 'name'>

const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <Input name={name} {...props} {...(register && register(name, rules))} />
  )
}

export default FormInput
