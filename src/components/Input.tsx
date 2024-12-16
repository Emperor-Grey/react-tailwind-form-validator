import clsx from 'clsx';
import React, { ComponentProps, useState } from 'react';

import { FormProvider } from '../context/FormContext';
import { useFormData } from '../hooks/useFormData';
import {
  capitalizeFirstLetter,
  debounce,
  validateDate,
  validateEmail,
  validateNumber,
  validatePassword,
} from '../utils/index';

type BaseValidationFunction = (value: string) => string;
type CustomValidationFunction = (value: string) => string | null;

type InputTypes = 'email' | 'password' | 'number' | 'date' | 'text';

type InputProps = ComponentProps<'input'> & {
  fieldKey: string;
  type: InputTypes;
  placeholder?: string;
  required?: boolean;
  className?: string;
  security?: 'max' | 'low';
  styleVariant?: 'default' | 'outline';
  customValidation?: CustomValidationFunction;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onValidityChange?: (isValid: boolean) => void;
};

const DEFAULT_VALIDATIONS: Record<InputTypes, BaseValidationFunction | null> = {
  email: validateEmail,
  password: (value: string) => validatePassword(value, 'max'),
  number: validateNumber,
  date: validateDate,
  text: () => '',
};

const Input = ({
  type,
  className,
  placeholder,
  onValidityChange,
  onChange,
  security = 'low',
  fieldKey,
  required = true,
  styleVariant = 'default',
  customValidation,
  ...props
}: InputProps) => {
  const { updateFormData, setInputValidity, areInputsValid } = useFormData();
  const [error, setError] = useState<string>('');
  const [shake, setShake] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let errorMessage = '';
    let valid = true;

    if (required && !value) {
      errorMessage = `${capitalizeFirstLetter(type)} is required`;
      valid = false;
      setIsEmpty(true);
    } else {
      setIsEmpty(false);

      const defaultValidation = DEFAULT_VALIDATIONS[type];
      if (defaultValidation && type !== 'text') {
        errorMessage = defaultValidation(value);
      }

      if (customValidation) {
        const customError = customValidation(value);
        if (customError) {
          errorMessage = customError;
        }
      }

      valid = !errorMessage;
    }

    setError(errorMessage);
    setShake(!valid);
    updateFormData(fieldKey, value);
    setInputValidity(fieldKey, valid);

    if (onChange) {
      onChange(e);
    }

    if (!valid) {
      setTimeout(() => setShake(false), 500);
    }

    if (onValidityChange) {
      onValidityChange(valid);
    }
  };

  const inputClass = clsx(
    'rounded-md px-4 py-2 font-semibold text-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-50 focus:px-2 border-2 border-gray-400',
    'bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] animate-shimmer',
    {
      'text-white border-transparent focus:px-2': true,
      'focus:ring-[#000103]': type === 'email' || type === 'password',
      'focus:ring-[#1e2631]': type === 'number' || type === 'date',
      'hover:px-2 focus:px-2': true,
      'border-2 border-red-500': !areInputsValid || isEmpty,
      'animate-shake': shake,
    },
    className,
  );

  const displayPlaceholder = placeholder || capitalizeFirstLetter(type);

  return (
    <FormProvider>
      <input
        type={type}
        {...props}
        className={inputClass}
        placeholder={displayPlaceholder}
        onChange={debounce(validateInput, 800)}
        required={required}
      />
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

export default Input;
