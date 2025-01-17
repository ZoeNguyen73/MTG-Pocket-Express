const express = require("express");

const userCardController = require("../controllers/userCardController");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();

router.get("/:id", userCardController.retrieveById);

module.exports = router;