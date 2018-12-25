const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  username: String,
  text: String,
  attachment: String,
  fileType: String,
  emoji: Array,
  created_At: {
    type: Date,
    default: new Date()
  }
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;