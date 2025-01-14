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
router.put("/:username/cards/favourites/add/:id",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.addFavouriteUserCard
);
router.put("/:username/cards/favourites/remove/:id",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.removeFavouriteUserCard
);
router.get("/:username/cards/favourites",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.getFavouriteUserCards
);
router.get("/:username/cards",
  userAuth.isAuthenticated,
  userAuth.isAuthorized("Admin"),
  userController.getUserCardsByUsername
);

module.exports = router;