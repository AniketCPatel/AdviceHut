const express = require("express");
const router = express.Router();

const { getFundHead } = require("../controllers/fundHeadController");

router.route("/").get(getFundHead);

module.exports = router;
