const express = require("express");
const router = express.Router();
const db = require("../db");
const authorize = require("../middleware/authorize");

//Get all comments for image
router.get("/:image_id", authorize, (req, res) => {
  const { image_id } = req.params;
  const sql =
    "SELECT * FROM comment INNER JOIN user ON user.user_id = comment.user_id WHERE image_id = ?";
  db.query(sql, [image_id], (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Save comment on a specific image - TODO: finish (currently the comment component is hardcoded to pass an image id of 1)
router.post("/:image_id", authorize, (req, res) => {
  const { image_id } = req.params;
  const text = req.body.comment;

  const sql = "INSERT INTO comment(user_id, image_id, text) VALUES(?, ?, ?)";
  db.query(sql, [req.decoded.id, image_id, text], function (err, result) {
    if (err) return res.status(400).json(err);
    return res.end();
  });
});

module.exports = router;
