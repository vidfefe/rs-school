import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchCountries } from '../store/countriesSlice';
import * as Yup from 'yup';
import { convertFileToBase64 } from '../utils/fileUtils';
import { v4 as uuid4 } from 'uuid';
import { addUser } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../utils/validationSchema';
import { FormData } from '../types/formTypes';

const UncontrolledFormPage: FC = () => {
  const { countries } = useSelector((state: RootState) => state.countries);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const file = pictureRef.current?.files?.[0];

    const gender: 'male' | 'female' | 'other' | undefined = maleRef.current
      ?.checked
      ? 'male'
      : femaleRef.current?.checked
        ? 'female'
        : 'other';

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender,
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: file || new File([], ''),
      country: countryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const base64String = file ? await convertFileToBase64(file) : '';

      const newUser = {
        ...formData,
        id: uuid4(),
        picture: base64String,
      };

      dispatch(addUser(newUser));
      navigate('/');
    } catch (validationErrors) {
      const formattedErrors: Record<string, string> = {};
      (validationErrors as Yup.ValidationError).inner.forEach((error) => {
        formattedErrors[error.path || ''] = error.message;
      });
      setErrors(formattedErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const otherRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Uncontrolled Form</h1>
      <form className="max-w-md w-full" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          ref={nameRef}
          type="text"
          placeholder="Name"
          autoComplete="given-name"
        />
        {errors.name && <p>{errors.name}</p>}

        <label htmlFor="age">Age:</label>
        <input
          id="age"
          ref={ageRef}
          type="number"
          placeholder="Age"
          autoComplete="bday-year"
        />
        {errors.age && <p>{errors.age}</p>}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          ref={emailRef}
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        {errors.email && <p>{errors.email}</p>}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          ref={passwordRef}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
        {errors.password && <p>{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <div className="flex gap-4 mt-1">
          <label>Gender:</label>
          <label htmlFor="male" className="flex items-center gap-1">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              ref={maleRef}
            />
            Male
          </label>
          <label htmlFor="female" className="flex  gap-1">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              ref={femaleRef}
            />
            Female
          </label>
          <label htmlFor="other" className="flex  gap-1">
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              ref={otherRef}
              defaultChecked={true}
            />
            Other
          </label>
        </div>
        {errors.gender && <p>{errors.gender}</p>}

        <label htmlFor="country">Country:</label>
        <input
          id="country"
          ref={countryRef}
          list="country-list"
          placeholder="Country"
          autoComplete="country"
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country}</p>}

        <label htmlFor="picture">Upload Picture:</label>
        <input
          id="picture"
          className="file:mr-1 file:p-1 file:rounded-l-sm file:font-bold file:bg-amber-500 hover:file:bg-amber-400 file:transition-all file:cursor-pointer"
          ref={pictureRef}
          type="file"
          accept="image/png, image/jpeg"
        />
        {errors.picture && <p>{errors.picture}</p>}

        <div className="flex items-center gap-2">
          <label htmlFor="acceptTerms">Accept Terms</label>
          <input
            id="acceptTerms"
            ref={acceptTermsRef}
            type="checkbox"
            autoComplete="off"
          />
        </div>
        {errors.acceptTerms && <p>{errors.acceptTerms}</p>}

        <button
          type="submit"
          className="rounded-md mt-1"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledFormPage;
