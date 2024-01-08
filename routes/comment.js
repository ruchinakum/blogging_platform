const express = require('express');
const router = express.Router();
const Comment = require('../models/commentD');
const blogpostD = require('../models/blogpostD');

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const comment = new Comment({
    commenterName: req.body.commenterName,
    commentText: req.body.commentText,
    blogPost: req.body.blogPost, // Assuming you provide the blog post's ObjectId
  });

  try {
    const newComment = await comment.save();

    // Now, update the corresponding blog post's comments array
    const blogPostId = req.body.blogPost; // Assuming you receive the blog post's ID
    const blogPost = await blogpostD.findById(blogPostId);

    if (!blogPost) {
      return res.status(404).json({ message: 'BlogPost not found' });
    }

    // Add the comment's ID to the blog post's comments array
    blogPost.comments.push(newComment._id);
    
    await blogPost.save(); // Save the updated blog post

    res.json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//   const comment = new Comment({
//     commenterName: req.body.commenterName,
//     commentText: req.body.commentText,
//     blogPost: req.body.blogPost, // Assuming you provide the blog post's ObjectId
//   });

//   try {
//     const newComment = await comment.save();
//     res.json(newComment);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/create', async (req, res) => {
//   const comment = new Comment({
//     commenterName: req.body.commenterName,
//     commentText: req.body.commentText,
//     blogPost: req.body.blogPost,
//   });

//   try {
//     const newComment = await comment.save();
    
//     // Now, update the corresponding blog post's comments array
//     const blogPostId = req.body.blogPost; // This is the blog post's ID

//     // Update the blog post's comments array directly with the new comment's ID
//     const updatedBlogPost = await BlogPost.findByIdAndUpdate(
//       blogPostId,
//       { $push: { comments: newComment._id } },
//       { new: true }
//     );

//     if (!updatedBlogPost) {
//       return res.status(404).json({ message: 'BlogPost not found' });
//     }

//     res.json(newComment);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.patch('/:id', async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedComment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndRemove(req.params.id);
      if (deletedComment) {
        res.json({ message: 'Comment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;