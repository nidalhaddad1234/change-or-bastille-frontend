import * as React from "react";
import CustomTableChild from "./CustomTableChild";
import { useEffect, useState } from "react";
import CustomTableFilter from "../customtablefiltering/CustomTableFilter";
export default function CustomTable(props) {
  const { tempArray } = props;
  const [headers, setHeaders] = useState();
  const [headCells, setHeadCells] = useState();

  useEffect(() => {
    const tempHeaders = Object.keys(tempArray[0])
      .map((key) => {
        if (key !== "button") {
          return { label: key.charAt(0).toUpperCase() + key.slice(1), key };
        }
        return null;
      })
      .filter((header) => header !== null);
    setHeaders(tempHeaders);

    const tempHeadCells = Object.keys(tempArray[0]).map((key) => {
      const values = tempArray.map((obj) => obj[key]);
      // Access the value of the key
      const valueOfKey = tempArray[0][key];
      return {
        id: key,
        numeric: /^\d+$/.test(valueOfKey) ? true : false,
        isSelect: false,
        disablePadding: false,
        button: key.toLowerCase() === "button",
      };
    });
    setHeadCells(tempHeadCells);
    return () => {};
  }, []);

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function descendingComparator(a, b, orderBy) {
    if (typeof a[orderBy] === "number" && typeof b[orderBy] === "number") {
      // If both values are numbers, compare them numerically
      return b[orderBy] - a[orderBy];
    }

    // If one or both values are not numbers, compare them as strings
    const valA = String(a[orderBy]).toLowerCase();
    const valB = String(b[orderBy]).toLowerCase();

    if (valB < valA) {
      return -1;
    }
    if (valB > valA) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <>
      {headCells && (
        <CustomTableFilter
          HeadCell={headCells}
          CSVHeader={headers}
          csv={props.csv}
          TableName="Subscriptions"
          Data={props.tempArray}
        >
          {(Result, order, rowsPerPage, orderBy, page) => (
            <>
              {stableSort(Result, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <CustomTableChild array={Result} item={row} key={index} />
                ))}
            </>
          )}
        </CustomTableFilter>
      )}
    </>
  );
}
