const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../data/helpers/user-model.js");

router.post("/register", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: "Please enter valid credentials." });
  } else {
    const hash = bcrypt.hashSync(password, 8);
    password = hash;
    try {
      const newUser = await db.create({ username, password });
      if (newUser) {
        res.status(201).json(newUser);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your user could not be created ${error}.` });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: "Please enter valid credentials." });
  } else {
    try {
      const user = await db.findByUser(username);
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userID = user.id;
        res.status(201).json({ message: `Welcome ${username}!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    } catch (error) {
      res.status(500).json({ message: `Login failed ${error}.` });
    }
  }
});

router.get("/logout", (req, res) => {
  if (req.session && req.session.userID) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "You can never leave" });
      } else {
        res.status(200).json({ message: "Bye" });
      }
    });
  }
});

module.exports = router;