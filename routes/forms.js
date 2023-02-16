var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.post('/addForm', async function(req, res, next) {
    var lastNameUser = req.body.lastNameUser;
    var firstNameUser = req.body.firstNameUser;
    var email = req.body.email;
    var phone = req.body.phone;
    var dateEvent = req.body.dateEvent;
    var numberGuests = req.body.numberGuests;
    var budget = req.body.budget;
    var signedProviders = req.body.signedProviders;
    var details = req.body.details;
    var idCity = req.body.idCity;

    await connectiondb.query(`INSERT INTO Forms(last_name_user, first_name_user, email, phone, date_event, number_guests, budget, signed_providers, details, id_city) VALUES ('${lastNameUser}', '${firstNameUser}', '${email}', '${phone}', '${dateEvent}', '${numberGuests}', '${budget}', '${signedProviders}', '${details}', '${idCity}' )`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});