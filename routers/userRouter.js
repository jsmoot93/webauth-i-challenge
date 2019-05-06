const router = require("express").Router();
const db = require("../data/helpers/user-model.js");
const restricted = require("./restricted-middleware.js");

router.get("/", restricted, async (req, res) => {
  try {
    const users = await db.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: `Users could not be found ${error}.` });
  }
});

module.exports = router;