import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .transform((value) => (value === '' ? NaN : value))
    .positive('Age must be positive')
    .required('Age is required')
    .typeError('Age must be a number'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .matches(/[A-Z]/, 'Must have at least one uppercase letter')
    .matches(/[a-z]/, 'Must have at least one lowercase letter')
    .matches(/\d/, 'Must have at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Must have at least one special character'
    )
    .required('Password is requored'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must match')
    .required('Confirm password is required'),
  gender: Yup.mixed<'male' | 'female' | 'other'>()
    .oneOf(['male', 'female', 'other'], 'Gender is required')
    .required('Gender is required'),
  country: Yup.string().required('Country is required'),
  acceptTerms: Yup.bool()
    .oneOf([true], 'Must accept terms')
    .required('Must accept terms'),
  picture: Yup.mixed<File>()
    .required('Picture is required')
    .test(
      'fileFormat',
      'Unsupported file format (only PNG, JPEG allowed)',
      (value) => {
        console.log('File value in fileFormat test:', value); // Выводим то, что приходит в валидацию
        if (value instanceof File) {
          console.log(value.type);
          return ['image/png', 'image/jpeg'].includes(value.type);
        }
        return false;
      }
    )
    .test('fileSize', 'File is too large (max 5MB)', (value) => {
      console.log('File value in fileSize test:', value);
      if (value instanceof File) {
        console.log(value.size);
        return value.size <= 5 * 1024 * 1024;
      }
      return false;
    }),
});
