var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getCustomersNumber/', async function(req, res, next) {
    let customersNumber = {};
    await connectiondb.query(`SELECT count( * ) as customers_number FROM Customers c, Customers_Services cs where c.id_customer = cs.id_customer;`, (err, rows, fields) => {
        if (err) throw err
        customersNumber = rows;
        res.send(customersNumber[0]);
    })
});

router.get('/getAllCustomers/:iteration', async function(req, res, next) {
    let customers = [];
    let iteration = req.params.iteration;
    await connectiondb.query(`select c.id_customer, c.name_company, CONCAT(first_name_representative, ' ', last_name_representative) AS name_representative, c.email_representative, c.phone_representative, c.subscription_type, cs.name, cs.location, cs.website, cs.phone, cs.short_description, cs.long_description, cs.image1, cs.image2, cs.image3, cs.image4, cs.image5, cs.image6, cs.image7, cs.image8, cs.image9, cs.image10, cs.minimum_capacity, cs.maximum_capacity, cs.number_hall, sc.category from Customers c, Customers_Services cs, Services_Categories sc where c.id_customer = cs.id_customer and cs.id_category = sc.id_category LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        customers = rows;
        res.send(customers);
    })
});

module.exports = router;