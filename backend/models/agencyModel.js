const mongoose = require("mongoose");

const agencySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Agency Name"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("agency", agencySchema);
