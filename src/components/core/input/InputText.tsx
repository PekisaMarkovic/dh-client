"use client";

import { useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/core/input/style";
import ErrorMessage from "@/components/core/typography/ErrorMessage";
import Label from "@/components/core/typography/Label";

type Props = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "password";
  placeholder?: string;
  autoComplete?: string;
  isRequired?: boolean;
  disabled?: boolean;
  // the first and the last day a date field can have ("2026-11-27")
  min?: string;
  max?: string;
};

// has to be inside a react-hook-form <FormProvider>, the error text comes from the validation (the `er` translations)
const InputText = ({ name, label, type = "text", placeholder, autoComplete, isRequired, disabled, min, max }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message ? String(errors[name]?.message) : null;

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name} label={label} isRequired={isRequired} />
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        min={min}
        max={max}
        aria-invalid={!!error}
        className={`${inputStyle({ error: !!error, disabled })} h-11`}
        {...register(name)}
      />
      <ErrorMessage name={error} />
    </div>
  );
};

export default InputText;
