var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllCategoriesProviders', async function(req, res, next) {
    let categoriesProviders = {};
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT id_category, category FROM Category_Providers LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        categoriesProviders = rows;
        res.send(categoriesProviders);
    })
});

router.get('/getCategoriesProvidersNumber', async function(req, res, next) {
    let categoriesNumber = {};
    await connectiondb.query(`SELECT count(*) as categories_number FROM Category_Providers;`, (err, rows, fields) => {
        if (err) throw err
        categoriesNumber = rows;
        res.send(categoriesNumber);
    })
});

router.post('/addCategoryProviders', async function(req, res, next) {
    var category = req.body.category;

    await connectiondb.query(`INSERT INTO Category_Providers(category) VALUES ('${category}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateCategoryProvider', async function(req, res, next) {
    var idCategory = req.body.idCategory;
    var category = req.body.category;

    await connectiondb.query(`UPDATE Category_Providers SET category = '${category}' where id_category = '${idCategory}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.delete('/deleteCategoryProvider/:idCategory', async function(req, res, next) {
    var idCategory = req.params.idCategory;
    await connectiondb.query(`DELETE FROM Category_Providers where id_category = '${idCategory}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});
module.exports = router;