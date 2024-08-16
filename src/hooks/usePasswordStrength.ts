import { useState } from 'react';

const usePasswordStrength = () => {
  const [passwordStrength, setPasswordStrength] = useState('');

  const validatePasswordStrength = (password: string) => {
    let strength = '';
    let strengthLevel = 0;

    if (password.length >= 8) strengthLevel++;
    if (/[a-z]/.test(password)) strengthLevel++;
    if (/[A-Z]/.test(password)) strengthLevel++;
    if (/[0-9]/.test(password)) strengthLevel++;
    if (/[\W_]/.test(password)) strengthLevel++;

    switch (strengthLevel) {
      case 5:
        strength = 'Very Strong';
        break;
      case 4:
        strength = 'Strong';
        break;
      case 3:
        strength = 'Medium';
        break;
      case 2:
        strength = 'Weak';
        break;
      default:
        strength = 'Very Weak';
        break;
    }

    setPasswordStrength(strength);
  };

  return {
    passwordStrength,
    validatePasswordStrength,
  };
};

export default usePasswordStrength;
