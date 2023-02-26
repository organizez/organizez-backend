var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllCategoriesServices/:iteration', async function(req, res, next) {
    let categoriesServices = {};
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT cs.id_category, cs.category, cs.category_image, count(id_service) as services_number FROM Categories_Services cs LEFT OUTER JOIN Services s ON cs.id_category = s.id_category GROUP BY cs.id_category, cs.category ORDER BY cs.id_category LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        categoriesServices = rows;
        res.send(categoriesServices);
    })
});

router.get('/getAllCategoriesServices', async function(req, res, next) {
    let categoriesServices = {};
    await connectiondb.query(`SELECT id_category, category, category_image FROM Categories_Services;`, (err, rows, fields) => {
        if (err) throw err
        categoriesServices = rows;
        res.send(categoriesServices);
    })
});

router.get('/getCategoriesServicesNumber', async function(req, res, next) {
    let categoriesNumber = {};
    await connectiondb.query(`SELECT count(*) as categories_number FROM Categories_Services;`, (err, rows, fields) => {
        if (err) throw err
        categoriesNumber = rows;
        res.send(categoriesNumber);
    })
});

router.post('/addCategoriesServices', async function(req, res, next) {
    var category = req.body.category;
    var categoryImage = req.body.categoryImage;

    await connectiondb.query(`INSERT INTO Categories_Services(category, category_image) VALUES ('${category}', '${categoryImage}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateCategoriesServices', async function(req, res, next) {
    var idCategory = req.body.idCategory;
    var category = req.body.category;
    var categoryImage = req.body.categoryImage;

    await connectiondb.query(`UPDATE Categories_Services SET category = '${category}', category_image ='${categoryImage}' where id_category = '${idCategory}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.delete('/deleteCategori/:idCategory', async function(req, res, next) {
    var idCategory = req.params.idCategory;
    await connectiondb.query(`DELETE FROM Categories_Services where id_category = '${idCategory}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});
module.exports = router;