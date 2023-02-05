const tokenExtractor = require("../middleware/tokenExtractor");
const router = require("express").Router();

const Session = require("../models/session");

router.delete("/", tokenExtractor, async (request, response) => {
  const session = await Session.findAll({
    where: {
      token: request.get("authorization").substring(7),
    },
  });

  if (session) {
    session.loggedIn = false;
    await session.save();
  }

  response.status(200).json({ message: "Logged out." });
});

module.exports = router;
