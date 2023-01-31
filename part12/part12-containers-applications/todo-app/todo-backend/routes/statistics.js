const express = require("express");
const router = express.Router();
const redis = require("../redis");

router.get("/", async (_, res) => {
  const todoCounter = await redis.getAsync("todoCounter");
  const todoCounterInt = !todoCounter ? 0 : parseInt(todoCounter)
  await res.send({
    added_todos: todoCounterInt
  })
});

module.exports = router;