import React, { useEffect, useState } from "react";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
// import { toast } from "react-toastify";
import { exceptNumber } from "../../helper";
import CustomizedDialog from "../../components/CustomizedDialog";
import SearchableComboBox from "../../components/SearchableComboBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const AddEditDialog = (props) => {
  const [bill, setBill] = useState(0);
  const [gst, setGST] = useState(0);
  const [net, setNet] = useState(0);
  const [it, setIT] = useState(0);
  const [ls, setLS] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [deduct, setDeduct] = useState(0);
  const [cheque, setCheque] = useState(0);
  const [agency, setAgency] = useState("");
  const [fundHead, setFundHead] = useState("");
  const [, setForceUpdate] = useState(false);

  const calculateValues = () => {
    if (+bill > 250000) {
      setGST(Math.ceil((+bill * 100 * (2 / 100)) / 113));
    } else if (+bill <= 250000) {
      setGST(0);
    }
    setNet(+bill - +gst);
    setIT(Math.ceil(+bill * (2 / 100)));
    setLS(Math.ceil(+bill * (1 / 100)));
    setDeduct(+deposit + ls + it);
    setCheque(+net - +deduct);
    setForceUpdate((old) => !old);
  };

  useEffect(() => {
    calculateValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bill, deposit]);

  const addHandler = () => {};

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
              // disabled={loadingData}
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
            id="bill"
            label="Bill Amount"
            name="bill"
            type="number"
            variant="outlined"
            fullWidth
            value={bill || ""}
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
            id="net"
            label="Net Amount"
            name="net"
            type="number"
            variant="outlined"
            fullWidth
            value={net || ""}
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
            value={deposit || ""}
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
            id="deduct"
            label="Total Deduction"
            name="deduct"
            type="number"
            variant="outlined"
            fullWidth
            value={deduct || ""}
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
            id="cheque"
            label="Cheque Amount"
            name="cheque"
            type="number"
            variant="outlined"
            fullWidth
            value={cheque || ""}
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
            id="agency"
            name="agency"
            label="Agency Name"
            onChange={(e) => {
              setAgency(e.target.value);
            }}
            items={[]}
            selectedValues={agency}
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
