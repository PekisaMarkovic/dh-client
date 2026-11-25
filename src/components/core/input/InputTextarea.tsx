"use client";

import { useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/core/input/style";
import ErrorMessage from "@/components/core/typography/ErrorMessage";
import Label from "@/components/core/typography/Label";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  isRequired?: boolean;
  disabled?: boolean;
};

const InputTextarea = ({ name, label, placeholder, rows = 4, isRequired, disabled }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message ? String(errors[name]?.message) : null;

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name} label={label} isRequired={isRequired} />
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        className={`${inputStyle({ error: !!error, disabled })} py-3`}
        {...register(name)}
      />
      <ErrorMessage name={error} />
    </div>
  );
};

export default InputTextarea;
