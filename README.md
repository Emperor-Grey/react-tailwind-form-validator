# React Tailwind Form Validator

A lightweight, flexible, and customizable form validation library built with React and styled using Tailwind CSS. It streamlines the process of creating forms with validation, offering reusable components and simple validation rules for easy integration into your React projects.

## Installation

To install the library, run the following command:

```bash
npm install react-tailwind-form-validator  or # yarn add react-tailwind-form-validator
```

## Live Demo

Check out the live working demo at: [React Tailwind Form Validator Demo](https://react-tailwind-form-validator-demo.vercel.app/)

## Getting Started

Follow these steps to begin using the form validation components in your React application.

### 1. Wrapping Your Application with `FormProvider`

First, you need to wrap your application with the `FormProvider` to manage form state and validation across all form elements.

```typescript
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
  </StrictMode>
);
```

### 2. Using Form Components

The library provides several customizable components for building your form. Here are the available components:

- **Input**: A text input field with validation support.
- **RadioButton**: A group of radio buttons with validation.
- **Select**: A dropdown select element with validation.
- **Button**: A submission button for the form that triggers validation.

Each component can be styled using Tailwind CSS classes.

#### Example: Basic Form Usage

```typescript
import { useState } from 'react';
import { FormContent } from './Form/FormContent';
import { SubmittedData } from './types';

function App() {
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gradient-to-r from-slate-300 to-gray-400">
      <div className="w-fit p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to the React Tailwind Form Validator Demo
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          This demo showcases form validation with React and Tailwind CSS. Check the source code on{' '}
          <a
            href="https://github.com/"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            GitHub.
          </a>
        </p>
      </div>

      <div className="flex justify-center items-start gap-8 mt-8">
        <div className="flex flex-col items-center p-6 bg-neutral-500/40 backdrop-blur-lg rounded-lg shadow-xl hover:px-5 transition-all duration-300 ease-linear w-1/2">
          <FormContent setSubmittedData={setSubmittedData} />
        </div>

        <div className="p-6 border rounded-lg shadow-lg bg-gray-100 w-1/2">
          <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
          {submittedData ? (
            <div>
              <pre className="bg-white p-4 border rounded shadow whitespace-pre-wrap break-words">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
              <button
                onClick={() => setSubmittedData(null)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Clear Now
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Submit the form to see the data here.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```

### 3. Customizing Form Components

You can easily customize the appearance and behavior of each component using Tailwind CSS. Below are examples of how to customize the `Input` and `RadioButton` components:

#### Example: Custom `Input` Component

```typescript
<Input
  fieldKey="email"
  styleVariant="outline"
  type="email"
  className="text-lg"
  required
/>
```

#### Example: Custom `RadioButton` Component

```typescript
<RadioButton
  fieldKey="gender"
  containerClassName="flex justify-center items-center gap-4"
  labelClassName="space-x-2"
  options={[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: "Don't Blame me for not including the rest...😉", label: 'Others' },
  ]}
  required
/>
```

### 4. Validation Rules

Each form component supports several built-in validation rules, such as `required` and `customValidation`, that can be applied to the form fields. You can also define custom validation logic (e.g., regex or length checks).

#### Example: Custom Validation for `Input` Component

```typescript
<Input
  type="text"
  fieldKey="username"
  placeholder="Username"
  customValidation={(value) => {
    const regex = /^[a-zA-Z0-9_]+$/; // Only allows letters, numbers, and underscores
    if (!regex.test(value)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    if (value.length < 4) {
      return 'Username must be at least 4 characters';
    }
    return null; // Validation passed
  }}
/>
```

### 5. Handling Form Submission

Use the `useFormData` hook to access form data, validate the fields, and handle the form submission.

#### Example: Handling Form Submission

```typescript
import { useFormData } from 'react-tailwind-form-validator';

const handleFormSubmit = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => {
  e.preventDefault();
  revalidate();

  if (!areInputsValid()) {
    alert('Please fill in at least one required field correctly...');
    return;
  }

  const submittedData: SubmittedData = {
    email: formData.email,
    password: formData.password,
    username: formData.username,
    gender: formData.gender,
    security: formData.security,
  };

  setSubmittedData(submittedData);
  console.log('Form submitted successfully:', submittedData);
};
```

### 6. Full Form Example

Here’s an example of a full form that includes multiple components with validation:

```typescript
<form className="space-y-3 w-full flex flex-col items-center">
  <Input
    fieldKey="email"
    styleVariant="outline"
    type="email"
    className="text-lg"
    required
  />

  <Input
    fieldKey="password"
    type="password"
    styleVariant="outline"
    className="text-lg"
    required
  />

  <Input
    type="text"
    fieldKey="username"
    placeholder="Username"
    customValidation={(value) =>
      value.length < 4 ? 'Username must be at least 4 characters' : null
    }
  />

  <RadioButton
    fieldKey="gender"
    containerClassName="flex justify-center items-center gap-4"
    options={[
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ]}
    required
  />

  <Select
    fieldKey="security"
    options={[
      { value: 'max', label: 'Maximum Security' },
      { value: 'low', label: 'Low Security' },
    ]}
    placeholder="Select Security Level"
    required
    styleVariant="outline"
  />

  <Button
    variant="outline"
    onClick={handleFormSubmit}
    className="text-lg py-3 px-6 font-semibold"
  >
    Submit
  </Button>
</form>
```

## Features

- **Easy Integration**: Minimal setup for integrating form validation into your React application.
- **Tailwind CSS Integration**: Fully styled with Tailwind CSS for flexible and responsive design.
- **Customizable Components**: Modify the appearance and behavior of each form component.
- **Built-in Validation**: Includes common validation rules like `required` and custom validation functions (e.g., regex, length checks).
- **Responsive**: Mobile-first and responsive design using Tailwind CSS.

## Conclusion

React Tailwind Form Validator is designed to make form creation and validation simple and customizable. It integrates seamlessly with Tailwind CSS for flexible styling, supports built-in and custom validation rules, and is easy to use in any React project.
