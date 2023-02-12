var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllProviders', async function(req, res, next) {
  let providers = {};
  await connectiondb.query(`SELECT p.id_provider, p.company, p.first_name_representative, p.last_name_representative, p.email_representative, p.address_company, cp.category, c.city FROM Providers p, Category_Providers cp, Cities c where p.id_category = cp.id_category and p.id_city = c.id_city;`, (err, rows, fields) => {
    if (err) throw err
    providers = rows;
    res.send(providers);
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
    var company = req.body.company;
    var firstNameRepresentative = req.body.firstNameRepresentative;
    var lastNameRepresentative = req.body.lastNameRepresentative;
    var emailRepresentative = req.body.emailRepresentative;
    var addressCompany = req.body.addressCompany;
    var idCategory = req.body.idCategory;
    var idCity = req.body.idCity;
        
    await connectiondb.query(`UPDATE Providers SET company = '${company}', first_name_representative = '${firstNameRepresentative}', last_name_representative = '${lastNameRepresentative}', email_representative = '${emailRepresentative}', address_company = '${addressCompany}', id_category = '${idCategory}', id_city = '${idCity}')`, (err, rows, fields) => {
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
