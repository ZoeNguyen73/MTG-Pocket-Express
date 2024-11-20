const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");
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
      const { username } = user;
      const accessToken = jwt.sign(
        {
          // accessToken expiring in 15 minutes
          exp: Math.floor(Date.now() / 1000) + 60 * 15,
          data: { username },
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
};

module.exports = controller;