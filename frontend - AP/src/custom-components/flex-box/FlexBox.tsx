import { Box } from "@mui/material";
import { BoxChildrenProps } from "../../types";

const FlexBox = ({
  children,
  ...props
}: BoxChildrenProps) => <Box display="flex" {...props}>
    {children}
  </Box>;
export default FlexBox;