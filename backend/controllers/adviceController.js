const asyncHandler = require("express-async-handler");

const Advice = require("../models/adviceModel");

// @desc        Get Advices
// @route       GET /api/advice
const getAdvices = asyncHandler(async (req, res) => {
  const advice = await Advice.find();
  res.status(200).json(advice);
});

// @desc        Set Advice
// @route       POST /api/advice
const setAdvice = asyncHandler(async (req, res) => {
  const {
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
  } = req.body;
  if (!req.body.billAmount) {
    res.status(400);
    throw new Error("Please enter Bill Amount");
  }
  if (!req.body.deposit) {
    res.status(400);
    throw new Error("Please enter Deposit");
  }
  if (!req.body.agencyName) {
    res.status(400);
    throw new Error("Please enter Agency Name");
  }
  const advice = new Advice({
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
  });

  const createAdvice = await advice.save();
  res.status(200).json(createAdvice);
});

// @desc        Update Advice
// @route       PUT /api/advice/:id
const updateAdvice = asyncHandler(async (req, res) => {
  const {
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
  } = req.body;

  const advice = await Advice.findById(req.params.id);

  if (advice) {
    advice.billAmount = billAmount;
    advice.gst = gst;
    advice.netAmount = netAmount;
    advice.it = it;
    advice.ls = ls;
    advice.deposit = deposit;
    advice.deduction = deduction;
    advice.chequeAmount = chequeAmount;
    advice.agencyName = agencyName;
    advice.fundHead = fundHead;

    const updatedAdvice = await Advice.save();
    res.status(200).json(updatedAdvice);
  } else {
    res.status(400);
    throw new Error("Advice not found");
  }
});

// @desc        Delete Advice
// @route       DELETE /api/advice/:id
const deleteAdvice = asyncHandler(async (req, res) => {
  const advice = await Advice.findById(req.params.id);
  if (advice) {
    await advice.remove();
    res.json({ message: "Advice removed" });
  } else {
    res.status(404);
    throw new Error("Advice not found.");
  }
  res.status(200).json({ id: req.params.id });
});

module.exports = { getAdvices, setAdvice, updateAdvice, deleteAdvice };
