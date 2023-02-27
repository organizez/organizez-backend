var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getDataPrivacyPolicy', async function(req, res, next) {
    let dataPrivacyPolicy = [];
    await connectiondb.query(`SELECT * FROM Data_Privacy_Policy;`, (err, rows, fields) => {
        if (err) throw err
        dataPrivacyPolicy = rows;
        res.send(dataPrivacyPolicy);
    })
});

router.put('/updateDataPrivacyPolicy', async function(req, res, next) {
    var idDataPrivacyPolicy = req.body.idDataPrivacyPolicy;
    var titleDataPrivacyPolicy = req.body.titleDataPrivacyPolicy;
    var textDataPrivacyPolicy = req.body.textDataPrivacyPolicy;

    await connectiondb.query(`UPDATE Data_Privacy_Policy SET title_data_privacy_policy = '${titleDataPrivacyPolicy}', text_data_privacy_policy = '${textDataPrivacyPolicy}' where id_data_privacy_policy = '${idDataPrivacyPolicy}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

module.exports = router;