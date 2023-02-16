var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllCategoryProviders', async function(req, res, next) {
    let categoryProviders = {};
    await connectiondb.query(`SELECT id_category, category FROM Category_Providers;`, (err, rows, fields) => {
        if (err) throw err
        categoryProviders = rows;
        res.send(categoryProviders);
    })
});

router.post('/addCategoryProvider', async function(req, res, next) {
    var category = req.body.category;

    await connectiondb.query(`INSERT INTO Category_Providers(category) VALUES ('${category}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateCategoryProvider', async function(req, res, next) {
    var category = req.body.category;

    await connectiondb.query(`UPDATE Category_Providers SET category = '${category}')`, (err, rows, fields) => {
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