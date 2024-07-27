import { useState, InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputField({ label, ...props }: InputFieldProps) {
  const [value, setValue] = useState(localStorage.getItem('searchQuery') || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input {...props} onChange={handleChange} value={value} />
    </div>
  );
}
