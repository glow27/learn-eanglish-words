const express = require('express');
const owlClient = require('../controller/owl-bot');
const translator = require('../controller/translator');

const router = express.Router();

router.post('/', async (req, res) => {
  const wordToTranslate = await translator(req.body.word);

  const word = await owlClient.define(wordToTranslate);
  if (word.word) {
    return res.json(word);
  }
  res.status(404).send();
});

module.exports = router;
