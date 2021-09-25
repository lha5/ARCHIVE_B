const { Comment } = require('../models/comment');
const { logger } = require('../configs/winston');

exports.createComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }
      return res.status(201).json({ success: true });
    });
  } catch (error) {
    logger.error('error occured in comment route - createComment :: \n', error);
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { _id, password } = req.body;

    await Comment.findOneAndDelete({ _id, password }, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: '댓글이 없거나 비밀번호가 다릅니다.' });
      }
      res.status(200).json({ success: true });
    });
  } catch (error) {
    logger.error('error occured in comment route - deleteComment :: \n', error);
    next(error);
  }
};
