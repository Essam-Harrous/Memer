const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adSchema = new Schema({
  header: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
  },
  content: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Ad', adSchema);
