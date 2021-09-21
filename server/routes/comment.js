const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment');

// ------------------------
//        Comment
// ------------------------

router.post('/', commentController.createComment);

router.delete('/', commentController.deleteComment);

module.exports = router;
