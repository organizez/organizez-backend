var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');
const verifyToken = require('../routes/verifyToken');

router.get('/getAllCounties', async function(req, res, next) {
    let counties = [];
    await connectiondb.query('SELECT * FROM Counties', (err, rows, fields) => {
        if (err) throw err
        counties = rows;
        res.send(counties);
    })
});

router.get('/countiesContainsName/:county', async function(req, res, next) {
    let counties = [];
    let county = req.params.city;
    await connectiondb.query('SELECT id_county, county FROM Counties WHERE county like %' + county + '%', (err, rows, fields) => {
      if (err) throw err
      counties = rows;
      res.send(counties);
    })
  });
module.exports = router;