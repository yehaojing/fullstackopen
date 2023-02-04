const router = require("express").Router();
const tokenExtractor = require("../middleware/tokenExtractor");

const { Blog, User } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const where = {};

  const search = req.query.search
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { author: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username"],
    },
    where,
  });
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });
  res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (req.blog) {
    next();
  } else {
    const err = new Error(`Blog with id '${req.params.id}' not found.`);
    err.name = "BlogNotFound";
    throw err;
  }
};

router.get("/:id", blogFinder, async (req, res) => {
  console.log(req.blog.toJSON());
  res.json(req.blog);
});

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user.id === req.blog.userId) {
    await req.blog.destroy();
    res.json(req.blog);
  } else {
    const err = new Error(`Unauthorised deletion of blog.`);
    err.name = "Unauthorised";
    throw err;
  }
});

router.put("/:id", blogFinder, async (req, res) => {
  req.blog.likes = ++req.blog.likes;
  await req.blog.save();
  res.json(req.blog);
});

module.exports = router;
