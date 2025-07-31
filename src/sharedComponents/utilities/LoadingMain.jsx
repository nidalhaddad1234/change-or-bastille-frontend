import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingMain(props) {
  return (
    <Box sx={{ display: "flex", height: props.fullHeight ? "100vh" : "auto" }}>
      <CircularProgress color="gold" sx={{ margin: "auto" }} />
    </Box>
  );
}
