import React, { useState } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
// import { toast } from "react-toastify";
import CustomizedDialog from "../../components/CustomizedDialog";
import CustomTableWithPage from "../../components/CustomTableWithPage";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const AddAgency = (props) => {
  const [name, setName] = useState("");

  const columns = [
    {
      id: "name",
      label: "Agency Name",
      minWidth: 300,
    },
    {
      id: "action",
      label: "Action",
      maxWidth: 40,
      disableSort: true,
      excludeFromSearch: true,
      align: "center",
    },
  ];

  const rows = [
    {
      name: "Aniket",
      action: <DeleteIcon color="action" style={{ cursor: "pointer" }} />,
    },
    {
      name: "C K Patel",
      action: <DeleteIcon color="action" style={{ cursor: "pointer" }} />,
    },
  ];

  return (
    <>
      <CustomizedDialog title="Add New Agency" {...props}>
        <Grid
          container
          spacing={1}
          style={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} md={9}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="bill"
              label="Agency Name"
              name="bill"
              type="text"
              variant="outlined"
              fullWidth
              value={name || ""}
              onChange={(e) => {
                setName(e);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              // onClick={handleSubmit}
              variant="contained"
              color="secondary"
              fullWidth
            >
              <AddCircleIcon /> &nbsp; ADD
            </Button>
          </Grid>
        </Grid>
        <Paper elevation={7} style={{ marginTop: 10 }}>
          <CustomTableWithPage
            loading={false}
            columns={columns}
            rows={rows}
          ></CustomTableWithPage>
        </Paper>
      </CustomizedDialog>
    </>
  );
};

export default AddAgency;
