import React from 'react';

import { ArrowRight3 } from 'iconsax-react';
import {
  Button,
  Input,
  RadioButton,
  Select,
  useFormData,
} from 'react-tailwind-form-validator';
import { SubmittedData } from '../types';

export function FormContent({
  setSubmittedData,
}: {
  setSubmittedData: React.Dispatch<React.SetStateAction<SubmittedData | null>>;
}) {
  const { formData, areInputsValid, revalidate } = useFormData();

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
    console.log('Form submitted successfully, ', submittedData);
  };

  return (
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
        required
        styleVariant="outline"
      />

      <Button
        variant="outline"
        iconRight={<ArrowRight3 size={23} variant="Bold" />}
        onClick={handleFormSubmit}
        className="text-lg py-3 px-6 font-semibold"
      >
        Submit
      </Button>
    </form>
  );
}
