const express = require("express");
const router = express.Router();
const {
  getAdvices,
  setAdvice,
  updateAdvice,
  deleteAdvice,
} = require("../controllers/adviceController");

router.route("/").get(getAdvices).post(setAdvice);
router.route("/:id").put(updateAdvice).delete(deleteAdvice);

module.exports = router;
