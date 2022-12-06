import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Zoom,
} from "@material-ui/core";
// import { toast } from "react-toastify";
import CustomizedDialog from "../../components/CustomizedDialog";
import CustomTableWithPage from "../../components/CustomTableWithPage";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";
import toast from "react-hot-toast";
import CachedIcon from "@material-ui/icons/Cached";

const AddAgency = (props) => {
  const [agencyName, setAgencyName] = useState("");
  const [addLoad, setAddLoad] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchData = () => {
    setLoad(true);
    axios
      .get(`/api/agency`)
      .then((res) => {
        setLoad(false);
        setTableData(res.data);
        toast.success("Agency Record(s) Fetched");
      })
      .catch((err) => {
        setLoad(false);
        toast.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addHandler = () => {
    if (!agencyName) {
      toast.error("Agency Name Required");
      return;
    }
    setAddLoad(true);
    axios
      .post(`/api/agency`, {
        name: agencyName,
      })
      .then((res) => {
        setAddLoad(false);
        toast.success("New Agency Created Successfully.");
        setAgencyName("");
        fetchData();
        // props.handleClose();
      })
      .catch((err) => {
        setAddLoad(false);
        toast.error(err);
      });
  };

  const deleteHandler = (id) => {
    axios
      .delete(`/api/agency/${id}`)
      .then((res) => {
        toast.success("Agency Deleted Successfully.");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const columns = [
    {
      id: "name",
      label: "Agency Name",
      minWidth: 300,
    },
    {
      id: "action",
      label: "Action",
      maxWidth: 60,
      minWidth: 60,
      disableSort: true,
      excludeFromSearch: true,
      align: "center",
    },
  ];

  const rows = tableData.map((item) => {
    return {
      ...item,
      action: (
        <Tooltip title="Delete" placement="top" TransitionComponent={Zoom}>
          <DeleteIcon
            color="secondary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteHandler(item._id);
            }}
          />
        </Tooltip>
      ),
    };
  });

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
          <Grid item xs={12} sm={9}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="agencyName"
              label="Agency Name"
              name="agencyName"
              type="text"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={agencyName || ""}
              onChange={(e) => {
                setAgencyName(e.target.value);
              }}
              // inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              onClick={addHandler}
              variant="contained"
              color="primary"
              fullWidth
              disabled={addLoad}
            >
              <AddCircleIcon /> &nbsp; ADD
            </Button>
          </Grid>
        </Grid>
        <Paper elevation={7} style={{ marginTop: 10 }}>
          <CustomTableWithPage
            loading={load}
            columns={columns}
            rows={rows}
            rowsPerPageArr={[5, 10, 20]}
          >
            <Tooltip title="Refresh" placement="top" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                  fetchData();
                }}
              >
                <CachedIcon color="primary" />
              </IconButton>
            </Tooltip>
          </CustomTableWithPage>
        </Paper>
      </CustomizedDialog>
    </>
  );
};

export default AddAgency;
