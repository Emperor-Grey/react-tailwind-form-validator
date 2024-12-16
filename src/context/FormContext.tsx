import React, { createContext, useState } from 'react';

type FormData = {
  [key: string]: string;
};

type FormValidity = {
  [key: string]: boolean;
};

export const FormContext = createContext<{
  formData: FormData;
  inputValidity: FormValidity;
  updateFormData: (fieldKey: string, value: string) => void;
  setInputValidity: (fieldKey: string, isValid: boolean) => void;
  areInputsValid: () => boolean;
  revalidate: () => void;
} | null>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [inputValidityState, setInputValidityState] = useState<FormValidity>(
    {},
  );

  const updateFormData = (fieldKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const setInputValidity = (fieldKey: string, isValid: boolean) => {
    setInputValidityState((prev) => ({
      ...prev,
      [fieldKey]: isValid,
    }));
  };

  const areInputsValid = (): boolean => {
    // console.log('inputValidityState : ', inputValidityState);
    if (Object.keys(inputValidityState).length === 0) {
      return false;
    }

    // Check if ALL registered fields are valid
    return Object.keys(inputValidityState).every((key) => {
      const fieldValid = inputValidityState[key];
      const fieldValue = formData[key];

      return (
        fieldValid &&
        fieldValue !== undefined &&
        fieldValue !== null &&
        fieldValue.trim() !== ''
      );
    });
  };

  const revalidate = (): void => {
    // Ultra pro max checks for safety
    Object.keys(formData).forEach((key) => {
      const fieldValue = formData[key];
      const isValid =
        fieldValue !== undefined &&
        fieldValue !== null &&
        fieldValue.trim() !== '';
      setInputValidity(key, isValid);
    });
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        inputValidity: inputValidityState,
        updateFormData,
        setInputValidity,
        areInputsValid,
        revalidate,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
