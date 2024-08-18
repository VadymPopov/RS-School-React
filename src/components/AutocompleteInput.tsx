import { useFormContext } from 'react-hook-form';
import { InputFieldProps } from '../types';

export default function AutocompleteInput({
  label,
  type,
  name,
  list,
  error,
  options,
  controlled,
  ...props
}: InputFieldProps) {
  const methods = useFormContext();
  const registeredProps = controlled ? methods.register(name) : {};
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        list={list}
        id={name}
        {...registeredProps}
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
