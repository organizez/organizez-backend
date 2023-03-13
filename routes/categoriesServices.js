var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllCategoriesServices/:iteration', async function(req, res, next) {
    let categoriesServices = {};
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT cs.id_category, cs.category, cs.category_image, count(id_service) as services_number FROM Services_Categories cs LEFT OUTER JOIN Services s ON cs.id_category = s.id_category GROUP BY cs.id_category, cs.category ORDER BY cs.id_category LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        categoriesServices = rows;
        res.send(categoriesServices);
    })
});

router.get('/getAllServicesCategories', async function(req, res, next) {
    let categoriesServices = {};
    await connectiondb.query(`SELECT id_category, category, category_image FROM Services_Categories;`, (err, rows, fields) => {
        if (err) throw err
        categoriesServices = rows;
        res.send(categoriesServices);
    })
});

router.get('/getCategoryServiceById/:idCategory', async function(req, res, next) {
    let categoryService = {};
    let idCategory = req.params.idCategory;
    await connectiondb.query(`SELECT id_category, category, category_image FROM Blog WHERE id_category = ${idCategory};`, (err, rows, fields) => {
        if (err) throw err
        categoryService = rows;
        res.send(categoryService[0]);
    })
});

router.get('/getCategoriesServicesNumber', async function(req, res, next) {
    let categoriesNumber = {};
    await connectiondb.query(`SELECT count(*) as categories_number FROM Services_Categories;`, (err, rows, fields) => {
        if (err) throw err
        categoriesNumber = rows;
        res.send(categoriesNumber);
    })
});

router.post('/addCategoriesServices', async function(req, res, next) {
    var category = req.body.category;
    var categoryImage = req.body.categoryImage;

    await connectiondb.query(`INSERT INTO Services_Categories(category, category_image) VALUES ('${category}', '${categoryImage}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateCategoriesServices', async function(req, res, next) {
    var idCategory = req.body.idCategory;
    var category = req.body.category;
    var categoryImage = req.body.categoryImage;

    await connectiondb.query(`UPDATE Services_Categories SET category = '${category}', category_image ='${categoryImage}' where id_category = '${idCategory}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.delete('/deleteCategory/:idCategory', async function(req, res, next) {
    var idCategory = req.params.idCategory;
    await connectiondb.query(`DELETE FROM Services_Categories where id_category = '${idCategory}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});
module.exports = router;