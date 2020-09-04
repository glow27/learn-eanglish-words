const express = require('express');
const passport = require('passport');
const { userLoggedOut } = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/', userLoggedOut, (req, res) => {
  res.render('login', {
    layout: '/layouts/login',
  });
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/vkontakte', passport.authenticate('vkontakte'));

router.get(
  '/vkontakte/callback',
  passport.authenticate('vkontakte', {
    failureRedirect: '/auth',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('login', {
        msgF: 'user not found',
        layout: '/layouts/login',
      });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/reg', (req, res) => {
  res.render('reg', {
    layout: '/layouts/login',
  });
});

router.post('/reg', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.render('login', {
      msgF: 'user with this email already exists!',
      layout: '/layouts/login',
    });
  }
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.username,
  });
  await newUser.save();
  res.render('login', {
    msgS: 'registration successeful, please login',
    layout: '/layouts/login',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
