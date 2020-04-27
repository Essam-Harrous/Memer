const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    trim: true,
  },
  date: {
    type: Date,
  },
  memeId: {
    type: Schema.Types.ObjectId,
    ref: 'Meme',
    trim: true,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
