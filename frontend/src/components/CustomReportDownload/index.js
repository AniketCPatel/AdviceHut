import React from "react";
import { utils, writeFile } from "xlsx";
import PropTypes from "prop-types";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

const CustomReportDownload = ({ data = [], fileName = "Data.xlsx" }) => {
  const handleExport = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    utils.book_append_sheet(wb, ws, "Sheet1");
    writeFile(wb, fileName);
  };

  return (
    <Tooltip title="Download Report" placement="top" TransitionComponent={Zoom}>
      <IconButton
        style={{ cursor: "pointer", color: "#e91e63" }}
        onClick={handleExport}
      >
        <GetAppIcon fontSize="medium" disabled={data.length === 0} />
      </IconButton>
    </Tooltip>
  );
};

CustomReportDownload.propTypes = {
  fileName: PropTypes.any.isRequired,
  data: PropTypes.array.isRequired,
};

export default CustomReportDownload;
