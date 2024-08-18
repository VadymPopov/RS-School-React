import * as yup from 'yup';
import { countries } from '../redux/countriesSlice';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .email('Invalid email format')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup
    .string()
    .oneOf(
      ['male', 'female', 'other', 'prefer not to answer'],
      'Invalid gender selection'
    )
    .required('Gender is required'),

  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  picture: yup
    .mixed<File>()
    .required('Please select a picture')
    .test('is-valid-type', 'Not a valid image type', (value) => {
      let file;
      if (value instanceof FileList && value.length > 0) {
        file = value[0];
        return file.type === 'image/jpeg' || file.type === 'image/png';
      } else {
        file = value;
        return file.type === 'image/jpeg' || file.type === 'image/png';
      }
    })
    .test('is-valid-size', 'Not a valid image size', (value) => {
      let file;
      if (value instanceof FileList && value.length > 0) {
        file = value[0];
        return file.size <= 2048000;
      } else {
        file = value;
        return file.size <= 2048000;
      }
    }),
  country: yup
    .string()
    .oneOf(countries, 'Please select a country from the list')
    .required('Please select a country'),
});
