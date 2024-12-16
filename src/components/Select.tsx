import clsx from 'clsx';
import React, { useState } from 'react';

import { FormProvider } from '../context/FormContext';
import { useFormData } from '../hooks/useFormData';

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  fieldKey: string;
  required?: boolean;
  label?: string;
  className?: string;
  styleVariant?: 'default' | 'outline';
  onChange?: (value: string | number) => void;
  onValidityChange?: (isValid: boolean) => void;
};

const Select = ({
  options,
  placeholder = 'Select an option',
  required = false,
  label,
  className,
  fieldKey,
  styleVariant = 'default',
  onChange,
  onValidityChange,
}: SelectProps) => {
  const { updateFormData, setInputValidity } = useFormData();
  const [selectedValue, setSelectedValue] = useState<string | number>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [shake, setShake] = useState<boolean>(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);

    let valid = true;
    let errorMessage = '';

    if (required && value === '') {
      errorMessage = 'This field cannot be empty.';
      valid = false;
    }

    setIsValid(valid);
    setError(errorMessage);

    updateFormData(fieldKey, value);
    setInputValidity(fieldKey, valid);

    if (onValidityChange) {
      onValidityChange(valid);
    }

    if (onChange) {
      onChange(value);
    }

    if (!valid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const selectClass = clsx(
    'inline-flex h-12 font-semibold animate-shimmer items-center justify-between rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
    {
      'border-transparent hover:px-3 focus:px-3': true,

      'focus:ring-[#000103]': true,
      'border-gray-500 border-2': styleVariant === 'outline' && isValid,
      'border-red-500 border-2': !isValid,
      'animate-shake': shake,
    },
    className,
  );

  return (
    <FormProvider>
      {label && (
        <label
          className="text-sm font-semibold text-slate-300"
          htmlFor={label.toLowerCase()}
        >
          {label}
        </label>
      )}
      <select
        id={label?.toLowerCase()}
        className={selectClass}
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span
          className={clsx('text-red-500 text-sm font-semibold', {
            'animate-shake': shake,
          })}
        >
          {error}
        </span>
      )}
    </FormProvider>
  );
};

export default Select;
