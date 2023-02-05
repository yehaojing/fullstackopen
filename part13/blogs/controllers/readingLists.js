const router = require("express").Router();

const { ReadingList } = require("../models");
const tokenExtractor = require("../middleware/tokenExtractor");

router.post("/", async (req, res) => {
  const { blogId, userId } = req.body;

  const readingListEntry = await ReadingList.create({
    blogId,
    userId,
  });

  res.json(readingListEntry);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  // you can also treat :id as the id for the blog entry
  const userId = req.decodedToken.id;
  const readingListEntryId = req.params.id;

  const readingListEntry = await ReadingList.findByPk(readingListEntryId);

  if (readingListEntry) {
    if (readingListEntry.userId === userId) {
      readingListEntry.read = true;
      readingListEntry.save();
      res.json({ read: true });
    } else {
      const err = new Error(`Unauthorised marking of reading list entry.`);
      err.name = "Unauthorised";
      throw err;
    }
  } else {
    const err = new Error(
      `Reading list entry with id '${readingListEntryId}' not found.`
    );
    err.name = "BlogNotFound";
    throw err;
  }
});

module.exports = router;
