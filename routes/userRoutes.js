const express = require("express");

const userController = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();
router.post("/:token/activate", userController.activateAccount);
router.put("/:username",
  userAuth.isAuthenticated,
  userAuth.isAuthorized,
  userController.updateByUsername
);

module.exports = router;