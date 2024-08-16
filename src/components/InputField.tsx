import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  error: string;
}

export default function InputField({
  label,
  type,
  name,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...props}
        type={type}
        className={error && 'error'}
        style={type === 'checkbox' ? { width: '10%' } : { width: '100%' }}
      />
      <p className="error-message">{error}</p>
    </div>
  );
}
