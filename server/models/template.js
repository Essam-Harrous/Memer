const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  templateUrl: {
    type: String,
    trim: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model('Template', templateSchema);
