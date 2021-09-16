const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = Schema(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    name: {
      type: Strng,
    },
    password: {
      type: Strng,
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

commentSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Post = mongoose.model('Post', commentSchema);

module.exports = { Post };
