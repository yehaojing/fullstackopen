const express = require("express");
const router = express.Router();
const redis = require("../redis");

router.get("/", async (_, res) => {
  const todoCounter = await redis.getAsync("todoCounter");
  await res.send({
    added_todos: parseInt(todoCounter)
  })
});

module.exports = router;