const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userD');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    // Validate and hash the password here
    const saltRounds = 10; // You can adjust this number based on your preferences.

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, // Store the hashed password in the database
    });

    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // If the password matches, you can generate and send an authentication token (JWT) here for future requests.
    // For simplicity, you can respond with a success message.
    res.json({ message: 'Authentication successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = req.body.email; // Update the email field.
    user.username = req.body.username; // Update the username field.

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (user) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
