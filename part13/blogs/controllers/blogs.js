const router = require("express").Router();

const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (req.blog) {
    next();
  } else {
    const err = new Error(`Blog with id '${req.params.id}' not found.`)
    err.name = "BlogNotFound"
    throw err
  }

};

router.get("/:id", blogFinder, async (req, res) => {
  console.log(req.blog.toJSON());
  res.json(req.blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.json(req.blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = ++req.blog.likes
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router;