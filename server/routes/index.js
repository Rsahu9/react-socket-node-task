const express = require("express");
const bodyParser = require('body-parser');
const Chat = require('../model/chat');
const User = require('../model/user');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.post("/signup", async (req, res) => {
  try {

    const user = await new User(req.body);
    user.save();
    res.send({ success: true, username: user.username });
  } catch(e) {

    console.log('Signup error', e);
    res.send({ success: false, error: 'Something went wrong' })
  }
});

router.post("/login", async (req, res) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({ success: true, username: user.username });
    } else {
      res.send({ success: false, error: 'No user was found' });
    }
  } catch(e) {

    console.log('Login error', e);
    res.send({ success: false, error: 'Something went wrong' });
  }
});

router.get("/chats", async (req, res) => {
  const chats = await Chat.find();
  res.send(chats).status(200);
});

module.exports = router;