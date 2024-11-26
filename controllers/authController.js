const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/userModel");
const UserValidator = require("../validations/userValidation");
const RefreshTokenModel = require("../models/refreshTokenModel");

const createAccessToken = (username) => {
  const accessToken = jwt.sign(
    {
      // accessToken expiring in 15 minutes
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
      data: { username },
    },
    process.env.JWT_SECRET_ACCESS
  );

  return accessToken;
};

const controller = {
  register: async (req, res, next) => {
    let validatedResults = null;
    let user = null;

    try {
      validatedResults = await UserValidator.register.validateAsync(req.body);

      // check if there is an existing account with the same email
      user = await UserModel.findOne({
        email: validatedResults.email,
      });
      if (user) {
        const error = new Error();
        error.details = "An account with this email already exists";
        error.statusCode = 400;
        throw error;
      }

      // check if there is an existing account with the same username
      user = await UserModel.findOne({
        username: validatedResults.username,
      });
      if (user) {
        const error = new Error();
        error.details = "An account with this username already exists";
        error.statusCode = 400;
        throw error;
      }

      const hash = await bcrypt.hash(validatedResults.hash, 10);
      const { email, username } = validatedResults;

      // generate activation token
      const activateToken = jwt.sign(
        {
          // activateToken expiring in 15 minutes
          exp: Math.floor(Date.now() / 1000) + 60 * 15,
          data: { email, username, hash },
        },
        process.env.JWT_SECRET_ACTIVATE
      );

      return res.json({ activateToken });

    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
        error.details = "Invalid input due to error: " + error.message;
      }
      next(error);
    }
  },

  login: async (req, res, next) => {
    let validatedResults = null;
    try {
      validatedResults = await UserValidator.login.validateAsync(req.body);
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }

    const errMsg = "Incorrect username or password";
    let user = null;

    try {
      user = await UserModel.findOne({ username: validatedResults. username});
      if (!user) {
        const error = new Error();
        error.statusCode = 404;
        error.details = errMsg;
        throw error;
      }

      const isPasswordCorrect = await bcrypt.compare(
        validatedResults.hash,
        user.hash
      );

      if (!isPasswordCorrect) {
        const error = new Error();
        error.statusCode = 401;
        error.details = errMsg;
        throw error;
      }

      const username = user.username;

      const accessToken = createAccessToken(username);

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

      return res.json({ avatar: user.avatar, accessToken, refreshToken });

    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.details = "Failed to get user";
      }
      next(error);
    }
  },

  refresh: async (req, res, next) => {

  },

  logout: async (req, res, next) => {

  },
};

module.exports = controller;