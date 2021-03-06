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
  memeId: {
    type: Schema.Types.ObjectId,
    ref: 'Meme',
    trim: true,
  },
  type: {
    type: String,
  },
});

module.exports =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema);
