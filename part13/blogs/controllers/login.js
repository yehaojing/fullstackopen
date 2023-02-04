const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SECRET } = require("../utils/config");
const User = require("../models/user");

router.post("/", async (request, response) => {
  const body = request.body;

  if (!(body.username)) {
    const err = new Error(
      `Username not provided`
    );
    err.name = "LoginError";
    throw err;
  }

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash);

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

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
