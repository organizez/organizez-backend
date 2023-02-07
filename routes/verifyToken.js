const jwt = require('jsonwebtoken');
let secret = 'orgDevHiddenKey';

module.exports = function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, secret, (err, decode) => {
      if(err) {
        res.sendStatus(401);
      }
      else {
        next();
      }
    })
  } else {
    res.sendStatus(401);
  }
}