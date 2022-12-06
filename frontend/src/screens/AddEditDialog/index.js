import React, { useEffect, useState } from "react";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import toast from "react-hot-toast";
import { exceptNumber } from "../../helper";
import CustomizedDialog from "../../components/CustomizedDialog";
import SearchableComboBox from "../../components/SearchableComboBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "axios";

const AddEditDialog = (props) => {
  const [billAmount, setBill] = useState(0);
  const [gst, setGST] = useState(0);
  const [netAmount, setNet] = useState(0);
  const [it, setIT] = useState(0);
  const [ls, setLS] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [deduction, setDeduct] = useState(0);
  const [chequeAmount, setCheque] = useState(0);
  const [agencyName, setAgency] = useState("");
  const [fundHead, setFundHead] = useState("");
  const [, setForceUpdate] = useState(false);
  const [load, setLoad] = useState(false);

  const fetchAgencyName = () => {
    axios
      .get(`/api/agency`)
      .then((res) => {
        setAgency(res.data);
        toast.success("Agency Records Fetched");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const calculateValues = () => {
    if (+billAmount > 250000) {
      setGST(Math.ceil((+billAmount * 100 * (2 / 100)) / 113));
    } else if (+billAmount <= 250000) {
      setGST(0);
    }
    setNet(+billAmount - +gst);
    setIT(Math.ceil(+billAmount * (2 / 100)));
    setLS(Math.ceil(+billAmount * (1 / 100)));
    setDeduct(+deposit + ls + it);
    setCheque(+netAmount - +deduction);
    setForceUpdate((old) => !old);
  };

  useEffect(() => {
    calculateValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billAmount, deposit]);

  useEffect(() => {
    fetchAgencyName();
  }, []);

  const addHandler = () => {
    if (!billAmount) {
      toast.error("Bill Amount Required");
      return;
    }
    if (!deposit) {
      toast.error("Deposit Required");
      return;
    }
    if (!agencyName) {
      toast.error("Agency Name Required");
      return;
    }
    setLoad(true);
    axios
      .post(`/api/advice`, {
        billAmount,
        gst,
        netAmount,
        it,
        ls,
        deposit,
        deduction,
        chequeAmount,
        agencyName,
        fundHead,
      })
      .then((res) => {
        setLoad(false);
        toast.success("New Advice Created Successfully.");
        props.handleClose();
      })
      .catch((err) => {
        setLoad(false);
        toast.error(err);
      });
  };

  return (
    <CustomizedDialog
      title={props?.title}
      action={
        <>
          <Grid item xs={12} md={2}>
            <Button
              onClick={addHandler}
              variant="contained"
              color="secondary"
              fullWidth
              disabled={load}
            >
              <AddCircleIcon /> &nbsp; {props?.mainName}
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              // onClick={resetForm}
              variant="contained"
              color="action"
              fullWidth
              // disabled={loadingData}
            >
              <HighlightOffIcon /> &nbsp; {props?.secondName}
            </Button>
          </Grid>
        </>
      }
      {...props}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="billAmount"
            label="Bill Amount"
            name="billAmount"
            type="number"
            variant="outlined"
            fullWidth
            value={Number(billAmount) || ""}
            onChange={(e) => {
              setBill(e.target.value);
            }}
            onKeyDown={(e) =>
              exceptNumber.includes(e.key) && e.preventDefault()
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            margin="dense"
            id="gst"
            label="GST"
            name="gst"
            type="number"
            variant="outlined"
            fullWidth
            value={gst || 0}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            margin="dense"
            id="netAmount"
            label="Net Amount"
            name="netAmount"
            type="number"
            variant="outlined"
            fullWidth
            value={netAmount || ""}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            margin="dense"
            id="it"
            label="I.T."
            name="it"
            type="number"
            variant="outlined"
            fullWidth
            value={it || ""}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            margin="dense"
            id="ls"
            label="L.S."
            name="ls"
            type="number"
            variant="outlined"
            fullWidth
            value={ls || ""}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            required
            margin="dense"
            id="deposit"
            label="Deposit"
            name="deposit"
            type="number"
            variant="outlined"
            fullWidth
            value={Number(deposit) || ""}
            onChange={(e) => {
              setDeposit(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            margin="dense"
            id="deduction"
            label="Total Deduction"
            name="deduction"
            type="number"
            variant="outlined"
            fullWidth
            value={deduction || ""}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            margin="dense"
            id="chequeAmount"
            label="Cheque Amount"
            name="chequeAmount"
            type="number"
            variant="outlined"
            fullWidth
            value={chequeAmount || ""}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SearchableComboBox
            required
            id="agencyName"
            name="agencyName"
            label="Agency Name"
            onChange={(e) => {
              setAgency(e.target.value);
            }}
            // items={[{ _id: "1234567890", name: "Hello Test1" }]}
            items={agencyName}
            selectedValues={agencyName}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SearchableComboBox
            id="fHead"
            name="fHead"
            label="Fund Head"
            onChange={(e) => {
              setFundHead(e.target.value);
            }}
            items={[]}
            selectedValues={fundHead}
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </CustomizedDialog>
  );
};

export default AddEditDialog;
