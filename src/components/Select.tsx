import { InputHTMLAttributes } from 'react';

interface SelectFieldProps extends InputHTMLAttributes<HTMLSelectElement> {
  values: string[];
  label: string;
  name: string;
}

export default function SelectField({
  label,
  values,
  name,
  ...props
}: SelectFieldProps) {
  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor={name} style={{ marginRight: '1rem' }}>
        {label}
      </label>
      <select id={name} name={name} {...props}>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
