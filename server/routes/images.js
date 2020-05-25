const express = require("express");
const router = express.Router();
const db = require("../db");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/upload");

// Get a feed for a user
router.get("/feed", authorize, (req, res) => {
  const sql =
    "SELECT * FROM images INNER JOIN shared_images ON images.image_id = shared_images.image_id WHERE shared_images.user_id = ?";
  db.query(sql, [req.decoded.id], (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Upload an image
router.post("/upload", authorize, function (req, res) {
  upload(req, res, function (err) {
    const filepath = req.file.path.replace("public", "");

    if (!err) {
      const sql = "INSERT INTO images(user_id, path) VALUES(?, ?)";
      db.query(sql, [req.decoded.id, filepath], (err, rows, fields) => {
        if (!err) return res.status(200).json({ imageId: rows.insertId });
        else console.log(err);
      });
    } else {
      return res.send(200).end();
    }
  });
});

// Get all images for the current user
router.get("/user", authorize, function (req, res) {
  const sql = "SELECT * FROM images WHERE user_id = ?";
  db.query(sql, [req.decoded.id], (err, rows) => {
    if (!err) return res.send(rows);
    else console.log(err);
  });
});

// Get a single image
router.get("/:id", authorize, function (req, res) {
  const sql =
    "SELECT * FROM images INNER JOIN user ON images.user_id = user.user_id WHERE image_id = ?";
  db.query(sql, [req.params.id], (err, rows) => {
    if (!err) return res.send(rows[0]);
    else console.log(err);
  });
});

// Get users image has been shared with
router.get("/shared/:image_id", authorize, function (req, res) {
  const sql =
    "SELECT user.name, user.user_id FROM shared_images INNER JOIN user on shared_images.user_id = user.user_id WHERE shared_images.image_id = ?";
  db.query(sql, [req.params.image_id], (err, rows) => {
    if (!err) return res.send(rows);
    else console.log(err);
  });
});

// Save a list of users that has been shared an image
router.post("/shared/:image_id", authorize, function (req, res) {
  const userIds = req.body.userIds;
  if (userIds.length) {
    db.query("DELETE FROM shared_images WHERE image_id = ?", [
      req.params.image_id,
    ]);

    const final = [];
    userIds.forEach((userId) => {
      var arr = [];
      arr.push(req.params.image_id);
      arr.push(userId);
      final.push(arr);
    });

    const sql = "INSERT into shared_images (image_id, user_id) VALUES ?";
    db.query(sql, [final], (err, rows) => {
      if (!err) return res.end();
      else console.log(err);
    });
  }
});

module.exports = router;
