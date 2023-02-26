var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllServices/:iteration', async function(req, res, next) {
    let services = [];
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.location, s.image1_service, s.short_description, s.long_description, p.company, c.city, ct.county FROM Providers p, Services s, Cities c, Counties ct where s.id_service = p.id_provider and s.id_city = c.id_city and c.id_county = ct.id_county LIMIT 8 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        services = rows;
        res.send(services);
    })
});

router.get('/getServiceById/:idService', async function(req, res, next) {
    let service = {};
    let idService = req.params.idService;
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.image1_service, s.image2_service, s.image3_service, s.image4_service, s.short_description, s.long_description, s.site_link, s.capacity, p.company, s.location, c.city, ct.county, cs.category FROM Services s, Providers p, Categories_Services cs, Cities c, Counties ct where s.id_service = p.id_provider and s.id_city = c.id_city and c.id_county = ct.id_county and s.id_category = cs.id_category and s.id_service = ${idService};`, (err, rows, fields) => {
        if (err) throw err
        service = rows;
        res.send(service[0]);
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
    var idService = req.body.idService;
    var nameService = req.body.nameService;
    var location = req.body.location;
    var imageService = req.body.imageService;
    var shortDescription = req.body.shortDescription;
    var longDescription = req.body.longDescription;
    var idProvider = req.body.idProvider;

    await connectiondb.query(`UPDATE Services SET name_service = '${nameService}', location = '${location}', image_service = '${imageService}', short_description = '${shortDescription}', long_description = '${longDescription}', id_provider = '${idProvider}' where id_service = '${idService}'`, (err, rows, fields) => {
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

router.get('/getServicesNumber', async function(req, res, next) {
    let servicesNumber = {};
    await connectiondb.query(`SELECT count(*) as services_number FROM Services;`, (err, rows, fields) => {
        if (err) throw err
        servicesNumber = rows;
        res.send(servicesNumber);
    })
});

module.exports = router;