const jwt = require('jsonwebtoken');
const jwtdecode = require('jwt-decode');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }


      const decoded = jwtdecode(token);
      req.user = decoded
      next();   
}
