const express = require("express");

const packController = require("../controllers/packController");

const router = express.Router();

router.post("/open/set/:setCode/type/:packType", packController.open);

module.exports = router;