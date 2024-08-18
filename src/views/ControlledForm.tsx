import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../schemas/formValidationSchema';
import InputField from '../components/InputField';
import SelectField from '../components/Select';
import AutocompleteInput from '../components/AutocompleteInput';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import usePasswordStrength from '../hooks/usePasswordStrength';
import { useEffect } from 'react';
import { addFormData } from '../redux/formsSlice';
import { getBase64 } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { FormValues, FormType } from '../types';

export default function ControlledForm() {
  const { strengthColor, passwordStrength, validatePasswordStrength } =
    usePasswordStrength();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (formValues: FormValues) => {
    try {
      const file = (formValues.picture as FileList)[0];
      const base64 = await getBase64(file);

      dispatch(
        addFormData({
          form: { ...formValues, picture: base64, id: uuidv4(), isNew: true },
          formType: FormType.Controlled,
        })
      );

      navigate('/');
    } catch (error) {
      console.error('Oops, we have an error', error);
    }
  };

  const password = watch('password');

  useEffect(() => {
    validatePasswordStrength(password);
  }, [password, validatePasswordStrength]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <InputField
          label="Name"
          name="name"
          type="text"
          controlled={true}
          error={errors.name?.message || ''}
        />
        <InputField
          label="Age"
          name="age"
          type="number"
          defaultValue={0}
          min={0}
          controlled={true}
          error={errors.age?.message || ''}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          controlled={true}
          error={errors.email?.message || ''}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          controlled={true}
          error={errors.password?.message || ''}
        />
        <div>
          <p style={{ color: strengthColor }}>{passwordStrength}</p>
        </div>
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          controlled={true}
          error={errors.confirmPassword?.message || ''}
        />
        <SelectField
          label="Gender"
          name="gender"
          values={['male', 'female', 'other', 'prefer not to answer']}
          controlled={true}
          error={errors.gender?.message || ''}
        />
        <InputField
          label="Accept terms and conditions"
          name="terms"
          type="checkbox"
          controlled={true}
          error={errors.terms?.message || ''}
        />
        <InputField
          label="Upload picture"
          name="picture"
          type="file"
          accept="image/png, image/jpeg"
          controlled={true}
          error={errors.picture?.message || ''}
        />
        <AutocompleteInput
          label="Select a country"
          type="text"
          name="country"
          list="countries"
          options={countries}
          controlled={true}
          error={errors.country?.message || ''}
        />
        <Button
          disabled={Object.keys(errors).length > 0}
          label="Create"
          type="submit"
        />
      </form>
    </FormProvider>
  );
}
