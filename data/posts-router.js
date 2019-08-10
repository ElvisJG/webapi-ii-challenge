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

// POST /api/posts
router.post('/', async (req, res) => {
  try {
    const { title, contents } = req.body;
    const post = await Posts.insert(req.body);

    !title || !contents
      ? res.status(400).json({
          errorMessage: 'Please provide title and contents for the the post.'
        })
      : res.status(201).json(post);
  } catch (error) {
    // Log error
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the post to the database.'
    });
  }
});

// POST /api/posts/{id}/comments
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Posts.insertComment(req.body);
    if (!id) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    } else if (text.length === 0) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide text for the comment.' });
    } else {
      res.status(201).json(comment);
    }
  } catch (error) {
    // Log error
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the comment to the database.'
    });
  }
});

//DELETE /api/posts:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const delPost = await Posts.remove(req.params.id);

    !id
      ? res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' })
      : res.status(200).json(delPost);
  } catch (error) {
    // Log error
    console.log(error);
    res.status(500).json({
      error: 'The post could not be removed.'
    });
  }
});

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, contents } = req.body;
    const post = await Posts.update(req.params.id, req.body);

    if (!id) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
    !title || !contents
      ? res.status(400).json({
          errorMessage: 'Please provide title and contents for the the post.'
        })
      : res.status(200).json(post);
  } catch (error) {
    // Log error
    console.log(error);
    res.status(500).json({
      error: 'The post information could not be modified'
    });
  }
});

module.exports = router;
