const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  try {
    res.status(200).json({});
  } catch (error) {
    console.error('error occured in user route - auth :: \n', error);
    next(error);
  }
}

exports.signup = async (req, res, next) => {
  try {
  } catch (error) {
    console.error('error occured in user route - signup :: \n', error);
    next(error);
  }
}
