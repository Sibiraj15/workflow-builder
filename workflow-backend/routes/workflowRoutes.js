const express = require("express");
const router = express.Router();
const { runWorkflow, getHistory } = require("../controllers/wrokflowController");

router.post("/run", runWorkflow);
router.get("/history", getHistory);

module.exports = router;
