const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memeSchema = new Schema({
  memeUrl: {
    type: String,
    trim: true,
    required: true,
  },
  templateId: {
    type: String,
    trim: true,
    default: '',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  disLikes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model('Meme', memeSchema);
