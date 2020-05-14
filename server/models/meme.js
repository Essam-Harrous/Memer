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
  peopleLikes: [
    {
      type: Schema.Types.ObjectId,
      trim: true,
    },
  ],
  peopleDisLikes: [
    {
      type: Schema.Types.ObjectId,
      trim: true,
    },
  ],
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
