const router = require("express").Router();

const { ReadingList } = require("../models");

router.post("/", async (req, res) => {
  const { blogId, userId } = req.body;

  const readingListEntry = await ReadingList.create({
    blogId,
    userId,
  });

  res.json(readingListEntry);
});

module.exports = router;
