// const { Box } = require("@mui/material");
// const { styled } = require("@mui/system");

import { Box } from "@mui/material";
import { styled } from "@mui/material";

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

export default FlexBetween;