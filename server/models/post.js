const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postSchema = Schema(
  {
    name: {
      type: Strng,
    },
    password: {
      type: Strng,
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

postSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
