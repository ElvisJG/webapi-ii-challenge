const express = require('express');

const Posts = require('./db.js');
const router = express.Router();

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // Log error
    console.log(error);
    res.status(500).json({
      error: 'The posts information could not be retrieved.'
    });
  }
});

// GET /api/posts/{id}
router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    post
      ? res.status(200).json(post)
      : res.status(404).json({ message: 'Post not found' });
  } catch (error) {
    // Log error
    console.log(error);
    res.status(500).json({
      error: 'The post with the specified ID does not exist.'
    });
  }
});

// GET /api/posts/{id}/comments
router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Posts.findCommentById(id);

    comments
      ? res.status(200).json(comments)
      : res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
  } catch (error) {
    // Log error
    console.log(error);
    res.status(500).json({
      error: 'The comments information could not be retrieved.'
    });
  }
});

module.exports = router;
