const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();
router.post("/:token/activate", userController.activateAccount);
router.put("/:username",
  userController.updateByUsername
);

module.exports = router;