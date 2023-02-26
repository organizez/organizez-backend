var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllProviders/:iteration', async function(req, res, next) {
    let providers = {};
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT id_provider, company, first_name_representative, last_name_representative, CONCAT(first_name_representative, ' ', last_name_representative) AS name_representative, email_representative, address_company FROM Providers LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        providers = rows;
        res.send(providers);
    })
});

router.get('/getProvidersCompany', async function(req, res, next) {
    let providers = {};
    await connectiondb.query(`SELECT id_provider, company FROM Providers;`, (err, rows, fields) => {
        if (err) throw err
        providers = rows;
        res.send(providers)
    })
})

router.get('/getProvidersNumber/', async function(req, res, next) {
    let providersNumber = {};
    await connectiondb.query(`SELECT count( * ) as providers_number FROM Providers;`, (err, rows, fields) => {
        if (err) throw err
        providersNumber = rows;
        res.send(providersNumber);
    })
});

router.post('/addProvider', async function(req, res, next) {
    var company = req.body.company;
    var firstNameRepresentative = req.body.firstNameRepresentative;
    var lastNameRepresentative = req.body.lastNameRepresentative;
    var emailRepresentative = req.body.emailRepresentative;
    var addressCompany = req.body.addressCompany;

    await connectiondb.query(`INSERT INTO Providers(company, first_name_representative, last_name_representative, email_representative, address_company) VALUES('${company}', '${firstNameRepresentative}', '${lastNameRepresentative}', '${emailRepresentative}', '${addressCompany}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateProvider', async function(req, res, next) {
    var idProvider = req.body.idProvider;
    var company = req.body.company;
    var firstNameRepresentative = req.body.firstNameRepresentative;
    var lastNameRepresentative = req.body.lastNameRepresentative;
    var emailRepresentative = req.body.emailRepresentative;
    var addressCompany = req.body.addressCompany;

    await connectiondb.query(`UPDATE Providers SET company = '${company}', first_name_representative = '${firstNameRepresentative}', last_name_representative = '${lastNameRepresentative}', email_representative = '${emailRepresentative}', address_company = '${addressCompany}' where id_provider = '${idProvider}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.delete('/deleteProvider/:idProvider', async function(req, res, next) {
    var idProvider = req.params.idProvider;
    await connectiondb.query(`DELETE FROM Providers where id_provider = '${idProvider}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});
module.exports = router;