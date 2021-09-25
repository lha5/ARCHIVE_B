const { Post } = require('../models/post');
const { Comment } = require('../models/comment');
const { logger } = require('../configs/winston');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pictures');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});

let upload = multer({ storage }).single('image');

exports.uploadImageFile = (req, res, next) => {
  try {
    upload(req, res, err => {
      if (err) {
        logger.error(`error occured in post route - uploadImageFile :: \n ${err}`);
      }
      return res.status(200).json({ success: true, result: res.req.file });
    });
  } catch (error) {
    logger.error('error occured in post route - uploadImageFile :: \n', error);
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const dataGotten = req.body;

    const newPost = new Post(dataGotten);
    await newPost.save((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }
      return res.status(201).json({ success: true });
    });
  } catch (error) {
    logger.error('error occured in post route - createPost :: \n', error);
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    await Post
      .find()
      .sort({ updatedAt: -1 })
      .select('name type content_value is_collapse is_secret')
      .then(async (posts) => {
        if (posts && posts.length > 0) {
          const postList = [];
          for (let i = 0; i < posts.length; i++) {
            const obj = { ...posts[i] };
            await Comment.find({ _id: obj._id })
              .sort({ updatedAt: -1 })
              .select('post_id name comment is_collapse is_secret')
              .then(val => {
                if (val && val.length > 0) {
                  obj.comments = val;
                }
              });
            postList.push(obj);
          }
        }

        return res.status(200).json({ success: true, result: postList });
      });
  } catch (error) {
    logger.error('error occured in post route - getAllPosts :: \n', error);
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { _id, password } = req.body;

    await Post.findOneAndDelete({ _id, password }, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: '게시글이 없거나 비밀번호가 다릅니다.' });
      }
      res.status(200).json({ success: true });
    });
  } catch (error) {
    logger.error('error occured in post route - deletePost :: \n', error);
    next(error);
  }
};
