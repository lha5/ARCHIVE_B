const express = require('express');
const router = express.Router();
const postController = require('../controller/post');

// ------------------------
//          Post
// ------------------------

router.post('/', postController.createPost);

router.get('/', postController.getAllPosts);

router.delete('/:id', postController.deletePost);

module.exports = router;
