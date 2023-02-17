var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllProviders/:iteration', async function(req, res, next) {
  let providers = {};
  let iteration = req.params.iteration;
  await connectiondb.query(`SELECT p.id_provider, p.company, p.first_name_representative, p.last_name_representative, CONCAT(p.first_name_representative, ' ', p.last_name_representative) AS name_representative, p.email_representative, p.address_company, p.id_category, p.id_city, cp.category, c.city FROM Providers p, Category_Providers cp, Cities c where p.id_category = cp.id_category and p.id_city = c.id_city LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
    if (err) throw err
    providers = rows;
    res.send(providers);
  })
});

router.get('/getProvidersNumber/', async function(req, res, next) {
    let providersNumber = {};
    await connectiondb.query(`SELECT count(*) as providers_number FROM Providers;`, (err, rows, fields) => {
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
    var idCategory = req.body.idCategory;
    var idCity = req.body.idCity;
        
    await connectiondb.query(`INSERT INTO Providers(company, first_name_representative, last_name_representative, email_representative, address_company, id_category, id_city) VALUES ('${company}', '${firstNameRepresentative}', '${lastNameRepresentative}', '${emailRepresentative}', '${addressCompany}', '${idCategory}', '${idCity}')`, (err, rows, fields) => {
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
    var idCategory = req.body.idCategory;
    var idCity = req.body.idCity;
        
    await connectiondb.query(`UPDATE Providers SET company = '${company}', first_name_representative = '${firstNameRepresentative}', last_name_representative = '${lastNameRepresentative}', email_representative = '${emailRepresentative}', address_company = '${addressCompany}', id_category = '${idCategory}', id_city = '${idCity}' where id_provider = '${idProvider}'`, (err, rows, fields) => {
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
