var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');

router.get('/getAllImages/:iteration', async function(req, res, next) {
    let portofolio = [];
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT * FROM Portofolio LIMIT 12 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        portofolio = rows;
        res.send(portofolio);
    })
});

router.get('/getAllImages/:iteration', async function(req, res, next) {
    let portofolio = [];
    let iteration = req.params.iteration;
    await connectiondb.query(`SELECT id_image, image FROM Portofolio LIMIT 15 OFFSET ${iteration};`, (err, rows, fields) => {
        if (err) throw err
        portofolio = rows;
        res.send(portofolio);
    })
});

router.get('/getImagesNumber/', async function(req, res, next) {
    let imagesNumber = {};
    await connectiondb.query(`SELECT count( * ) as images_number FROM Portofolio;`, (err, rows, fields) => {
        if (err) throw err
        imagesNumber = rows;
        res.send(imagesNumber);
    })
});
router.post('/addImage', async function(req, res, next) {
    var image = req.body.image;

    await connectiondb.query(`INSERT INTO Portofolio(image) VALUES('${image}')`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.put('/updateImage', async function(req, res, next) {
    var idImage = req.body.idImage;
    var image = req.body.image;

    await connectiondb.query(`UPDATE Portofolio SET image = '${image}' where id_image = '${idImage}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

router.delete('/deleteImage/:idImage', async function(req, res, next) {
    var idImage = req.params.idImage;
    await connectiondb.query(`DELETE FROM Portofolio where id_image = '${idImage}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send("succes");
    })
});

module.exports = router;