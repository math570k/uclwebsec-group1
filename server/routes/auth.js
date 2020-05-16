const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* =========================================
    SIGNUP USER
========================================= */
router.post("/signup", function (req, res) {
  const { name, email, password } = req.body;

  // Check if email is in correct format
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "The entered email is not valid!" });
  }

  // Create hashed password
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        return res.status(500).json({ error: "Error creating hash!" });
      }

      // Create user
      const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(sql, [name, email, hash], function (err, result) {
        if (err) return res.status(400).json(err);
        return res.status(201).json({
          message: `User ${name} has been created! You can now login.`,
        });
      });
    });
  });
});

/* =========================================
    LOGIN USER
========================================= */
router.post("/signin", function (req, res) {
  // Find user by email
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, email, function (err, sqlResult) {
    if (err) return res.status(404).json(err);

    // Found user
    const dbUser = sqlResult[0];
    if (dbUser) {
      // Compare passwords with bcrypt
      bcrypt.compare(password, dbUser.password, function (err, bcryptResult) {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        // Create a token if the user was found
        const token = jwt.sign(
          { id: dbUser.id, name: dbUser.name, email: dbUser.email },
          process.env.SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.status(201).json({
          message: "User " + dbUser.name + " logged in!",
          user: {
            username: dbUser.name,
            email: dbUser.email,
          },
          token: token,
        });
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  });
});

module.exports = router;
