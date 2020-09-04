const express = require('express');
const { userLogged } = require('../middleware/auth');
const setLocals = require('../middleware/setLocals');

const router = express.Router();

router.get('/', userLogged, setLocals, async (req, res) => {
  res.render('profile', {
    layout: '/layouts/main',
  });
});

module.exports = router;
