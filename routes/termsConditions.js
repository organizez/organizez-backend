var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getTermsConditions', async function(req, res, next) {
    let termsConditions = [];
    await connectiondb.query(`SELECT * FROM Terms_Conditions;`, (err, rows, fields) => {
        if (err) throw err
        termsConditions = rows;
        res.send(termsConditions);
    })
});

router.put('/updateTermsConditions', async function(req, res, next) {
    var idTermsConditions = req.body.idTermsConditions;
    var titleTermsConditions = req.body.titleTermsConditions;
    var textTermsConditions = req.body.textTermsConditions;

    await connectiondb.query(`UPDATE Terms_Conditions SET title_terms_conditions = '${titleTermsConditions}', text_terms_conditions = '${textTermsConditions}' where id_terms_conditions = '${idTermsConditions}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

module.exports = router;