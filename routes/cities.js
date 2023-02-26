var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');
const verifyToken = require('../routes/verifyToken');

router.get('/getAllCities', async function(req, res, next) {
  let cities = [];
  await connectiondb.query('SELECT id_city, city FROM Cities', (err, rows, fields) => {
    if (err) throw err
    cities = rows;
    res.send(cities);
  })
});

router.get('/locationContainsName/:location', async function(req, res, next) {
  let locations = [];
  let location = req.params.location;
  await connectiondb.query("SELECT id_city AS id_location, city AS location, 'oraș' AS category_location FROM Cities WHERE city LIKE '%" + location + "%' UNION ALL SELECT id_county AS id_location, county AS location, 'județ' AS category_location FROM Counties WHERE county LIKE '%" + location + "%' and county != 'Bucuresti';", (err, rows, fields) => {
    if (err) throw err
    locations = rows;
    res.send(locations);
  })
});
module.exports = router;
