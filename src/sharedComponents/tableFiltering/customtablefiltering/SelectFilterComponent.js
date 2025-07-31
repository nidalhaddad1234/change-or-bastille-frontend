import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { Fragment, useEffect } from "react";
export default function SelectFilterComponent(props) {
  useEffect(() => {
    return () => {};
  }, []);

  function checkIfAllChecked() {
    let checker = (arr) => arr.every((v) => v === true);
    return checker(props.checked);
  }
  function checkIfOneChecked() {
    let ctrue = 0;
    let cfalse = 0;
    props.checked.forEach((element) => {
      if (element) ctrue++;
      else cfalse++;
    });
    if (ctrue > 0 && cfalse > 0) return true;
    else return false;
  }

  const handleChange = (event) => {
    let checker = (arr) => arr.every((v) => v === true);
    if (checker(props.checked)) {
      props.checked.forEach((element, index) => {
        props.checked[index] = false;
      });
    } else {
      props.checked.forEach((element, index) => {
        props.checked[index] = true;
      });
    }
    props.setChecked([...props.checked]);
  };
  return (
    <>
      <div
        style={{
          zIndex: "1",
          background: "#fff",
          border: "1px #e0e0e0 solid",
          position: "absolute",
          borderRadius: "0 0 6px 6px",
          padding: "1rem",
          maxHeight: "193px",
          overflow: "auto",
          boxShadow:
            "rgb(0 0 0 / 30%) 0px 19px 38px, rgb(0 0 0 / 22%) 0px 15px 12px",
          ...{ display: props.filteredOpen ? "block" : "none" },
        }}
      >
        <FormControlLabel
          label="Select All"
          control={
            <Checkbox
              checked={checkIfAllChecked()}
              indeterminate={checkIfOneChecked()}
              onChange={handleChange}
            />
          }
        />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
          {props.selectedItems.map((row, index) => {
            return (
              <Fragment key={index}>
                <Checkbox
                  name={row}
                  onClick={props.filter}
                  key={index}
                  head={props.head}
                  checked={props.checked}
                  setChecked={props.setChecked}
                />
              </Fragment>
            );
          })}
        </Box>
      </div>
    </>
  );
}
