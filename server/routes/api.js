var express = require("express");
var router = express.Router();
var db = require("../db");

/* GET home page. */
router.get("/sample", (req, res) => {
  db.query(`select * from sample`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

module.exports = router;
