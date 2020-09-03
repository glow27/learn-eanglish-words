const express = require('express');
const owlClient = require('../controller/owl-bot');
const translator = require('../controller/translator');

const router = express.Router();

router.post('/', async (req, res) => {
  const trans = await translator(req.body.word);
  const word = await owlClient.define(trans);
  
  res.json(word);
});



module.exports = router;
