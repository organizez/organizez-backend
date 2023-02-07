var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test-database', async function(req, res, next) {
  let cities = [];
  await connectiondb.query('SELECT * FROM Cities', (err, rows, fields) => {
    if (err) throw err
    cities = rows;
    res.send(cities);
  })
});

module.exports = router;
