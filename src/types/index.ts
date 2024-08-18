import { InputHTMLAttributes } from 'react';

export interface SelectFieldProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  values: string[];
  label: string;
  name: string;
  error: string;
  controlled?: boolean;
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  list: string;
  error: string;
  options: string[];
  controlled?: boolean;
}

export interface IFormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
  id: string;
  isNew: boolean;
}

export interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  gender: HTMLSelectElement;
  terms: HTMLInputElement;
  picture: HTMLInputElement;
  country: HTMLSelectElement;
}

export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other' | 'prefer not to answer';
  terms: boolean;
  picture: File | FileList;
  country: string;
}

export interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  terms?: string;
  picture?: string;
  country?: string;
}

export enum FormType {
  Controlled = 'controlled',
  Uncontrolled = 'uncontrolled',
}

export interface IPayloadAddForm {
  form: IFormValues;
  formType: FormType;
}

export interface FormState {
  controlledForms: Array<IFormValues>;
  uncontrolledForms: Array<IFormValues>;
}

export interface PayloadResetIsNew {
  id: string;
  formType: FormType;
}
