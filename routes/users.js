const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user page');
});

router.get('/website', function(req, res, next) {
  res.send('web site');
});

module.exports = router;
