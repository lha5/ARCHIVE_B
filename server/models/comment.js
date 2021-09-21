const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    comment: {
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

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
