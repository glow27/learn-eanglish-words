const express = require('express');
const passport = require('passport');
const { userLoggedOut } = require('../middleware/auth');

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

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
