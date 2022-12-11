const express = require("express");
const router = express.Router();

const {
  getFundHead,
  setFundHead,
  deleteFundHead,
} = require("../controllers/fundHeadController");

router.route("/").get(getFundHead).post(setFundHead);
router.route("/:id").delete(deleteFundHead);

module.exports = router;
