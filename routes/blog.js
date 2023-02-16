var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllBlogs', async function(req, res, next) {
    let blogs = {};
    await connectiondb.query(`SELECT id_article, name_article, date_article, author, image, short_description, text FROM Blog;`, (err, rows, fields) => {
        if (err) throw err
        blogs = rows;
        res.send(blogs);
    })
});

router.post('/addBlog', async function(req, res, next) {
    var nameArticle = req.body.nameArticle;
    var dateArticle = req.body.dateArticle;
    var author = req.body.author;
    var image = req.body.image;
    var shortDescription = req.body.shortDescription;
    var text = req.body.text;

    await connectiondb.query(`INSERT INTO Blog(name_article, date_article, author, image, short_description, text) VALUES ('${nameArticle}', '${dateArticle}', '${author}', '${image}', '${shortDescription}', '${text}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateBlog', async function(req, res, next) {
    var nameArticle = req.body.nameArticle;
    var dateArticle = req.body.dateArticle;
    var author = req.body.author;
    var image = req.body.image;
    var shortDescription = req.body.shortDescription;
    var text = req.body.text;

    await connectiondb.query(`UPDATE Blog SET name_article = '${nameArticle}', date_article = '${dateArticle}', author = '${author}', image = '${image}', short_description = '${shortDescription}', text = '${text}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.delete('/deleteBlog/:idArticle', async function(req, res, next) {
    var idArticle = req.params.idArticle;
    await connectiondb.query(`DELETE FROM Blog where id_article = '${idArticle}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});
module.exports = router;