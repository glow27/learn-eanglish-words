const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/logot', (req, res) => {
  req.logOut();
  res.redirect('/auth');
});

module.exports = router;
