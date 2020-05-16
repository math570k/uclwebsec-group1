const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");

router.get("/test", authorize, function (req, res) {
  res
    .status(200)
    .json({
      message: "This is some protected data that only users can access!",
    });
});

module.exports = router;
