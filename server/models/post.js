const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
    },
    content_value: {
      type: String,
    },
    is_collapse: {
      type: Boolean,
      default: false,
    },
    is_secret: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
