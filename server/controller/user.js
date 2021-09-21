const { User } = require('../models/user');
const { logger } = require('../configs/winston');

exports.auth = async (req, res, next) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      id: req.user.id,
      name: req.user.name,
      isAuth: true,
      isAdmin: req.user.role === 0 ? false : true,
    });
  } catch (error) {
    logger.error(`error occured in user route - auth \n ${error}`);
    next(error);
  }
}

exports.signup = async (req, res, next) => {
  try {
    const { name, id, password, role } = req.body;

    const newUser = new User({
      name,
      id,
      password,
      role,
    });

    newUser.save((err, doc) => {
      if (err) {
        logger.error(`create user is failed. \n ${err}`);
        return res.json({ success: false, result: err });
      }

      logger.info(`success to sign up with id - ${id}`);
      return res.status(200).json({ success: true });
    });
  } catch (error) {
    logger.error(`error occured in user route - signup \n ${error}`);
    next(error);
  }
}

exports.signin = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    User.findOne({ id }, (err, user) => {
      if (!user) {
        logger.error(`cannot find id - ${id}`);
        return res.status(400).json({
          success: false,
          message: 'Auth failed, id is not founded.',
        });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          logger.error(`password is not match.`);
          return res.status(400).json({
            success: false,
            message: 'Wrong password',
          });
        }

        user.generateToken((err, user) => {
          if (err) {
            logger.error(`generate token is failed for ${err}`)
            return res.status(500).send(err);
          }

          logger.info(`success to sign in with id - ${id}`);
          res.status(200).json({
            success: true,
            token: user.token,
          });
        });
      });
    });
  } catch (error) {
    logger.error(`error occured in user route - signin \n ${error}`);
    next(error);
  }
}

exports.logout = async (req, res, next) => {
  try {
    const id = req.params.id;
    User.findOneAndUpdate({ id }, { token: '' }, (err, doc) => {
      if (err) {
        logger.error(`failed to logout with id ${id} \n ${err}`);
        return res.json({ success: false, result: err });
      }

      logger.info(`success to logout with id ${id}`);
      return res.status(200).send({
        success: true,
      });
    });
  } catch (error) {
    logger.error(`error occured in user route - logout \n ${error}`);
    next(error);
  }
}
