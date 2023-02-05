const { SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Session = require("../models/session");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);

    const user = await User.findByPk(req.decodedToken.id);
    const sessions = await Session.findAll({
      where: {
        token: req.get("authorization").substring(7),
      },
      loggedIn: true,
    });

    if (user.disabled) {
      if (sessions) {
        sessions.map(async (session) => {
          session.loggedIn = false;
          await session.save();
        })
      }

      const err = new Error("This user's access has been disabled.");
      err.name = "Unauthorised";
      throw err;
    } else if (!sessions) {
      const err = new Error("This user has already logged out.");
      err.name = "Unauthorised";
      throw err;
    }
  } else {
    const err = new Error("Missing token.");
    err.name = "Unauthorised";
    throw err;
  }
  next();
};

module.exports = tokenExtractor;
