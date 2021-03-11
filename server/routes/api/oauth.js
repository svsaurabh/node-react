const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/auth");
const allUser = require('../../models/allUser')
const passport = require("passport");
require("../../config/passport-setup");

router.get("/loginFailed", (req, res) => {
  res.send("loginFailed");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { successRedirect:"http://localhost:5000", failureRedirect: "/loginFailed" })
  // async (req, res) => {
  //   res.send('Success');
  //   res.redirect(`/getToken/${req.session.passport.user.id}`);
  // }
);

router.get("/login/success", async(req,res) => {
  res.send()
})

router.get("/getToken/:id", async (req, res) => {
  try {
    let user1 = await User_google.findOne({ _id: req.params.id });
    const payload = {
      user: {
        id: user1.user_id,
      },
    };
    jwt.sign(payload, "mysecretkey", { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.send("Invalid Token");
  }
});

module.exports = router;