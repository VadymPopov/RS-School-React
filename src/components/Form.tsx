import { FormEvent } from 'react';
import InputField from './InputField';
import Button from './Button';

export interface FormProps {
  triggerError: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ onSubmit, triggerError }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <InputField label="Search you Star Wars ship: " name="query" />
      <div className="buttons">
        <Button label="Search" type="submit" />
        <Button label="Error" type="button" onClick={triggerError} />
      </div>
    </form>
  );
}
