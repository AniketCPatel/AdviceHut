const asyncHandler = require("express-async-handler");

const Agency = require("../models/agencyModel");

// @desc        Get Agency Names
// @route       GET /api/agency
const getAgencies = asyncHandler(async (req, res) => {
  const agency = await Agency.find().sort({ _id: -1 });
  res.status(200).json(agency);
});

// @desc        Set Agency Name
// @route       POST /api/agency
const setAgency = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please enter Agency Name");
  }
  const agency = new Agency({
    name,
  });

  const createAgency = await agency.save();
  res.status(200).json(createAgency);
});

// @desc        Delete Agency Name
// @route       DELETE /api/agency/:id
const deleteAgency = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.params.id);
  if (agency) {
    await agency.remove();
    res.json({ message: "Agency removed" });
  } else {
    res.status(404);
    throw new Error("Agency not found.");
  }
  res.status(200).json({ id: req.params.id });
});

module.exports = { getAgencies, setAgency, deleteAgency };
