const express = require("express");
const router = express.Router();
const db = require("../db");

const auth = require("./auth");
const protected = require("./protected");
const comments = require("./comments");
const users = require("./users");
const images = require("./images");

router.use("/auth", auth);
router.use("/comments", comments);
router.use("/users", users);
router.use("/protected", protected);
router.use("/images", images);

module.exports = router;
