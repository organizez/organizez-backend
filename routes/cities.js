var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');
const verifyToken = require('../routes/verifyToken');

router.get('/getAllCities', async function(req, res, next) {
  let cities = [];
  await connectiondb.query('SELECT * FROM Cities', (err, rows, fields) => {
    if (err) throw err
    cities = rows;
    res.send(cities);
  })
});

module.exports = router;