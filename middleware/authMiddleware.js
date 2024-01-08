const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  // Check if a token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token using your secret key
    const user = jwt.verify(token, 'Surendra@23');
    req.user = user; // Attach the user object to the request
    next(); // Continue to the protected route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
