const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  username: String,
  text: String,
  attachment: String,
  fileType: String,
  created_At: {
    type: Date,
    default: new Date()
  }
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;