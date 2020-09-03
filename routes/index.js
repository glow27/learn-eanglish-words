const express = require('express');
const { userLogged, userLoggedOut } = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    layout: '/layouts/main',
  });
});

router.get('/auth', userLoggedOut, (req, res) => {
  res.render('login', {
    layout: '/layouts/login',
  });
});

module.exports = router;
