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

router.post('/addCustomer', async function(req, res, next) {
    console.log(req.body)
    var lastNameRepresentative = req.body.lastNameRepresentative;
    var firstNameRepresentative = req.body.firstNameRepresentative;
    var phoneRepresentative = req.body.phoneRepresentative;
    var emailRepresentative = req.body.emailRepresentative;
    var company = req.body.company;
    var subscriptionType = req.body.subscriptionType;
    var name = req.body.name;
    var location = req.body.location;
    var website = req.body.website;
    var phone = req.body.phone;
    var shortDescription = req.body.shortDescription;
    var longDescription = req.body.longDescription;
    var numberHall = req.body.numberHall;
    var minimumCapacity = req.body.minimumCapacity;
    var maximumCapacity = req.body.maximumCapacity;
    var image1 = req.body.image1;
    var image2 = req.body.image2;
    var image3 = req.body.image3;
    var image4 = req.body.image4;
    var image5 = req.body.image5;
    var image6 = req.body.image6;
    var image7 = req.body.image7;
    var image8 = req.body.image8;
    var image9 = req.body.image9;
    var image10 = req.body.image10;
    var idCategory = req.body.idCategory;
    var idCity = req.body.idCity;
    var selectedFacilitiesOptions = req.body.selectedFacilitiesOptions;
    await connectiondb.query(`INSERT INTO Customers(last_name_representative, first_name_representative, phone_representative, email_representative, name_company, subscription_type) VALUES ('${lastNameRepresentative}', '${firstNameRepresentative}', '${phoneRepresentative}', '${emailRepresentative}', '${company}', '${subscriptionType}')`, async (err, rows, fields) => {
        if (err) throw err;
        let idCustomer = "" + rows.insertId;
        await connectiondb.query(`INSERT INTO Customers_Services(name, location, website, phone, short_description, long_description, number_hall, minimum_capacity, maximum_capacity, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, id_customer, id_category, id_city) VALUES ('${name}', '${location}', '${website}', '${phone}', '${shortDescription}', '${longDescription}', '${numberHall}', '${minimumCapacity}', '${maximumCapacity}', '${image1}', '${image2}', '${image3}', '${image4}', '${image5}', '${image6}','${image7}', '${image8}', '${image9}', '${image10}','${idCustomer}', '${idCategory}', '${idCity}')`, async (err, rows, fields) => {
           if (err) throw err;
           let idCustomerService = "" + rows.insertId;
           if(selectedFacilitiesOptions.length > 0) {
                for(var i = 0; i < selectedFacilitiesOptions.length; i++) {
                    await connectiondb.query(`INSERT INTO Facilities_Options(id_customer_service, id_facility) VALUES ('${idCustomerService}', '${selectedFacilitiesOptions[i]}')`, (err, rows, fields) => {
                        if (err) throw err;
                    })
                }
           }
  
           res.send("succes");
       })
    })

});
module.exports = router;