var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.post('/addContactForm', async function(req, res, next) {
    var email = req.body.email;
    var details = req.body.details;

    await connectiondb.query(`INSERT INTO Contact_Form(email, details) VALUES ('${email}', '${details}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

module.exports = router;