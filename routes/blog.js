var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllBlogs/:iteration', async function(req, res, next) {
    let blogs = {};
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT id_article, name_article, date_article, author, image, short_description, text FROM Blog LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        blogs = rows;
        res.send(blogs);
    })
});

router.get('/getBlogArticlesNumber', async function(req, res, next) {
    let getBlogArticlesNumber = {};
    await connectiondb.query(`SELECT count(*) as blog_articles_number FROM Blog;`, (err, rows, fields) => {
        if (err) throw err
        getBlogArticlesNumber = rows;
        res.send(getBlogArticlesNumber);
    })
});

router.get('/getAllBlogArticles/:iteration', async function(req, res, next) {
    let blogArticles = [];
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT id_article, name_article, date_article, author, image, short_description, text FROM Blog ORDER BY date_article desc LIMIT 5 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        blogArticles = rows;
        res.send(blogArticles);
    })
});
router.get('/getBlogArticleById/:idBlogArticle', async function(req, res, next) {
    let blogArticle = {};
    let idBlogArticle = req.params.idBlogArticle;
    await connectiondb.query(`SELECT id_article, name_article, date_article, author, image, short_description, text FROM Blog WHERE id_article = ${idBlogArticle};`, (err, rows, fields) => {
        if (err) throw err
        blogArticle = rows;
        res.send(blogArticle[0]);
    })
});
router.get('/getBlogsByDate', async function(req, res, next) {
    let blogs = {};
    await connectiondb.query(`SELECT id_article, image, name_article, short_description, date_article FROM Blog ORDER BY date_article DESC LIMIT 3;`, (err, rows, fields) => {
        if (err) throw err
        blogs = rows;
        res.send(blogs);
    })
})

router.get('/getBlogsNumber/', async function(req, res, next) {
    let blogsNumber = {};
    await connectiondb.query(`SELECT count( * ) as blogs_number FROM Blog;`, (err, rows, fields) => {
        if (err) throw err
        blogsNumber = rows;
        res.send(blogsNumber);
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
    var idArticle = req.body.idArticle;
    var nameArticle = req.body.nameArticle;
    var dateArticle = req.body.dateArticle;
    var author = req.body.author;
    var image = req.body.image;
    var shortDescription = req.body.shortDescription;
    var text = req.body.text;

    await connectiondb.query(`UPDATE Blog SET name_article = '${nameArticle}', date_article = '${dateArticle}', author = '${author}', image = '${image}', short_description = '${shortDescription}', text = '${text}' where id_article = '${idArticle}')`, (err, rows, fields) => {
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