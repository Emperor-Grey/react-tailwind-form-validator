import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FormProvider } from 'react-tailwind-form-validator';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </StrictMode>,
);
