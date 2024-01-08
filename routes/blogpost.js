const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogpostD');
const Comment = require('../models/commentD');

router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    res.json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const blogPost = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author, // Assuming you provide the user's ObjectId
    tags: req.body.tags, 
  });

  try {
    const newBlogPost = await blogPost.save();
    res.json(newBlogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
    try {
      const blogPost = await BlogPost.findById(req.params.id);
      if (!blogPost) {
        return res.status(404).json({ message: 'BlogPost not found' });
      }
  
      blogPost.title = req.body.title;
      blogPost.content = req.body.content;
      blogPost.tags = req.body.tags;
  
      const updatedBlogPost = await blogPost.save();
      res.json(updatedBlogPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

router.delete('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndRemove(req.params.id);
    if (blogPost) {
      res.json({ message: 'BlogPost deleted successfully' });
    } else {
      res.status(404).json({ message: 'BlogPost not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New route for retrieving comments for a specific blog post
router.get('/:id/comments', async (req, res) => {
    try {
      const comments = await Comment.find({ blogPost: req.params.id });
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
