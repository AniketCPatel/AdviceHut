import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const EnhancedTableHead = (props) => {
  const { classes, columns, order, orderBy, onRequestSort, disableSort } =
    props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              borderLeft: "1px solid lightgray",
              borderTop: "1px solid lightgray",
            }}
            sortDirection={
              orderBy === column.originalId || orderBy === column.id
                ? order
                : false
            }
          >
            {column.disableSort || disableSort ? (
              <b>{column.label}</b>
            ) : (
              <TableSortLabel
                active={orderBy === column.originalId || orderBy === column.id}
                direction={
                  orderBy === column.originalId || orderBy === column.id
                    ? order
                    : "asc"
                }
                onClick={createSortHandler(column.originalId || column.id)}
              >
                <b>{column.label}</b>
                {orderBy === column.originalId || orderBy === column.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;
