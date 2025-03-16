import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchCountries } from '../store/countriesSlice';
import { convertFileToBase64 } from '../utils/fileUtils';
import { v4 as uuid4 } from 'uuid';
import { addUser } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../utils/validationSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormData } from '../types/formTypes';

const ReactHookFormPage: FC = () => {
  const { countries } = useSelector((state: RootState) => state.countries);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue('picture', files[0]);
      trigger('picture');
    } else {
      setValue('picture', new File([], ''));
      trigger('picture');
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const file = data.picture;
      const base64String = await convertFileToBase64(file);

      const newUser = {
        ...data,
        id: uuid4(),
        picture: base64String,
      };

      dispatch(addUser(newUser));
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Controlled Form</h1>
      <form className="max-w-md w-full" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name')} type="text" placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="age">Age:</label>
        <input id="age" {...register('age')} type="number" placeholder="Age" />
        {errors.age && <p>{errors.age.message}</p>}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <div className="flex gap-4 mt-1">
          <label>Gender:</label>
          <label htmlFor="male" className="flex items-center gap-1">
            <input
              type="radio"
              id="male"
              value="male"
              {...register('gender')}
            />
            Male
          </label>
          <label htmlFor="female" className="flex  gap-1">
            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender')}
            />
            Female
          </label>
          <label htmlFor="other" className="flex  gap-1">
            <input
              type="radio"
              id="other"
              value="other"
              {...register('gender')}
            />
            Other
          </label>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}

        <label htmlFor="country">Country:</label>
        <input
          id="country"
          {...register('country')}
          list="country-list"
          placeholder="Country"
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country.message}</p>}

        <label htmlFor="picture">Upload Picture:</label>
        <input
          id="picture"
          className="file:mr-1 file:p-1 file:rounded-l-sm file:font-bold file:bg-amber-500 hover:file:bg-amber-400 file:transition-all file:cursor-pointer"
          onChange={handleFileChange}
          type="file"
          accept="image/png, image/jpeg"
        />
        {errors.picture && <p>{errors.picture.message}</p>}

        <div className="flex items-center gap-2">
          <label htmlFor="acceptTerms">Accept Terms</label>
          <input
            id="acceptTerms"
            {...register('acceptTerms')}
            type="checkbox"
          />
        </div>
        {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}

        <button
          type="submit"
          className="rounded-md mt-1"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactHookFormPage;
