import * as yup from 'yup'

export const authFormValidationSchema = (isLogin: boolean) =>
  yup
    .object({
      email: yup
        .string()
        .required('Email is required.')
        .email('Email must be a valid email address.'),
      displayName: isLogin
        ? yup.string()
        : yup.string().required('Name is required.').trim(),
      password: isLogin
        ? yup.string().required('Password is required.')
        : yup
            .string()
            .required('Password is required.')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              'Password needs to have at least 8 characters, one uppercase and lowercase letter and one number.'
            ),
    })
    .required()
