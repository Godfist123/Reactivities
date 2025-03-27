import { Button, ButtonProps, styled } from "@mui/material";
import { LinkProps } from "react-router-dom";

type StyledButtonProps = ButtonProps & Partial<LinkProps>;

const StyledBUtton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.text.disabled,
  },
}));

export default StyledBUtton;
