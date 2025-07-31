import { Typography, Button } from "@mui/material";
import React from "react";

const IncrementDecrement = (props) => {
  const handleIncrement = () => {
    props.setCount(props.count + 1);
  };

  const handleDecrement = () => {
    if (props.count > 0) {
      props.setCount(props.count - 1);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDecrement}
        style={{
          width: "40px",
          minWidth: "auto",
          background: "#fff",
          color: "#000",
          height: "40px",
          position: "relative",
          left: "3px",

          boxShadow: "initial",
          display: "flex",
          justifyContent: "center",
        }}
      >
        -
      </Button>
      <Typography
        variant="body2"
        sx={{
          width: "30px",
          textAlign: "center",
          lineHeight: "40px",
          margin: "0",
          background: "#fff",
        }}
        gutterBottom
      >
        {props.count}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleIncrement}
        style={{
          width: "40px",
          height: "40px",
          minWidth: "auto",
          background: "#fff",
          display: "flex",
          boxShadow: "initial",
          position: "relative",
          right: "3px",

          color: "#000",
          justifyContent: "center",
        }}
      >
        +
      </Button>
    </div>
  );
};

export default IncrementDecrement;
