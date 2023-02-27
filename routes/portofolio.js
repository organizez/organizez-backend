var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllImages/:iteration', async function(req, res, next) {
    let portofolio = [];
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT * FROM Portofolio LIMIT 12 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        portofolio = rows;
        res.send(portofolio);
    })
});

module.exports = router;