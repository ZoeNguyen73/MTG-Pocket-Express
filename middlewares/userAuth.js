const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");

const userAuth = {
  isAuthenticated: async (req, res, next) => {
    try {
      const error = new Error();
      const authHeader = req.header("Authorization");

      if (!authHeader) {
        error.details = "Authentication details emmpty";
        error.statusCode = 401;
        throw error;
      }

      if (authHeader.slice(0,7) !== "Bearer ") {
        error.details = "Invalid Authentication type";
        error.statusCode = 401;
        throw error;
      }

      const token = authHeader.slice(7);
      if (token.length === 0) {
        error.details = "Invalid Authentication token";
        error.statusCode = 401;
        throw error;
      }
      
      const verified = jwt.verify(token, process.env.JWT_SECRET_ACCESS);

      if (verified) {
        const user = await UserModel.findOne({ username: verified.data.username });

        // error if cannot find matching user in current database
        if (!user) {
          error.details = "Unable to find matching user account matching authentication details";
          error.statusCode = 404;
          throw error;
        }

        req.authUser = verified.data;
        req.authUser.userID = user._id.toString();
        return next();
      }

    } catch (error) {
      next(error);
    }
  },

  isAuthorized: (...allowedRoles) => { 
    return async (req, res, next) => {
      try {
        const { username, roles, userID } = req.authUser;
        for (i in roles) {
          if (allowedRoles.includes(roles[i])) {
            return next();
          }
        }

        const route = req.baseUrl.split('/').pop();

        const usersAuth = () => {
          if (username === req.params.username) {
            return next();
          }
          const error = new Error();
          error.statusCode = 403;
          throw error;
        };

        switch (route) {
          case "users":
            usersAuth();
            break;
          default:
            const error = new Error();
            error.statusCode = 403;
            throw error;
        }

      } catch (error) {
        next(error);
      }
    }
  },
};

module.exports = userAuth;