const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Publish = require("../../models/publish");
const middleware = require("../../middleware/auth");

router.post(
  "/publish",
  [
    middleware,
    [
      check("technology", "technology is required").not().isEmpty(),
      check("type", "type is required").not().isEmpty(),
      check("detail", "detail is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { isBlog, isTutorial, technology, type, detail } = req.body;
    const publishField = {};
    publishField.user_id = req.user.id;
    if (isBlog) publishField.isBlog = isBlog;
    if (isTutorial) publishField.isTutorial = isTutorial;
    publishField.technology = technology;
    publishField.type = type;
    publishField.detail = detail;
    try {
      let publish = new Publish(publishField);
      await publish.save();
      res.json(publish);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server Error");
    }
  }
);

router.get('/me', [middleware], async (req,res) => {
  try{
    const publish = await Publish.find({user_id: req.user.id}).populate('user_id', ['name']);
    res.json(publish);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.get('/publish', async (req,res) => {
    try{
        const publish = await Publish.find({}).populate('user_id', ['name'])
        res.json(publish)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;