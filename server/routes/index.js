const express = require("express"),
      bodyParser = require('body-parser'),
      Chat = require('../model/chat'),
      User = require('../model/user'),
      router = express.Router(),
      Attachment = require('../model/attachment'),
      upload = require('../multer');

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

router.post('/item/upload', upload.single('attachment'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  const attachment = new Attachment(file);
  attachment.save();

  const chat = new Chat({
    username: req.body.username,
    attachment: file.path,
    fileType: file.mimetype.split('/')[0], 
  })
  chat.save();

  const io = req.app.get('socketio');
  io.of('/chat').emit('message', chat);

  res.send({ success: true })  
})

router.get("/chats", async (req, res) => {
  const chats = await Chat.find();
  res.send(chats).status(200);
});

module.exports = router;