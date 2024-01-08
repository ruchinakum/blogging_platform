const mongoose = require('mongoose');
const User = require('./models/userD');
const BlogPost = require('./models/blogpostD');
const Comment = require('./models/commentD');

// Connect to your MongoDB database (make sure your MongoDB server is running)
mongoose.connect('mongodb://localhost:27017/blogpostDB', { useNewUrlParser: true });

const sampleUser = new User({
  username: 'nagmapatel',
  email: 'nagma@example.com',
  password: 'nagma23', // Hashed password
});

const sampleBlogPost = new BlogPost({
  title: 'Happy Navratri',  
  content: 'This is just a sample post content.',
  author: sampleUser,
});

const sampleComment = new Comment({
  commenterName: 'Ruchi Nakum',
  commentText: 'This is a good day.',
  blogPost: sampleBlogPost,
});

// Save the sample data to the database
sampleUser.save();
sampleBlogPost.save();
sampleComment.save();

// // Disconnect from the database when done
// mongoose.disconnect();
