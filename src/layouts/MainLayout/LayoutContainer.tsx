import { mdAndUpMediaQuery } from "@/common/breakpointsHelpers";
import { Container, styled } from "@mui/material";

const LayoutContainer = styled(Container)(({ theme }) => ({
  [mdAndUpMediaQuery(theme.breakpoints)]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

LayoutContainer.defaultProps = {
  disableGutters: true,
  maxWidth: "lg",
};

export default LayoutContainer;
