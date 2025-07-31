import { TableCell, TableRow } from "@mui/material";
import React from "react";
export default function CustomTableChild(props) {
  return (
    <>
      <React.Fragment>
        <TableRow
          className="onhover-table"
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {Object.keys(props.item).map((key) => (
            <TableCell key={key} component="th" scope="row">
              {props.item[key]}
            </TableCell>
          ))}
        </TableRow>
      </React.Fragment>
    </>
  );
}
