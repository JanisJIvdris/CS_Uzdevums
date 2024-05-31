const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};

module.exports = { authenticateJWT, authorizeRole };
