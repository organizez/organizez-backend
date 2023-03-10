var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllServices/:iteration', async function(req, res, next) {
    let services = [];
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.location, s.image1_service, s.image2_service, s.image3_service, s.image4_service, s.short_description, s.long_description, s.site_link, s.minimum_capacity, s.maximum_capacity, s.id_provider, s.id_city, s.id_category, p.company, cs.category, c.city FROM Providers p, Categories_Services cs, Services s, Cities c where s.id_category = cs.id_category and s.id_provider = p.id_provider and s.id_city = c.id_city LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        services = rows;
        res.send(services);
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

router.get('/getServicesByCountyAndCategory/:idCounty/:idServicesCategory/:iteration', async function(req, res, next) {
    let services = [];
    let idCounty = req.params.idCounty;
    let idServicesCategory = req.params.idServicesCategory;
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.location, s.image1_service, s.image2_service, s.image3_service, s.image4_service, s.short_description, s.long_description, s.site_link, s.minimum_capacity, s.maximum_capacity, c.city, ct.county, cs.category, p.company FROM Services s, Categories_Services cs, Providers p, Cities c, Counties ct where s.id_city = c.id_city and c.id_county = ct.id_county and ct.id_county = ${idCounty} and s.id_category = cs.id_category and s.id_category = ${idServicesCategory} and s.id_provider = p.id_provider LIMIT 8 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        services = rows;
        res.send(services);
    })
});

router.get('/getServicesAllCountiesAndAllCategories/:iteration', async function(req, res, next) {
    let services = [];
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.location, s.image1_service, s.image2_service, s.image3_service, s.image4_service, s.short_description, s.long_description, s.site_link, s.minimum_capacity, s.maximum_capacity, c.city, ct.county, cs.category, p.company FROM Services s, Categories_Services cs, Providers p, Cities c, Counties ct where s.id_city = c.id_city and c.id_county = ct.id_county and s.id_category = cs.id_category and s.id_provider = p.id_provider LIMIT 8 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        services = rows;
        res.send(services);
    })
});

router.get('/getServicesAllCountiesAndSingleCategory/:idServicesCategory/:iteration', async function(req, res, next) {
    let services = [];
    let idServicesCategory = req.params.idServicesCategory;
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.location, s.image1_service, s.image2_service, s.image3_service, s.image4_service, s.short_description, s.long_description, s.site_link, s.minimum_capacity, s.maximum_capacity, c.city, ct.county, cs.category, p.company FROM Services s, Categories_Services cs, Providers p, Cities c, Counties ct where s.id_city = c.id_city and c.id_county = ct.id_county and s.id_category = cs.id_category and s.id_category = ${idServicesCategory} and s.id_provider = p.id_provider LIMIT 8 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        services = rows;
        res.send(services);
    })
});

router.get('/getServicesSingleCountyAndAllCategories/:idCounty/:iteration', async function(req, res, next) {
    let services = [];
    let idCounty = req.params.idCounty;
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.location, s.image1_service, s.image2_service, s.image3_service, s.image4_service, s.short_description, s.long_description, s.site_link, s.minimum_capacity, s.maximum_capacity, c.city, ct.county, cs.category, p.company FROM Services s, Categories_Services cs, Providers p, Cities c, Counties ct where s.id_city = c.id_city and c.id_county = ct.id_county and ct.id_county = ${idCounty} and s.id_category = cs.id_category and s.id_provider = p.id_provider LIMIT 8 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        services = rows;
        res.send(services);
    })
});

router.get('/getServiceById/:idService', async function(req, res, next) {
    let service = {};
    let idService = req.params.idService;
    await connectiondb.query(`SELECT s.id_service, s.name_service, s.image1_service, s.image2_service, s.image3_service, s.image4_service, s.short_description, s.long_description, s.site_link, s.minimum_capacity, s.maximum_capacity, p.company, s.location, c.city, ct.county, cs.category FROM Services s, Providers p, Categories_Services cs, Cities c, Counties ct where s.id_provider = p.id_provider and s.id_city = c.id_city and c.id_county = ct.id_county and s.id_category = cs.id_category and s.id_service = ${idService};`, (err, rows, fields) => {
        if (err) throw err
        service = rows;
        res.send(service[0]);
    })
});

router.post('/addService', async function(req, res, next) {
    var nameService = req.body.nameService;
    var location = req.body.location;
    var image1Service = req.body.image1Service;
    var image2Service = req.body.image2Service;
    var image3Service = req.body.image3Service;
    var image4Service = req.body.image4Service;
    var shortDescription = req.body.shortDescription;
    var siteLink = req.body.siteLink;
    var longDescription = req.body.longDescription;
    var idProvider = req.body.idProvider;
    var idCity = req.body.idCity;
    var idCategory = req.body.idCategory;
    var minimumCapacity = req.body.minimumCapacity;
    var maximumCapacity = req.body.maximumCapacity;

    await connectiondb.query(`INSERT INTO Services(name_service, location, image1_service, image2_service, image3_service, image4_service, short_description, long_description, site_link, minimum_capacity, maximum_capacity, id_provider, id_city, id_category) VALUES ('${nameService}', '${location}', '${image1Service}', '${image2Service}', '${image3Service}', '${image4Service}', '${shortDescription}', '${longDescription}', '${siteLink}', ${minimumCapacity}, ${maximumCapacity}, '${idProvider}', '${idCity}', '${idCategory}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateService', async function(req, res, next) {
    var idService = req.body.idService;
    var nameService = req.body.nameService;
    var location = req.body.location;
    var image1Service = req.body.image1Service;
    var image2Service = req.body.image2Service;
    var image3Service = req.body.image3Service;
    var image4Service = req.body.image4Service;
    var shortDescription = req.body.shortDescription;
    var longDescription = req.body.longDescription;
    var idProvider = req.body.idProvider;
    var idCity = req.body.idCity;
    var idCategory = req.body.idCategory;
    var minimumCapacity = req.body.minimumCapacity;
    var maximumCapacity = req.body.maximumCapacity;
    var siteLink = req.body.siteLink;
    // var company = req.body.company;
    // var category = req.body.category;
    // var city = req.body.city;

    await connectiondb.query(`UPDATE Services SET name_service = '${nameService}', location = '${location}', image1_service = '${image1Service}', image2_service = '${image2Service}', image3_service = '${image3Service}', image4_service = '${image4Service}', short_description = '${shortDescription}', long_description = '${longDescription}', site_link = '${siteLink}', id_provider = '${idProvider}', id_city = '${idCity}', id_category = '${idCategory}', minimum_capacity = ${minimumCapacity}, maximum_capacity = ${maximumCapacity} where id_service = '${idService}'`, (err, rows, fields) => {
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

router.get('/getServicesNumberByCountyAndCategory/:idCounty/:idServicesCategory', async function(req, res, next) {
    let servicesNumber = {};
    let idCounty = req.params.idCounty;
    let idServicesCategory = req.params.idServicesCategory;
    await connectiondb.query(`SELECT count(*) as services_number FROM Services s, Categories_Services cs, Providers p, Cities c, Counties ct where s.id_city = c.id_city and c.id_county = ct.id_county and ct.id_county = ${idCounty} and s.id_category = cs.id_category and s.id_category = ${idServicesCategory} and s.id_provider = p.id_provider;`, (err, rows, fields) => {
        if (err) throw err
        servicesNumber = rows;
        res.send(servicesNumber);
    })
});

router.get('/getServicesNumberAllCountiesAndAllCategories', async function(req, res, next) {
    let servicesNumber = {};
    await connectiondb.query(`SELECT count(*) as services_number FROM Services s, Categories_Services cs, Providers p, Cities c, Counties ct where s.id_city = c.id_city and c.id_county = ct.id_county and s.id_category = cs.id_category and s.id_provider = p.id_provider;`, (err, rows, fields) => {
        if (err) throw err
        servicesNumber = rows;
        res.send(servicesNumber);
    })
});

router.get('/getServicesNumberAllCountiesAndSingleCategory/:idServicesCategory', async function(req, res, next) {
    let servicesNumber = {};
    let idServicesCategory = req.params.idServicesCategory;
    await connectiondb.query(`SELECT count(*) as services_number FROM Services s, Categories_Services cs, Providers p, Cities c, Counties ct where s.id_city = c.id_city and c.id_county = ct.id_county and s.id_category = cs.id_category and s.id_category = ${idServicesCategory} and s.id_provider = p.id_provider;`, (err, rows, fields) => {
        if (err) throw err
        servicesNumber = rows;
        res.send(servicesNumber);
    })
});

router.get('/getServicesNumberSingleCountyAndAllCategories/:idCounty', async function(req, res, next) {
    let servicesNumber = {};
    let idCounty = req.params.idCounty;
    await connectiondb.query(`SELECT count(*) as services_number FROM Services s, Categories_Services cs, Providers p, Cities c, Counties ct where s.id_city = c.id_city and c.id_county = ct.id_county and ct.id_county = ${idCounty} and s.id_category = cs.id_category and s.id_provider = p.id_provider;`, (err, rows, fields) => {
        if (err) throw err
        servicesNumber = rows;
        res.send(servicesNumber);
    })
});

module.exports = router;