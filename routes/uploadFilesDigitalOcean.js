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
        bucket: 'myBucket',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        key: function (req, file, cb) {
            cb(null, "home.png");
        }
    })
})
router.post('/addImage', upload2.single(), async function(req, res, next) {
    console.log("hello",  req.body)
//     s3.upload(params, options, function(err, data) {
//         if (!err) {
//             console.log(data); // successful response
//         } else {
//             console.log(err); // an error occurred
//         }
//     });
    fs.readFile(req.body, (err, data) => {
       if (err) throw err;
       const params = {
           Bucket: 'myBucket', // pass your bucket name
           Key: 'test', // file will be saved as testBucket/contacts.csv
           Body: JSON.stringify(data, null, 2)
       };
       s3.upload(params, function(s3Err, data) {
           if (s3Err) throw s3Err
           console.log(`File uploaded successfully at ${data.Location}`)
       });
    });
    res.send(req.body.file);
});


// var AWS = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');
// var express = require('express');
// var router = express.Router();
// var accessKeyId = 'DO00YJP33MWMPX422XBC';
// var secretAccessKey = 'sXe1ESW1vbSUIDulSL5vnrWS5SpCiuBu/mCdsvfBubc';
// var region = 'fra1';
// const cors = require('cors')
// const app = express();

// var spacesEndpoint = new AWS.Endpoint('https://organizez-images.fra1.digitaloceanspaces.com');
// var s3 = new AWS.S3({
//     endpoint: spacesEndpoint,
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey
// });

// var bucketName = 'myBucket';
// s3.createBucket({ Bucket: bucketName }, function(err, data) {
//     if (!err) {
//         console.log(data); // successfull response
//         data: {
//             Location: "https://organizez-images.fra1.digitaloceanspaces.com"
//         }
//     } else {
//         console.log(err) // an error occurred
//     }
// });

// var options = {
//     partSize: 10 * 1024 * 1024, // 10 MB
//     queueSize: 10
// };

// router.post('/addImage', async function(req, res, next) {
//     console.log(req.body.id)
//     console.log(req.body.file.$path)
//     var params = {
//         Bucket: bucketName,
//         Key: path.basename(""+req.body.id),
//         Body: fs.createReadStream(req.body.file.$path)
//     };
//     s3.upload(params, options, function(err, data) {
//         if (!err) {
//             console.log(data); // successful response
//         } else {
//             console.log(err); // an error occurred
//         }
//     });

// });
module.exports = router;