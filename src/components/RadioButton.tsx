import clsx from 'clsx';
import React, { useEffect } from 'react';

import { useFormData } from '../hooks/useFormData';

interface RadioButtonProps {
  options: { value: string | number; label: string }[];
  fieldKey: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
  labelClassName?: string;
  className?: string;
  textClassName?: string;
  required?: boolean;
}

const RadioButton = ({
  options,
  containerClassName,
  fieldKey,
  labelClassName,
  textClassName,
  onChange,
  className,
  required = false,
}: RadioButtonProps) => {
  const { formData, updateFormData, setInputValidity } = useFormData();

  // Automatically set the first option as default
  useEffect(() => {
    if (!formData[fieldKey] && options.length > 0) {
      const defaultValue = options[0].value.toString();
      updateFormData(fieldKey, defaultValue);
      setInputValidity(fieldKey, true);
    }
  }, [fieldKey, options, formData, updateFormData, setInputValidity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    updateFormData(fieldKey, value);
    setInputValidity(fieldKey, true);

    if (onChange) {
      onChange(e);
    }
  };

  // Defaulting to first option if not set
  const actualSelectedValue = formData[fieldKey] ?? options[0].value.toString();

  return (
    <div className={clsx('flex gap-2', containerClassName)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(
            'flex items-center gap-2 cursor-pointer',
            labelClassName,
          )}
        >
          <input
            type="radio"
            value={option.value}
            name={fieldKey}
            checked={actualSelectedValue === option.value.toString()}
            onChange={handleChange}
            className={clsx(
              'w-4 h-4 appearance-none rounded-full transition-all duration-300 ease-in-out',
              'border-2 border-gray-950',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              {
                'checked:bg-[#000103] checked:border-[#1e2631]': true,
                'focus:ring-[#1e2631]': true,
              },
              className,
            )}
            required={required}
            aria-label={option.label}
          />
          <span className={textClassName}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
