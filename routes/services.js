var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllServices', async function(req, res, next) {
    let services = {};
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.location,s.image_service, s.short_description, s.long_description, p.company FROM Providers p, Services s where s.id_service = p.id_provider;`, (err, rows, fields) => {
        if (err) throw err
        services = rows;
        res.send(services);
    })
});

router.post('/addService', async function(req, res, next) {
    var nameService = req.body.nameService;
    var location = req.body.location;
    var imageService = req.body.imageService;
    var shortDescription = req.body.shortDescription;
    var longDescription = req.body.longDescription;
    var idProvider = req.body.idProvider;

    await connectiondb.query(`INSERT INTO Services(name_service, location, image_service, short_description, long_description, id_provider) VALUES ('${nameService}', '${location}', '${imageService}', '${shortDescription}', '${longDescription}', '${idProvider}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateService', async function(req, res, next) {
    var nameService = req.body.nameService;
    var location = req.body.location;
    var imageService = req.body.imageService;
    var shortDescription = req.body.shortDescription;
    var longDescription = req.body.longDescription;
    var idProvider = req.body.idProvider;

    await connectiondb.query(`UPDATE Services SET name_service = '${nameService}', location = '${location}', image_service = '${imageService}', short_description = '${shortDescription}', long_description = '${longDescription}', id_provider = '${idProvider}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.delete('/deleteService/:idService', async function(req, res, next) {
    var idService = req.params.idService;
    await connectiondb.query(`DELETE FROM Services where id_service = '${idService}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});
module.exports = router;