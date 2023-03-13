var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.post('/addCustomerService', async function(req, res, next) {
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
    var idCustomer = req.body.idCustomer;
    var idCategory = req.body.idCategory;
    var idCity = req.body.idCity;

    await connectiondb.query(`INSERT INTO Customers_Services(name, location, website,
         phone, short_description, long_description, number_hall, minimum_capacity, maximum_capacity, image1, image2, image3, image4,
        , image5, image6, image7, image8, image9, image10, id_customer, id_category, id_city)
         VALUES ('${name}', '${location}', '${website}', '${phone}',
          '${shortDescription}', '${longDescription}', '${numberHall}', '${minimumCapacity}',
          '${maximumCapacity}', '${image1}', '${image2}', '${image3}', '${image4}', '${image5}', '${image6}','${image7}', '${image8}', '${image9}', '${image10}' ,
          '${idCustomer}', '${idCategory}', '${idCity}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })

});
module.exports = router;