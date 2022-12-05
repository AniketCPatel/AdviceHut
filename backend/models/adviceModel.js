const mongoose = require("mongoose");

const adviceSchema = mongoose.Schema(
  {
    billAmount: {
      type: Number,
      required: [true, "Please enter Bill Amount"],
    },
    gst: {
      type: Number,
    },
    netAmount: {
      type: Number,
    },
    it: {
      type: Number,
    },
    ls: {
      type: Number,
    },
    deposit: {
      type: Number,
      required: [true, "Please enter Deposit"],
    },
    deduction: {
      type: Number,
    },
    chequeAmount: {
      type: Number,
    },
    agencyName: {
      type: String,
      required: [true, "Please enter Agency Name"],
    },
    fundHead: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("advices", adviceSchema);
