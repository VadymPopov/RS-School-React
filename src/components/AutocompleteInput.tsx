import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  list: string;
  error: string;
  options: string[];
}

export default function AutocompleteInput({
  label,
  type,
  name,
  list,
  error,
  options,
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        list={list}
        id={name}
        {...props}
        type={type}
        placeholder="Type to search..."
        className={error && 'error'}
      />
      <p className="error-message">{error}</p>
      <datalist id={list}>
        {options.map((option) => {
          return <option key={option} value={option} />;
        })}
      </datalist>
    </div>
  );
}
