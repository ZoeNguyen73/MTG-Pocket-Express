const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");
const UserCardModel = require("../models/userCardModel");
const UserValidator = require("../validations/userValidation");
const RefreshTokenModel = require("../models/refreshTokenModel");

const controller = {
  activateAccount: async (req, res, next) => {
    const { token } = req.params;
    const verified = jwt.verify(token, process.env.JWT_SECRET_ACTIVATE);

    if (!verified) {
      const error = new Error();
      error.details = "Activation link expired";
      throw error;
    }

    try {
      const user = await UserModel.create(verified.data);

      // auto initiate login
      const { username, roles } = user;
      const accessToken = jwt.sign(
        {
          // accessToken expiring in 15 minutes
          exp: Math.floor(Date.now() / 1000) + 60 * 15,
          data: { username, roles },
        },
        process.env.JWT_SECRET_ACCESS
      );
      const refreshToken = jwt.sign(
        {
          // refresh token expiring in 1 day
          exp: Math.floor(Date.now()/1000 + 60 * 60 * 24),
          data: { username },
        },
        process.env.JWT_SECRET_REFRESH
      );

      // store refresh token in database
      await RefreshTokenModel.create({ token: refreshToken });
      
      return res.json({ user, accessToken, refreshToken });

    } catch (error) {
      next(error);
    }
  },

  updateByUsername: async (req, res, next) => {
    try {
      await UserValidator.update.validateAsync(req.body);
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }

    try {
      const user = await UserModel.findOne({ username: req.params.username });
      if (!user) {
        const error = new Error();
        error.statusCode = 404;
        throw error;
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { username: req.params.username },
        {
          username: req.body.username || req.params.username, 
          email: req.body.email || user.email,
          avatar: req.body.avatar || user.avatar, 
        },
        { new: true, select: "_id username email avatar"},
      );

      return res.status(201).json(updatedUser);
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }
  },

  getUserCardsByUsername: async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ username: req.params.username });
      if (!user) {
        const error = new Error();
        error.statusCode = 404;
        throw error;
      }

      const userCards = await UserCardModel.find({ user_id: user._id })
        .populate({
          path: "card_id",
          populate : {
            path: "set_id",
            select: "_id code name icon_svg_uri"
          }   
        })
        .lean();

      for (const card of userCards) {
        let price_code = "usd";
        if (card.finish === "foil") {
          price_code = "usd_foil";
        } else if (card.finish === "etched") {
          price_code = "usd_etched";
        }
        card.final_price = card.card_id.prices[price_code];
      }

      const data = { count: userCards.length, user_cards: userCards };
      return res.status(200).json(data);

    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.details = "Error retrieving user cards data " + error.message;
      }
      next(error);
    }
  },
};

module.exports = controller;