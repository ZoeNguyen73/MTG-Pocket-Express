const express = require("express");

const setController = require("../controllers/setController");

const router = express.Router();

router.get("/:setCode", setController.retrieveBySetCode);

module.exports = router;