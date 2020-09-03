const express = require('express');

const axios = require('axios');

const router = express.Router();

router.get('/:word', async (req, res) => {
  const sound = await axios({
    method: 'GET',
    url: `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${req.params.word}`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'lingua-robot.p.rapidapi.com',
      'x-rapidapi-key': '6af9db4afcmshe6cbf70837c034cp15045bjsn5ebe0d1762f2',
      useQueryString: true,
    },
  })
    console.log(sound)
});

module.exports = router;
