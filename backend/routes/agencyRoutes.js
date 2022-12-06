const express = require("express");
const router = express.Router();

const {
  getAgencies,
  setAgency,
  deleteAgency,
} = require("../controllers/agencyController");

router.route("/").get(getAgencies).post(setAgency);
router.route("/:id").delete(deleteAgency);

module.exports = router;
