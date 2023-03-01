var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAnpc', async function(req, res, next) {
    let anpc = [];
    await connectiondb.query(`SELECT * FROM Anpc;`, (err, rows, fields) => {
        if (err) throw err
        anpc = rows;
        res.send(anpc);
    })
});

router.put('/updateAnpc', async function(req, res, next) {
    var idAnpc = req.body.idAnpc;
    var titleAnpc = req.body.titleAnpc;
    var urlAnpc = req.body.urlAnpc;

    await connectiondb.query(`UPDATE Anpc SET title_anpc = '${titleAnpc}', url_anpc = '${urlAnpc}' where id_anpc = '${idAnpc}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

module.exports = router;