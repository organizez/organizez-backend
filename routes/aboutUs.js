var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAboutUs', async function(req, res, next) {
    let aboutUs = [];
    await connectiondb.query(`SELECT * FROM About_Us;`, (err, rows, fields) => {
        if (err) throw err
        aboutUs = rows;
        res.send(aboutUs);
    })
});

router.put('/updateAboutUs', async function(req, res, next) {
    var idAboutUs = req.body.idAboutUs;
    var titleAboutUs = req.body.titleAboutUs;
    var textAboutUs = req.body.textAboutUs;
    var imageAboutUs = req.body.imageAboutUs;

    await connectiondb.query(`UPDATE About_Us SET title_about_us = '${titleAboutUs}', text_about_us = '${textAboutUs}', image_about_us = '${imageAboutUs}' where id_about_us = '${idAboutUs}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

module.exports = router;