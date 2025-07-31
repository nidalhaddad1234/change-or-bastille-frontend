import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading(props) {
  return (
    <Box sx={{ display: "flex", height: props.auto ? "auto" : "75vh", width: "100%" }}>
      <CircularProgress sx={{ margin: "auto" }} />
    </Box>
  );
}
