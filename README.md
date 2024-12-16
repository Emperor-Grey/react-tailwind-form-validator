# React Tailwind Form Validator

A lightweight, flexible, and customizable form validation library built with React and styled using Tailwind CSS. It streamlines the process of creating forms with validation, offering reusable components and simple validation rules for easy integration into your React projects.

## Installation

To install the library, run the following command:

```bash
npm install react-tailwind-form-validator
# or
yarn add react-tailwind-form-validator
```

### Prerequisite

**Tailwind CSS** must be installed in your project before using this library. If you haven't installed Tailwind CSS yet, follow the [installation guide](https://tailwindcss.com/docs/installation) to set it up.

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

Create a new file `src/components/MyForm.tsx`:

```typescript
import React from 'react';
import {
  Button,
  Input,
  RadioButton,
  Select,
  useFormData,
} from 'react-tailwind-form-validator';

interface SubmittedData {
  email: string;
  password: string;
  username: string;
  gender: string;
  securityLevel: string;
}

export const MyForm: React.FC = () => {
  const { formData, revalidate, areInputsValid } = useFormData();

  const data: SubmittedData = {
    email: formData.email,
    password: formData.password,
    username: formData.username,
    gender: formData.gender,
    securityLevel: formData.securityLevel,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    revalidate();

    if (areInputsValid()) {
      console.log('Form submitted:', data);
      alert(`Form submitted successfully!, Data is \n${JSON.stringify(data)}`);
    } else {
      alert('Please fill at least one field.');
    }
  };

  return (
    <form className="space-y-3 w-full flex flex-col items-center">
      <Input
        fieldKey="email"
        styleVariant="outline"
        type="email"
        className="text-lg"
      />

      <Input
        fieldKey="password"
        type="password"
        styleVariant="outline"
        className="text-lg"
      />

      <Input
        type="text"
        className=""
        fieldKey="username"
        placeholder="Username"
        customValidation={(value: string) =>
          value.length < 4 ? 'Username must be at least 4 characters' : null
        }
      />

      <RadioButton
        fieldKey="gender"
        containerClassName="flex justify-center items-center gap-4"
        labelClassName="space-x-2"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          {
            value: "Don't Blame me for not including the rest...😉",
            label: 'Others',
          },
        ]}
        required
      />

      <Select
        fieldKey="security"
        className=""
        options={[
          { value: 'max', label: 'Password Security to max' },
          { value: 'low', label: 'Password Security to low' },
        ]}
        placeholder="Select Security Level"
        styleVariant="outline"
      />

      <Button
        variant="outline"
        onClick={handleSubmit}
        className="text-lg py-3 px-6 font-semibold"
      >
        Submit
      </Button>
    </form>
  );
};
```

### 3. Update `App.tsx`

```typescript
import { MyForm } from './components/MyForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MyForm />
    </div>
  );
}

export default App;
```

### 4. Run Your Application

```bash
npm run dev
```

### 5. Validation Rules

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

### 6. Full Form Example

For a complete example, please refer to the example folder in this project or visit [GitHub Repo](https://github.com/Emperor-Grey/react-tailwind-form-validator-demo.git).

---

## Props

Here’s a breakdown of the props available for each component:

### Button

Props for the **Button** component:

- `variant`: Determines the button style. Can be `'default'` or `'outline'`.
- `disabled`: Optional. If set to `true`, the button will be disabled.
- `className`: Optional. Custom Tailwind CSS class for styling.
- `iconLeft`: Optional. An icon to display on the left side of the button.
- `iconRight`: Optional. An icon to display on the right side of the button.

### Input

Props for the **Input** component:

- `fieldKey`: A unique key to identify the form field.
- `type`: The input field type. Can be `'email'`, `'password'`, `'number'`, `'date'`, or `'text'`.
- `placeholder`: Optional. The placeholder text for the input field.
- `required`: Optional. If `true`, the field is required.
- `className`: Optional. Custom Tailwind CSS class for styling.
- `security`: Optional. Can be `'max'` or `'low'` to specify security level (for password fields).
- `styleVariant`: Optional. Defines the input style. Can be `'default'` or `'outline'`.
- `customValidation`: Optional. A function to perform custom validation.
- `onChange`: Optional. Custom `onChange` handler for input change.
- `onValidityChange`: Optional. A callback function for validity change.

### RadioButton

Props for the **RadioButton** component:

- `options`: An array of radio button options, where each option is an object with `value` and `label`.
- `fieldKey`: A unique key to identify the field.
- `onChange`: Optional. Custom handler for radio button selection change.
- `containerClassName`: Optional. Custom Tailwind CSS class for the radio button container.
- `labelClassName`: Optional. Custom Tailwind CSS class for the label of each radio button.
- `className`: Optional. Custom Tailwind CSS class for the radio buttons.
- `textClassName`: Optional. Custom Tailwind CSS class for the text next to the radio button.
- `required`: Optional. If `true`, the radio button selection is required.

### Select

Props for the **Select** component:

- `options`: An array of select options, where each option is an object with `value` and `label`.
- `fieldKey`: A unique key to identify the field.
- `placeholder`: Optional. Placeholder text for the select element.
- `required`: Optional. If `true`, the field is required.
- `label`: Optional. The label for the select field.
- `className`: Optional. Custom Tailwind CSS class for styling.
- `styleVariant`: Optional. Defines the select style. Can be `'default'` or `'outline'`.
- `onChange`: Optional. Custom handler for value change in the select field.
- `onValidityChange`: Optional. Callback for validity change.

---

## Features

- **Easy Integration**: Minimal setup for integrating form validation into your React application.
- **Tailwind CSS Integration**: Fully styled with Tailwind CSS for flexible and responsive design.
- **Customizable Components**: Modify the appearance and behavior of each form component.
- **Built-in Validation**: Includes common validation rules like `required` and custom validation functions (e.g., regex, length checks).
- **Responsive**: Mobile-first and responsive design using Tailwind CSS.

## Conclusion

React Tailwind Form Validator is designed to make form creation and validation simple and customizable. It integrates seamlessly with Tailwind CSS for flexible styling, supports built-in and custom validation rules, and is easy to use in any React project.

---
