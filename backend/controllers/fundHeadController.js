const asyncHandler = require("express-async-handler");

const FundHead = require("../models/fundHeadModel");

// @desc        Get FundHead
// @route       GET /api/fundHead
const getFundHead = asyncHandler(async (req, res) => {
  const fundHead = await FundHead.find().sort({ _id: -1 });
  res.status(200).json(fundHead);
});

module.exports = { getFundHead };
