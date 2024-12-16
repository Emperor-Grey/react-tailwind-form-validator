import { useContext } from 'react';

import { FormContext } from '../context/FormContext';

export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error('useInputData must be used within an InputProvider');

  return context;
};
