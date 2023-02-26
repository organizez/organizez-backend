var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllImages', async function(req, res, next) {
    let portofolio = [];
    await connectiondb.query(`SELECT * FROM Portofolio;`, (err, rows, fields) => {
        if (err) throw err
        portofolio = rows;
        res.send(portofolio);
    })
});

module.exports = router;