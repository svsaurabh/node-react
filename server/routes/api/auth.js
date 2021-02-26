const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const allUser = require("../../models/allUser");
const middleware = require("../../middleware/auth");

router.get('/', async(req, res) =>{
  try{
    let users = await allUser.find({});
    res.json(users)}
  catch(err){
    console.error(err.message + "\n" + err);
    res.status(500).send("server error");
  }
})

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "email is required").not().isEmpty(),
    check("password", "password is required with min 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
      }
      const user1 = { name: name, email: email };
      let data = await allUser.create(user1);
      user = new User({
        user_id: data.id,
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: data.id,
        },
      };
      jwt.sign(payload, "mysecretkey", { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message + "\n" + err);
      res.status(500).send("server error");
    }
  }
);

router.get("/user", middleware, async (req, res) => {
  try {
    const user = await allUser.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post(
  "/login",
  [
    check("email", "Please include valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(400).json({ msg: errors.array() });
    }
    const { email, password } = req.body;
    try {
      var user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({errors: [{msg: "No user exist with this email"}] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({errors: [{ msg: "Invalid Credentials"}] });
      }

      const payload = {
        user: {
          id: user.user_id,
        },
      };
      jwt.sign(payload, "mysecretkey", { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send("server error");
    }
  }
);

module.exports = router;