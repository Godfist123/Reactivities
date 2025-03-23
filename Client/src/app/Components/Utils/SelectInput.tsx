import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ActivitySchema } from "../Activity/Schema/activitySchema";

interface SelectInputProps {
  name: string;
  control: Control<any>;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  errors: FieldErrors<ActivitySchema>;
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const { name, control, label, options, defaultValue = "", errors } = props;
  return (
    <FormControl variant="outlined" fullWidth error={!!errors.category}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select {...field} error={!!errors.category} label={label}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectInput;
