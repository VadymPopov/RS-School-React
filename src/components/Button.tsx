import { ButtonHTMLAttributes } from 'react';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...props }: BtnProps) {
  return <button {...props}>{label}</button>;
}
