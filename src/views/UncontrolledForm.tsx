import * as Yup from 'yup';
import { FormEvent, useState } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/Select';
import Button from '../components/Button';
import AutocompleteInput from '../components/AutocompleteInput';
import { validationSchema } from '../schemas/formValidationSchema';
import { useAppDispatch } from '../redux/hooks';
import { addUncontrolledFormData } from '../redux/uncontrolledSlice';
import { useAppSelector } from '../redux/hooks';
import { getBase64 } from '../utils';
import usePasswordStrength from '../hooks/usePasswordStrength';
import { useNavigate } from 'react-router-dom';
import { FormElements, FormErrors, FormValues } from '../types';

export default function UncontrolledForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const { passwordStrength, validatePasswordStrength } = usePasswordStrength();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formElements = form.elements as FormElements;

    const formValues: FormValues = {
      name: formElements.name.value,
      age: formElements.age.value,
      email: formElements.email.value,
      password: formElements.password.value,
      confirmPassword: formElements.confirmPassword.value,
      gender: formElements.gender.value,
      terms: formElements.terms.checked,
      picture: formElements.picture.files?.[0],
      country: formElements.country.value,
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      const base64 = await getBase64(formValues.picture as File);
      validatePasswordStrength(formValues.password);
      dispatch(addUncontrolledFormData({ ...formValues, picture: base64 }));
      setErrors({});
      navigate('/');
    } catch (errors) {
      if (errors instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        errors.inner.forEach((err) => {
          if (err.path) {
            formErrors[err.path] = err.message;
          }
        });
        setErrors(formErrors);
        validatePasswordStrength(formValues.password);
      } else {
        console.error('An unexpected error occurred:', errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Name"
        name="name"
        type="text"
        error={errors.name || ''}
      />
      <InputField
        label="Age"
        name="age"
        type="number"
        min={0}
        error={errors.age || ''}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        error={errors.email || ''}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        error={errors.password || ''}
      />
      <div>
        <p>Password Strength: {passwordStrength}</p>
      </div>
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        error={errors.confirmPassword || ''}
      />
      <SelectField
        label="Gender"
        name="gender"
        values={['male', 'female', 'other', 'prefer not to answer']}
      />
      <InputField
        label="Accept terms and conditions"
        name="terms"
        type="checkbox"
        error={errors.terms || ''}
      />
      <InputField
        label="Upload picture"
        name="picture"
        type="file"
        accept="image/png, image/jpeg"
        error={errors.picture || ''}
      />
      <AutocompleteInput
        label="Select a country"
        type="text"
        name="country"
        list="countries"
        options={countries}
        error={errors.country || ''}
      />

      <Button label="Create" type="submit" />
    </form>
  );
}
