const express = require("express");
const router = express.Router();
const db = require("../db");
const authorize = require("../middleware/authorize");

//Get all users
router.get("/", authorize, (req, res) => {
  db.query("SELECT * FROM user", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get all friends for CURRENT user
router.get("/friends/", authorize, (req, res) => {
  const sql =
    "SELECT * FROM user INNER JOIN friend ON user.user_id = friend.friend_user_id WHERE friend.user_id = ?";
  db.query(sql, [req.decoded.id], (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Removes friend from current user
router.delete("/friends/:friend_id", authorize, (req, res) => {
  const { friend_id } = req.params;

  const sql = "DELETE FROM friend WHERE user_id = ? AND friend_user_id = ?";
  db.query(sql, [req.decoded.id, friend_id], function (err, result) {
    if (err) return res.status(400).json(err);
    return res.status(201).json({
      message: `You removed a friend!`,
    });
  });
});

//Adds user to the CURRENT user by id
router.post("/friends/:friend_id", authorize, (req, res) => {
  const { friend_id } = req.params;

  const sql = "INSERT INTO friend(user_id, friend_user_id) VALUES(?, ?)";
  db.query(sql, [req.decoded.id, friend_id], function (err, result) {
    if (err) return res.status(400).json(err);
    return res.status(201).json({
      message: `You added a new friend!`,
    });
  });
});

module.exports = router;
