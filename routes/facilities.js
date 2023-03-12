var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getFacilititesyCategory/:idCategory', async function(req, res, next) {
    let facilties = [];
    var idCategory = req.params.idCategory;
    await connectiondb.query(`SELECT id_facilitiy, facility FROM Facilities where id_service_category = '${idCategory}';`, (err, rows, fields) => {
        if (err) throw err
        facilties = rows;
        res.send(facilties);
    })
});

module.exports = router;