import { useFormContext } from 'react-hook-form';
import { SelectFieldProps } from '../types';

export default function SelectField({
  label,
  values,
  name,
  error,
  controlled,
  ...props
}: SelectFieldProps) {
  const methods = useFormContext();
  const registeredProps = controlled ? methods.register(name) : {};

  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor={name} style={{ marginRight: '1rem' }}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={''}
        {...registeredProps}
        {...props}
        className={error && 'error'}
      >
        <option value="" disabled>
          Select your gender
        </option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <p className="error-message">{error}</p>
    </div>
  );
}
