import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden if invalid
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

export default authenticateJWT;
