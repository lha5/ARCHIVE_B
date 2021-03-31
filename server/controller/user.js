const userModel = require('../models/index').user;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  try {
    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      isAuth: true,
      isAdmin: req.user.admin === 0 ? false : true,
      provider: req.user.provider,
      providerId: req.user.provider_id,
    });
  } catch (error) {
    console.error('error occured in user route - auth :: \n', error);
    next(error);
  }
}

exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    let password = req.body.password;

    const isExist = await userModel.findOne({ where: { email } });

    if (isExist) {
      res.status(400).json({ success: false });
    } else {
      if (password) {
        password = await bcrypt.hash(password, saltRounds);
      }
  
      await userModel.create({ ...req.body, password });
      
      res.status(201).json({ success: true });
    }  
  } catch (error) {
    console.error('error occured in user route - signup :: \n', error);
    next(error);
  }
}
