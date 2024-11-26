const express = require("express");

const packController = require("../controllers/packController");

const router = express.Router();

router.post("/open/:setCode", packController.open);

module.exports = router;