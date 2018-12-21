const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number
});

const Attachment = mongoose.model('attachment', attachmentSchema);

module.exports = Attachment;