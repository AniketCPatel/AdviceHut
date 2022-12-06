const mongoose = require("mongoose");

const fundHeadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Fund Head"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("fundhead", fundHeadSchema);
