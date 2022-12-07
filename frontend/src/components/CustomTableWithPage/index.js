import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import EnhancedTableHead from "./EnhancedTableHead";
import SearchBar from "../SearchBar";
import Toolbar from "@material-ui/core/Toolbar";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "auto",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  bgclr: {
    backgroundColor: "#bbbbbb",
  },
});

const CustomTableWithPage = (props) => {
  const {
    rows,
    columns,
    loading,
    disableSearch,
    disablePagination,
    disableSort,
    uniqueKey = "id",
    rowsPerPageArr,
  } = props;

  const [searchText, setSearchText] = useState("");

  const filtered_rows = rows.filter((data) => {
    return columns
      .filter((data) => !data.excludeFromSearch)
      .some((col) => {
        const myText1 = data[col.originalId] || "";
        const myText2 = data[col.id] || "";
        const myText = myText1
          ? "" + myText1
          : typeof myText2 === "object"
          ? ""
          : "" + myText2;
        return myText.toLowerCase().includes(searchText.toLowerCase());
      });
  });

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(
    disablePagination ? rows.length : rowsPerPageArr ? rowsPerPageArr[0] : 10
  );

  //This will set the page according to the row count if pagination is disabled.
  useEffect(() => {
    if (disablePagination) {
      setRowsPerPage(rows.length);
    }
  }, [rows.length, disablePagination]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div className={classes.content}>
      {!disableSearch && (
        <Toolbar className={classes.bgclr}>
          <SearchBar setSearchText={setSearchText} />
          {props.children}
        </Toolbar>
      )}

      <Paper className={classes.root}>
        <TableContainer style={{ maxHeight: "60vh", minHeight: "60vh" }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columns={columns}
              disableSort={disableSort || false}
            />
            <TableBody>
              {loading ? (
                <>
                  <StyledTableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      style={{ color: "red" }}
                    >
                      <LinearProgress />
                    </TableCell>
                  </StyledTableRow>
                </>
              ) : filtered_rows.length === 0 ? (
                <>
                  <StyledTableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      style={{ color: "red" }}
                    >
                      No data found
                    </TableCell>
                  </StyledTableRow>
                </>
              ) : (
                (orderBy !== null
                  ? stableSort(filtered_rows, getComparator(order, orderBy))
                  : filtered_rows
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row[uniqueKey] || index}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              style={{ borderLeft: "1px solid lightgray" }}
                              key={column.id}
                              align={column.align}
                            >
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </StyledTableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!disablePagination && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageArr || [10, 20, 50]}
            component="div"
            count={filtered_rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
};

CustomTableWithPage.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  disableSearch: PropTypes.bool,
  disablePagination: PropTypes.bool,
  disableSort: PropTypes.bool,
  uniqueKey: PropTypes.string,
  rowsPerPageArr: PropTypes.array,
};

export default CustomTableWithPage;
