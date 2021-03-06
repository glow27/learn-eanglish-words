const express = require('express');
const setLocals = require('../middleware/setLocals');

const router = express.Router();

router.get('/', setLocals, (req, res) => {
  res.render('index', {
    layout: '/layouts/main',
  });
});

module.exports = router;
