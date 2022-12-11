const asyncHandler = require("express-async-handler");

const FundHead = require("../models/fundHeadModel");

// @desc        Get FundHead
// @route       GET /api/fundHead
const getFundHead = asyncHandler(async (req, res) => {
  const fundHead = await FundHead.find().sort({ _id: -1 });
  res.status(200).json(fundHead);
});

// @desc        Set Fund Head
// @route       POST /api/fundhead
const setFundHead = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please enter Fund Head");
  }
  const fundHead = new FundHead({
    name,
  });

  const createFundHead = await fundHead.save();
  res.status(200).json(createFundHead);
});

// @desc        Delete Fund Head
// @route       DELETE /api/fundhead/:id
const deleteFundHead = asyncHandler(async (req, res) => {
  const fundhead = await FundHead.findById(req.params.id);
  if (fundhead) {
    await fundhead.remove();
    res.status(200).json({ message: "Fund Head removed" });
  } else {
    res.status(404);
    throw new Error("Fund Head not found.");
  }
  // res.status(200).json({ id: req.params.id });
});

module.exports = { getFundHead, setFundHead, deleteFundHead };
