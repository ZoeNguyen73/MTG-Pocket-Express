const express = require("express");

const packController = require("../controllers/packController");

const userAuth = require("../middlewares/userAuth");

const router = express.Router();

router.post(
  "/open/set/:setCode/type/:packType",
  userAuth.isOptionalAuthenticated, 
  packController.open
);

module.exports = router;