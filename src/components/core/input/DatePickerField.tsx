"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { srLatn } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/core/input/style";
import ErrorMessage from "@/components/core/typography/ErrorMessage";
import Label from "@/components/core/typography/Label";
import CalendarIcon from "@/icons/CalendarIcon";

type Props = {
  // the value of the form is a day as "2026-11-27"
  name: string;
  label: string;
  isRequired?: boolean;
  // the first and the last day that can be picked ("2026-11-27")
  min: string;
  max: string;
};

// a day is kept without time; a Date at local midnight is only what the calendar works with
const toDate = (day: string) => {
  const [year, month, date] = day.split("-").map(Number);

  return new Date(year, month - 1, date);
};
const toDay = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
// "26.11.2026"
const toText = (date: Date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

/**
 * A field for a day with a calendar in the colors of the site (react-day-picker), instead of the date field
 * of the browser that every phone draws in its own way. A click opens the calendar under the field,
 * only the days from min to max can be picked. Has to be inside a react-hook-form <FormProvider>.
 */
const DatePickerField = ({ name, label, isRequired, min, max }: Props) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const first = toDate(min);
  const last = toDate(max);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected = field.value ? toDate(field.value) : undefined;
        const error = fieldState.error?.message ?? null;

        return (
          <div className="flex flex-col gap-1">
            <Label htmlFor={name} label={label} isRequired={isRequired} />
            <button
              id={name}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              className={`${inputStyle({ error: !!error })} flex h-11 items-center justify-between gap-2 text-left`}
            >
              <span className={selected ? "" : "text-stone-400"}>{selected ? toText(selected) : label}</span>
              <CalendarIcon className="h-5 w-5 shrink-0 text-stone-500" />
            </button>

            {isOpen && (
              <div className="mt-1 flex justify-center rounded-xl border border-stone-700 bg-brand-dark p-2 [container-type:inline-size]">
                {/* a container: the days take its width (see .rdp-dh in globals.css), so the calendar fits a narrow phone */}
                <DayPicker
                  className="rdp-dh"
                  mode="single"
                  locale={srLatn}
                  weekStartsOn={1}
                  selected={selected}
                  defaultMonth={selected ?? first}
                  startMonth={first}
                  endMonth={last}
                  disabled={[{ before: first }, { after: last }]}
                  onSelect={(date) => {
                    if (!date) return;
                    field.onChange(toDay(date));
                    setIsOpen(false);
                  }}
                />
              </div>
            )}

            <ErrorMessage name={error} />
          </div>
        );
      }}
    />
  );
};

export default DatePickerField;
