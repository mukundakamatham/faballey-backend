require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {v4: uuidV4} = require('uuid');

const FacebookStrategy = require( "passport-facebook").Strategy;
const User = require("../models/user.model");

const {newToken} = require("../controllers/auth.controller")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://faballey-clone.herokuapp.com/auth/google/callback",
    userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const email = profile?._json?.email
const Name=profile?._json?.name
    let user;
    try { 
      user = await User.findOne({email}).lean().exec();

      if(!user) {
        user = await User.create({
          email: email,
          Name:Name,
          password: uuidV4()
        })
      }

      const token = newToken(user);
      return done(null, {user, token})

    } catch(err) {
      console.log("err", err)
    }
  }
));
/*
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name"]
    },
    async function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      /*const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      let user;
    try { 
      user = await User.findOne({email}).lean().exec();

      if(!user) {
        user = await User.create({
          email: email,
          Name:first_name+" "+last_name,
          password: uuidV4()
        })
      }

      const token = newToken(user);
      return done(null, {user, token})

    } catch(err) {
      console.log("err", err)
    }
      // new userModel(userData).save();
      // done(null, profile);
    }
  )
);*/
module.exports = passport