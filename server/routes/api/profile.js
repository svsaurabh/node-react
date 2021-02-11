const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const allUser = require("../../models/allUser");
const middleware = require("../../middleware/auth");

router.post(
  "/isauthor",
  [middleware, [check("isAuthor", "True/False").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { isAuthor } = req.body;
    const isAuthorField = {};
    isAuthorField.isAuthor = isAuthor;
    try {
      let profile = await allUser.findOne({ _id: req.user.id });
      if (profile) {
        profile = await allUser.findOneAndUpdate(
          { _id: req.user.id },
          { $set: isAuthorField },
          { new: true }
        );
        return res.send(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server Error");
    }
  }
);

module.exports = router;