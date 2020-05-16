const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  var token = req.body.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send(err);
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    res.status(403).json({ error: "Token not provided." });
  }
};
