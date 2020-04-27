const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    index: true,
  },
  memes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meme',
    },
  ],
  templates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Template',
    },
  ],
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notification',
    },
  ],
  role: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
