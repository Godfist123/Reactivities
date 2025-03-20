import React from "react";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface DatePickerComponentProps {
  name: string;
  control: any;
  label: string;
  defaultValue?: Date | null;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  name,
  control,
  label,
  defaultValue = null,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DateTimePicker
          label={label}
          value={new Date(value) || null}
          onChange={(date) => onChange(new Date(date!))}
          slotProps={{
            textField: {
              error: !!error,
              helperText: error ? error.message : "",
              fullWidth: true,
            },
          }}
        />
      )}
    />
  );
};

export default DatePickerComponent;
