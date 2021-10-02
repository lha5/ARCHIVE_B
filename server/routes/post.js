const express = require('express');
const router = express.Router();
const postController = require('../controller/post');

// ------------------------
//          Post
// ------------------------

router.post('/', postController.createPost);

router.post('/upload-image', postController.uploadImageFile);

router.get('/', postController.getAllPosts);

router.delete('/', postController.deletePost);

module.exports = router;
