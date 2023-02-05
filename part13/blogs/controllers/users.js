const bcrypt = require("bcrypt");

const router = require("express").Router();

const { Blog, User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    throw {
      name: "ValidationError",
      message:
        "User validation failed: password is shorter than the minimum allowed length (3).",
    };
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    username,
    name,
    passwordHash,
  });
  res.json(user);
});

const userFinder = async (req, res, next) => {
  const where = req.query.read
    ? {
        "$blogs.readingList.read$": JSON.parse(req.query.read),
      }
    : {};
  req.user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      attributes: ["id", "url", "title", "author", "likes", "year_written"],
      where,
      through: { attributes: ["id", "read"] },
    },
  });
  if (req.user) {
    next();
  } else {
    const err = new Error(`User with id '${req.params.id}' not found.`);
    err.name = "UserNotFound";
    throw err;
  }
};

router.get("/:id", userFinder, async (req, res) => {
  res.json({
    name: req.user.name,
    username: req.user.username,
    readings: req.user.blogs,
  });
});

router.put("/:username", async (req, res) => {
  req.user = await User.findOne({ where: { username: req.params.username } });
  if (req.user) {
    req.user.username = req.body.username;
    await req.user.save();
    res.json(req.user);
  } else {
    const err = new Error(
      `User with username '${req.params.username}' not found.`
    );
    err.name = "UserNotFound";
    throw err;
  }
});

module.exports = router;
