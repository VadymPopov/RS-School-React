import { useFormContext } from 'react-hook-form';
import { InputFieldProps } from '../types';

export default function InputField({
  label,
  type,
  name,
  error,
  controlled,
  ...props
}: InputFieldProps) {
  const methods = useFormContext();
  const registeredProps = controlled ? methods.register(name) : {};

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...props}
        {...registeredProps}
        className={error && 'error'}
        style={type === 'checkbox' ? { width: '10%' } : { width: '100%' }}
      />
      <p className="error-message">{error}</p>
    </div>
  );
}
