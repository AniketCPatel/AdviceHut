const asyncHandler = require("express-async-handler");

// @desc        Get Advices
// @route       GET /api/advice
const getAdvices = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get advice" });
});

// @desc        Set Advice
// @route       POST /api/advice
const setAdvice = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "set advice" });
});

// @desc        Update Advice
// @route       PUT /api/advice/:id
const updateAdvice = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update advice ${req.params.id}` });
});

// @desc        Delete Advice
// @route       DELETE /api/advice/:id
const deleteAdvice = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete advice ${req.params.id}` });
});

module.exports = { getAdvices, setAdvice, updateAdvice, deleteAdvice };
