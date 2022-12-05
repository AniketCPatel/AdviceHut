import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import CustomTableWithPage from "../../components/CustomTableWithPage";
import CustomReportDownload from "../../components/CustomReportDownload";
import {
  formatDateTime,
  // GLOBAL_DISABLE_AUTO_CLOSE_TOAST,
} from "../../helper";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import { toast } from "react-toastify";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddEditDialog from "../AddEditDialog";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AddAgency from "../AddAgency";
import PostAddIcon from "@material-ui/icons/PostAdd";

const AdviceForm = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAgency, setOpenAgency] = useState(false);
  // const [passData, setPassData] = useState({});

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
      id: "amt",
      label: "Cheque Amount",
      minWidth: 150,
    },
    {
      id: "agency",
      label: "Agency Name",
      minWidth: 250,
    },
    {
      id: "imsi",
      label: "Fund Head",
      minWidth: 150,
    },
    {
      id: "iccId",
      label: "Bill Amount",
      minWidth: 150,
    },
    {
      id: "imsi",
      label: "GST",
      minWidth: 150,
    },
    {
      id: "specificationName",
      label: "Net Amount",
      minWidth: 150,
    },
    {
      id: "status",
      label: "I.T.",
      minWidth: 100,
    },
    {
      id: "hlr",
      label: "L.S.",
      minWidth: 100,
    },
    {
      id: "iccId",
      label: "Deposit",
      minWidth: 150,
      color: "#009BDF",
    },
    {
      id: "status",
      label: "Total Deduction",
      minWidth: 100,
    },
  ];

  const rows = [
    {
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
                toast.warn("delete");
              }}
            />
          </Tooltip>
        </>
      ),
      amt: 102912,
      agency: "Aniket",
    },
    {
      amt: 1232111,
      agency: "C K Patel",
    },
    {
      amt: 1212,
      agency: "A234rewniket",
    },
    {
      amt: 12123,
      agency: "C Kwer Patel",
    },
    {
      amt: 1232111,
      agency: "C K Patel",
    },
    {
      amt: 1212,
      agency: "A234rewniket",
    },
    {
      amt: 12123,
      agency: "C Kwer Patel",
    },
    {
      amt: 1232111,
      agency: "C K Patel",
    },
    {
      amt: 1212,
      agency: "A234rewniket",
    },
    {
      amt: 12123,
      agency: "C Kwer Patel",
    },
    {
      amt: 1232111,
      agency: "C K Patel",
    },
    {
      amt: 1212,
      agency: "A234rewniket",
    },
    {
      amt: 12123,
      agency: "C Kwer Patel",
    },
  ];

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
          handleClose={(e) => {
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
      <div style={{ padding: "10px 20px" }}>
        <Paper elevation={7} style={{ marginTop: 20 }}>
          <CustomTableWithPage loading={false} columns={columns} rows={rows}>
            <Tooltip
              title="Add New Advice"
              placement="top"
              TransitionComponent={Zoom}
            >
              <IconButton>
                <PostAddIcon
                  color="primary"
                  onClick={() => {
                    setOpen(true);
                  }}
                  fontSize="large"
                />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Add New Agency"
              placement="top"
              TransitionComponent={Zoom}
            >
              <IconButton>
                <GroupAddIcon
                  style={{ color: "#1b5e20" }}
                  onClick={() => {
                    setOpenAgency(true);
                  }}
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
          </CustomTableWithPage>
        </Paper>
      </div>
    </>
  );
};

export default AdviceForm;
