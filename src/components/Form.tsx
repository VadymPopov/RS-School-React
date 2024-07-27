import { FormEvent } from 'react';
import InputField from './InputField';
import Button from './Button';

export interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit} data-testid="form">
      <InputField label="Search you Star Wars ship: " name="query" />
      <div className="buttons">
        <Button label="Search" type="submit" />
      </div>
    </form>
  );
}
