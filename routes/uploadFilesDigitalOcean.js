var express = require('express');
var router = express.Router();
const { S3Client } = require('@aws-sdk/client-s3')
var AWS = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')
const fs = require('fs');
const path = require('path');
var s3 = new AWS.S3({
    region: "fra1",
    forcePathStyle: false,
    endpoint: new AWS.Endpoint('https://organizez-images.fra1.digitaloceanspaces.com'),
    ACL: "public-read",
    credentials: {
      accessKeyId: 'DO00YJP33MWMPX422XBC',
      secretAccessKey: 'sXe1ESW1vbSUIDulSL5vnrWS5SpCiuBu/mCdsvfBubc'
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'organizez-images',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
  })

const upload2 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'blog',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        key: function (req, file, cb) {
            cb(null, "testImage.jpg");
        }
    })
})
router.post('/addImage', upload.single(''), async function(req, res, next) {
    console.log("hello",  req.body)
    res.send(req.body.file);
});
module.exports = router;