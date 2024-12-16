declare module 'react-tailwind-form-validator' {
  import { ComponentProps, ReactNode } from 'react';

  export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: 'default' | 'outline';
    disabled?: boolean;
    className?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
  };

  export type BaseValidationFunction = (value: string) => string;
  export type CustomValidationFunction = (value: string) => string | null;

  export type InputTypes = 'email' | 'password' | 'number' | 'date' | 'text';

  export type InputProps = ComponentProps<'input'> & {
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

  export interface RadioButtonProps {
    options: { value: string | number; label: string }[];
    fieldKey: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerClassName?: string;
    labelClassName?: string;
    className?: string;
    textClassName?: string;
    required?: boolean;
  }

  export type SelectOption = {
    value: string | number;
    label: string;
  };

  export type SelectProps = {
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

  export type FormData = {
    [key: string]: string;
  };

  export type FormValidity = {
    [key: string]: boolean;
  };

  export type FormContextProps = {
    formData: FormData;
    inputValidity: FormValidity;
    updateFormData: (fieldKey: string, value: string) => void;
    setInputValidity: (fieldKey: string, isValid: boolean) => void;
    areInputsValid: () => boolean;
    revalidate: () => void;
  };

  export type FormContextType = {
    formData: FormData;
    inputValidity: FormValidity;
    updateFormData: (fieldKey: string, value: string) => void;
    setInputValidity: (fieldKey: string, isValid: boolean) => void;
    areInputsValid: () => boolean;
    revalidate: () => void;
  };

  export const FormProvider: React.FC<{ children: React.ReactNode }>;
  export const Button: React.FC<ButtonProps>;
  export const Input: React.FC<InputProps>;
  export const RadioButton: React.FC<RadioButtonProps>;
  export const Select: React.FC<SelectProps>;

  export const useFormData: () => FormContextType;
}
