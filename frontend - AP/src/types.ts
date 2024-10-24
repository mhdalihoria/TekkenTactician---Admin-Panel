import { BoxProps, ButtonProps, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";

//-------------------------------------------------------
//------------MUI Components Types-----------------------
//--------------------------------------------------start
export type BoxChildrenProps = BoxProps & {
  children: ReactNode;
};

export type CustomButtonProps = ButtonProps & {
  // Extending ButtonProps to inherit MUI Button's props
  color?: "primary" | "secondary" | "accent";
  btnSize?: "md" | "lg";
  children: React.ReactNode; // Children prop for button content
};

export type CustomInputFieldTypes = TextFieldProps & {
    fieldColor?: string;
  };
//-------------------------------------------------------
//------------MUI Components Types-----------------------
//----------------------------------------------------end
