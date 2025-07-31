import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EnhancedTableHead from "../customtablefiltering/EnhancedTableHead";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

export default function CustomTableFilter(props) {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("D");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Age", key: "age" },
  ];

  const csvReport = {
    data: rows,
    headers: props.CSVHeader,
    filename: `${props.TableName}.csv`,
  };
  useEffect(() => {
    setRows(props.Data);
    setData(props.Data);
  }, []);
  return (
    <>
      {props.csv && (
        <div className="App">
          <CSVLink {...csvReport}>Export to CSV</CSVLink>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            setRows={setRows}
            handleChangePage={handleChangePage}
            filteredRows={rows}
            headCells={props.HeadCell}
            rows={data}
          />
          <TableBody>
            <TableRow></TableRow>
            {props.children(rows, order, rowsPerPage, orderBy, page)}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
