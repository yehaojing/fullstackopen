const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SECRET } = require("../utils/config");
const User = require("../models/user");
const Session = require("../models/session");

router.post("/", async (request, response) => {
  const body = request.body;

  if (!body.username) {
    const err = new Error(`Username not provided`);
    err.name = "LoginError";
    throw err;
  }

  const user = await User.findOne({
    where: {
      username: body.username
    },
  });

  if (user.disabled) {
    const err = new Error("This user's access has been disabled.");
    err.name = "Unauthorised";
    throw err;
  }

  const passwordCorrect = await bcrypt.compare(
    body.password,
    user.passwordHash
  );

  if (!(user && passwordCorrect)) {
    const err = new Error(
      `User '${body.username}' not found/password is incorrect`
    );
    err.name = "LoginError";
    throw err;
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  const session = await Session.create({
    userId: user.id,
    loggedIn: true,
    token: token,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
