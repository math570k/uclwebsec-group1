module.exports = {
  hash: function (password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        return hash;
      });
    });
  },
  check: function (plain, hash) {
    bcrypt.compare(plain, hash, function (err, result) {
      if (result) {
        return true;
      }
      return false;
    });
  },
};
