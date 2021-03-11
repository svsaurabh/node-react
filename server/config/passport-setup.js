const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User_google = require("../models/user-google");
const allUser = require("../models/allUser");
require('dotenv').config()

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  allUser.findById(id, (err, user) => done(err, user));
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
          done(null, user);
        } else {
          let user1 = {
            name: profile.displayName,
            email: profile.emails[0].value,
            isOAuth: true,
          };
          data = await allUser.create(user1);
          const Newuser = new User_google({
            user_id: data.id,
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          user = await User_google.create(Newuser);
          done(null, user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  )
);
