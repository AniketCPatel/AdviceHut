import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import CustomTableWithPage from "../../components/CustomTableWithPage";
import CustomReportDownload from "../../components/CustomReportDownload";
import {
  formatDateTime,
  // GLOBAL_DISABLE_AUTO_CLOSE_TOAST,
} from "../../helper";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import toast from "react-hot-toast";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddEditDialog from "../AddEditDialog";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AddAgency from "../AddAgency";
import PostAddIcon from "@material-ui/icons/PostAdd";
import axios from "axios";
import CachedIcon from "@material-ui/icons/Cached";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AddFundHead from "../AddFundHead";

const AdviceForm = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAgency, setOpenAgency] = useState(false);
  const [openFundHead, setOpenFundHead] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchData = () => {
    setLoad(true);
    axios
      .get(`/api/advice`)
      .then((res) => {
        setLoad(false);
        setTableData(res.data);
        toast.success("Advice Record(s) Fetched");
      })
      .catch((err) => {
        setLoad(false);
        toast.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(`/api/advice/${id}`)
      .then((res) => {
        toast.success("Advice Deleted Successfully.");
        fetchData();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const columns = [
    {
      id: "action",
      label: "Action",
      disableSort: true,
      excludeFromSearch: true,
      minWidth: 50,
      align: "center",
    },
    {
      id: "billAmount",
      label: "Bill Amount",
      minWidth: 90,
    },
    {
      id: "gst",
      label: "GST",
      minWidth: 70,
    },
    {
      id: "netAmount",
      label: "Net Amount",
      minWidth: 90,
    },
    {
      id: "it",
      label: "I.T.",
      minWidth: 70,
    },
    {
      id: "ls",
      label: "L.S.",
      minWidth: 70,
    },
    {
      id: "deposit",
      label: "Deposit",
      minWidth: 70,
      color: "#009BDF",
    },
    {
      id: "deduction",
      label: "Total Deduction",
      minWidth: 90,
    },
    {
      id: "chequeAmount",
      label: "Cheque Amount",
      minWidth: 90,
    },
    {
      id: "agencyName",
      label: "Agency Name",
      minWidth: 150,
    },
    {
      id: "fundHead",
      label: "Fund Head",
      minWidth: 150,
    },
  ];

  const rows =
    tableData &&
    tableData.map((item) => {
      return {
        ...item,
        action: (
          <>
            <Tooltip title="Edit" placement="top" TransitionComponent={Zoom}>
              <EditIcon
                color="primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // setPassData({});
                  setOpenEdit(true);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete" placement="top" TransitionComponent={Zoom}>
              <DeleteIcon
                color="secondary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deleteHandler(item._id);
                }}
              />
            </Tooltip>
          </>
        ),
      };
    });

  // const totalAmount = () => {
  //   let result = 0;
  //   rows.map((item) => {
  //     result = result + item.amt;
  //   });
  //   console.log("!@WQ@", result);
  //   toast.dark(
  //     `Total Cheque Amount: ₹${result}`,
  //     GLOBAL_DISABLE_AUTO_CLOSE_TOAST
  //   );
  //   return result;
  // };

  return (
    <>
      {open && (
        <AddEditDialog
          open={open}
          mainName="Add"
          secondName="Clear"
          handleClose={(e, success) => {
            if (success) {
              fetchData();
            }
            setOpen(false);
          }}
          title="Create Advice"
        />
      )}
      {openEdit && (
        <AddEditDialog
          open={openEdit}
          data="pass data"
          mainName="Update"
          secondName="Reset"
          handleClose={(e) => {
            setOpenEdit(false);
          }}
          title="Edit Advice"
        />
      )}
      {openAgency && (
        <AddAgency
          open={openAgency}
          handleClose={(e) => {
            setOpenAgency(false);
          }}
        />
      )}
      {openFundHead && (
        <AddFundHead
          open={openFundHead}
          handleClose={(e) => {
            setOpenFundHead(false);
          }}
        />
      )}
      <div style={{ padding: "10px 20px" }}>
        <Paper elevation={7} style={{ marginTop: 15 }}>
          <CustomTableWithPage
            loading={load}
            columns={columns}
            rows={rows || []}
          >
            <Tooltip
              title="Add New Advice"
              placement="top"
              TransitionComponent={Zoom}
            >
              <IconButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                <PostAddIcon color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Add New Agency"
              placement="top"
              TransitionComponent={Zoom}
            >
              <IconButton
                onClick={() => {
                  setOpenAgency(true);
                }}
              >
                <GroupAddIcon style={{ color: "#1b5e20" }} fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Add New FundHead"
              placement="top"
              TransitionComponent={Zoom}
            >
              <IconButton
                onClick={() => {
                  setOpenFundHead(true);
                }}
              >
                <PlaylistAddIcon
                  style={{ color: "#ffea00" }}
                  fontSize="large"
                />
              </IconButton>
            </Tooltip>
            {/* <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                totalAmount();
              }}
              variant="contained"
              color="action"
              // disabled={loadingData}
            >
              {<AddToPhotosIcon />}
              Total Amount
            </Button> */}
            <CustomReportDownload
              data={rows}
              fileName={`AdviceData ${formatDateTime(new Date())}.xlsx`}
            />
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
      </div>
    </>
  );
};

export default AdviceForm;
