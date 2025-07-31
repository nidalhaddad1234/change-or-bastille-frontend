import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
export default function NumericFilterComponent(props) {
  const [operator, setOperator] = useState("=");
  const [isVisible, setIsVisible] = useState(true);
  const handleChange = (event) => {
    setOperator(event.target.value);
    if (event.target.value == "is empty" || event.target.value == "not empty") {
      setIsVisible(false);
      props.filter("t", props.head, undefined, event.target.value);
    } else {
      props.filter(value, props.head, undefined, event.target.value);
      setIsVisible(true);
    }
  };
  const [value, setValue] = useState("");
  const handleChangeValue = (event) => {
    setValue(event.target.value);
    props.filter(event.target.value, props.head, undefined, operator);
  };

  return (
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
      <div style={{ display: "flex" }}>
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={props.head.id}
          size="small"
          style={{ width: "7rem" }}
          InputProps={{
            readOnly: true,
          }}
        />
        <FormControl variant="outlined">
          <InputLabel>Operators</InputLabel>
          <Select
            label="Operators"
            onChange={handleChange}
            value={operator}
            size="small"
            style={{ minWidth: "7rem" }}
          >
            <MenuItem value="=">equal</MenuItem>
            <MenuItem value="!=">not equal</MenuItem>
            <MenuItem value=">">greater than</MenuItem>
            <MenuItem value=">=">greater than or equal</MenuItem>
            <MenuItem value="<">less than</MenuItem>
            <MenuItem value="<=">less than or equal</MenuItem>
            <MenuItem value="is empty">is empty</MenuItem>
            <MenuItem value="not empty">is not empty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{ display: isVisible ? "block" : "none" }}
          id="outlined-read-only-input"
          label="Value"
          size="small"
          sx={{ width: "8rem" }}
          placeholder="Filter Value"
          type="number"
          value={value}
          onChange={handleChangeValue}
        />
      </div>
    </div>
  );
}
