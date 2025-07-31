import * as React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import EnhancedTableHeadFilterArea from "./EnhancedTablHeadFilterArea";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
export default function EnhancedTableHead(props) {
  useEffect(() => {
    tempArray = props.rows;
  }, [props.filteredRows]);

  const [selectedColumn, setSelectedColumn] = useState();

  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  let tempArray = props.rows;
  const processedId = (id) =>
    id.split("").some((char, index, arr) => {
      return index > 0 && index < arr.length - 1 && char === char.toUpperCase();
    })
      ? id.substring(0, Math.ceil(id.length / 2))
      : id;
  const [filteringBy, setFilteringBy] = useState([]);

  function Filter(value, head, event, operator) {
    //set pagiantion page to 0
    props.handleChangePage(event, 0);
    if (head.button) return;
    const valueToPush = {
      key: head.id,
      value: [value],
      type: head.numeric ? "numeric" : head.isSelect ? "select" : "text",
      operator: operator,
    };
    //if column name exist push value inside object
    if (filteringBy.some((value) => value.key === head.id)) {
      filteringBy.forEach((element, index) => {
        if (element.key === head.id && event) {
          element.value.push(value);
          element.operator = operator;
        } else if (element.key == head.id && !head.isSelect) {
          element.value[0] = value;
          element.operator = operator;
        }
      });
    }
    //else push object as new column
    else if (event || !head.isSelect) filteringBy.push(valueToPush);
    //in case uncheck remove from filterBy
    if (
      (!event && head.isSelect) ||
      (!event && !head.isSelect && value == "")
    ) {
      filteringBy.map((element, index) => {
        //case column exists
        if (element.key === head.id && element.value.length > 1) {
          let stringIndex = element.value.indexOf(value);
          element.value.splice(stringIndex, 1);
        }
        // case not exists
        else if (element.key === head.id) filteringBy.splice(index, 1);
      });
      // case unchecked show all data
      if (filteringBy.length === 0) tempArray = props.rows;
    }
    // get from filtering where type is select
    var selectItems = filteringBy.filter((obj) => {
      return obj.type === "select";
    });
    // get from filtering where type is text
    var textItems = filteringBy.filter((obj) => {
      return obj.type === "text";
    });
    //get from filtering where type is number
    var numericItems = filteringBy.filter((obj) => {
      return obj.type === "numeric";
    });
    //filter select items if exists
    if (selectItems.length > 0)
      selectItems.map((element, index) => {
        tempArray = tempArray.filter((item) =>
          element.value.includes(item[element.key].toString())
        );
      });
    //filter text items if exists
    if (textItems.length > 0)
      tempArray = filterArrayOfTexts(textItems, tempArray);

    //filter numbers items if exists
    if (numericItems.length > 0)
      tempArray = filterArrayOfNumbers(numericItems, tempArray);
    props.setRows(tempArray);
  }
  const filterArrayOfNumbers = (numericItems, tempArray) => {
    numericItems.map((element, index) => {
      element.value.map((el) => {
        if (element.operator === "=")
          tempArray = tempArray.filter((item) =>
            element.value.includes(item[element.key].toString())
          );
        if (element.operator === "!=")
          tempArray = tempArray.filter(
            (item) => !element.value.includes(item[element.key].toString())
          );
        if (element.operator === ">")
          tempArray = tempArray.filter(
            (item) => Number(item[element.key]) > Number(element.value)
          );
        if (element.operator === ">=")
          tempArray = tempArray.filter(
            (item) => Number(item[element.key]) >= Number(element.value)
          );
        if (element.operator === "<")
          tempArray = tempArray.filter(
            (item) => Number(item[element.key]) < Number(element.value)
          );
        if (element.operator === "<=")
          tempArray = tempArray.filter(
            (item) => Number(item[element.key]) <= Number(element.value)
          );
        if (element.operator === "is empty")
          tempArray = tempArray.filter((item) => item[element.key] == "");
        if (element.operator === "not empty")
          tempArray = tempArray.filter((item) => item[element.key] != "");
      });
    });
    return tempArray;
  };
  const filterArrayOfTexts = (textItems, tempArray) => {
    textItems.map((element, index) => {
      element.value.map((el) => {
        if (element.operator === "contains")
          tempArray = tempArray.filter((item) =>
            item[element.key]
              .toString()
              .toLowerCase()
              .includes(element.value[0].toLowerCase())
          );
        if (element.operator === "starts with")
          tempArray = tempArray.filter(
            (item) =>
              item[element.key]
                .toString()
                .toLowerCase()
                .lastIndexOf(element.value[0].toLowerCase(), 0) === 0
          );
        if (element.operator === "ends with")
          tempArray = tempArray.filter((item) =>
            item[element.key]
              .toString()
              .toLowerCase()
              .endsWith(element.value[0], item[element.key].toString().length)
          );
        if (element.operator === "is empty")
          tempArray = tempArray.filter(
            (item) => item[element.key].toString().length <= 0
          );
        if (element.operator === "not empty")
          tempArray = tempArray.filter(
            (item) => item[element.key].toString().length > 0
          );
      });
    });
    return tempArray;
  };
  return (
    <>
      <TableHead>
        <TableRow>
          {props.headCells.map((headCell, index) => (
            <TableCell
              key={index}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {!headCell.button ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {/[A-Z]/.test(headCell.id)
                    ? headCell.id.replace(/([A-Z])/g, " $1").trim()
                    : headCell.id}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                <></>
              )}
              <EnhancedTableHeadFilterArea
                setSelectedColumn={setSelectedColumn}
                selectedColumn={selectedColumn}
                filter={Filter}
                setRows={props.setRows}
                rows={props.rows}
                headCell={headCell}
              />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}
