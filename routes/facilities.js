var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getFacilititesByCategory/:idCategory', async function(req, res, next) {
    let facilties = [];
    var idCategory = req.params.idCategory;
    await connectiondb.query(`SELECT id_facility, facility FROM Facilities where id_service_category = '${idCategory}';`, (err, rows, fields) => {
        if (err) throw err
        facilties = rows;
        res.send(facilties);
    })
});

router.get('/getFacilititesByCustomerService/:idCustomerService', async function(req, res, next) {
    let facilties = [];
    var idCustomerService = req.params.idCustomerService;
    await connectiondb.query(`SELECT f.id_facility, f.facility FROM Facilities_Options fo, Facilities f, Customers_Services cs WHERE fo.id_facility = f.id_facility and cs.id_customer_service = fo.id_customer_service and cs.id_customer_service = '${idCustomerService}';`, (err, rows, fields) => {
        if (err) throw err
        facilties = rows;
        res.send(facilties);
    })
});

module.exports = router;