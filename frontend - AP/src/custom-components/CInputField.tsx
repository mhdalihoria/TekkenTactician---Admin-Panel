import { styled, TextField, TextFieldProps } from "@mui/material";

type CustomInputFieldTypes = TextFieldProps & {
  fieldColor?: string;
};

const CustomInputField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "fieldColor",
})<{ fieldColor: string }>(({ theme, fieldColor }) => ({
  /*
    * .MuiInputLabel-root => style of the label of the text field.
    * .MuiInputLabel-root.Mui-focused => Controls the label's color when the input field is focused.
    * .MuiInputBase-input => Controls the color and style of the actual text entered inside the input field.
    * .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline => Controls the outline color and style when the text field is in its normal state.
    * .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline => Controls the outline color when the input field is focused.
    * .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline => Controls the outline color when hovering over the input field.    
    * .MuiInputBase-input::placeholder => Controls the style and color of the placeholder text inside the input field.
    * .MuiFormHelperText-root => Controls the color and style of the helper text displayed below the input field.
    * .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline => Controls the outline color when the input field has an error.
    * .MuiInputLabel-root.Mui-error => Controls the color of the label when the input field is in an error state.
    * .MuiFormHelperText-root.Mui-error => Controls the color of the helper text when there's an error.
    * .MuiInputBase-root.Mui-disabled => Controls the styles when the input is disabled.
    
    */

// first way of doing it, more compact
  //   ".MuiInputLabel-root, .MuiInputLabel-root.Mui-focused, .MuiInputBase-input, .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiInputBase-input::placeholder, .MuiFormHelperText-root, .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline, .MuiInputLabel-root.Mui-error, .MuiFormHelperText-root.Mui-error, .MuiInputBase-root.Mui-disabled,.MuiInputAdornment-root, .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
  //     {
  //       color: `${fieldColor}`,
  //       borderColor: `${fieldColor}`,
  //     },

// second way of doing it, more detailed
  "& .MuiInputLabel-root": {
    color: fieldColor,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: fieldColor,
  },
  "& .MuiInputBase-input": {
    color: fieldColor,
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: fieldColor,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: fieldColor,
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: fieldColor,
  },
  "& .MuiInputBase-input::placeholder": {
    color: fieldColor,
  },
  "& .MuiFormHelperText-root": {
    color: fieldColor,
  },
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: fieldColor,
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: fieldColor,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: fieldColor,
  },
  "& .MuiInputBase-root.Mui-disabled": {
    color: fieldColor,
    backgroundColor: fieldColor,
  },
  "& .MuiInputAdornment-root": {
    color: fieldColor,
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: fieldColor,
  },
}));

export const CInputField = ({
  name,
  label,
  type,
  variant = "outlined",
  fieldColor = "#fff",
  ...restProps
}: CustomInputFieldTypes) => {
  return (
    <CustomInputField
      name={name}
      label={label}
      type={type}
      variant={variant}
      fieldColor={fieldColor}
      {...restProps}
    />
  );
};
