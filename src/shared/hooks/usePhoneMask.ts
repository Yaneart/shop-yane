import { useState, type ChangeEvent } from 'react';

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10);

  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function usePhoneMask(initial = '') {
  const [value, setValue] = useState(initial);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(formatPhone(e.target.value));
  };

  const raw = value.replace(/\D/g, '');
  const isComplete = raw.length === 10;

  return { value, onChange, isComplete };
}
