const GoogleStrategy = require('passport-google-oauth20').Strategy;
const VKStrategy = require('passport-vkontakte').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };
        try {
          let user = await User.findOne({
            googleID: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (e) {
          console.log(e);
        }
      }
    )
  );

  passport.use(
    new VKStrategy(
      {
        // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientID: process.env.VKONTAKTE_APP_ID,
        clientSecret: process.env.VKONTAKTE_APP_SECRET,
        callbackURL: '/auth/vkontakte/callback',
      },
      async (accessToken, refreshToken, params, profile, done) => {
        const newUser = {
          vkID: profile.username,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };
        try {
          let user = await User.findOne({
            vkID: profile.username,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (e) {
          console.log(e);
        }
      }
    )
  );

  passport.use(
    new LocalStrategy(
      
      async (username, password, done) => {
        try {
          const user = await User.findOne({
            firstName: username,
          });
          if (user) {
            done(null, user);
          } else {
            return done(null, false, { message: 'User is not found, please register' });
          }
        } catch (e) {
          console.log(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
