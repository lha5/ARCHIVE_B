require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  id: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String
  },
  connectedAt: {
    type: Date
  },
}, { timestamps: true });

userSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET_TOKEN);
  const tokenExpire = moment().add(12, 'hour').valueOf();

  user.token = token;

  user.save(function(err, user) {
    if (err) return cb(err);

    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    user.findOne({ '_id': decoded, 'token': token }, function (err, user) {
      if (err) {
        return cb(err);
      }

      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
