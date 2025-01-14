const express = require("express");

const userController = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();
router.post("/:token/activate", userController.activateAccount);
router.put("/:username",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.updateByUsername
);
router.get("/:username/cards",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.getUserCardsByUsername
);
router.post("/:username/cards/favourites/add/:id",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.addFavouriteUserCard
);
router.post("/:username/cards/favourites/remove/:id",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.removeFavouriteUserCard
);
router.get("/:username/cards/favourites",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.getFavouriteUserCards
);

module.exports = router;