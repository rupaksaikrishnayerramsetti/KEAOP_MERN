import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type CustomTextFieldProps = TextFieldProps & {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  return (
    <TextField
      sx={props.sx}
      key={props.key}
      fullWidth={props.fullWidth}
      type={props.type}
      label={props.label}
      variant={props.variant}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      error={props.error}
      helperText={props.helperText}
      multiline={props.multiline}
      rows={props.rows}
      onChange={props.handleChange}
      margin={props.margin}
      size={props.size}
      required={props.required}
      InputProps={props.InputProps}
      InputLabelProps={props.InputLabelProps}
    />
  );
};

export default CustomTextField;
