import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('This is a required field')
    .email('This should be a valid email '),
  password: Yup.string()
    .required('A password is required')
    .min(8, 'Password should have at least 8 characters')
})

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('This is a required field')
    .min(8, 'Password should have at least 8 characters'),
  confirmPassword: Yup.string()
    .required('You need to confirm your password')
    .oneOf([Yup.ref('password'), null], 'Both passwords must match')
})