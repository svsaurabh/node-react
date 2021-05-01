const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User_google = require("../models/user-google");
const allUser = require("../models/allUser");
require('dotenv').config()

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  allUser.findById(id).then((user)=>{
    done(null,user)
  })
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User_google.findOne({ googleId: profile.id });
        if (user) {
          let data = await allUser.findOne({_id: user.user_id})
          done(null, data);
        } else {
          let user1 = new allUser({
            name: profile.displayName,
            email: profile.emails[0].value,
            isOAuth: true,
          });
          data = await user1.save();
          const Newuser = new User_google({
            user_id: data.id,
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await Newuser.save();
          done(null, user1);
        }
      } catch (error) {
        console.error(error);
      }
    }
  )
);
