var express = require('express');
var router = express.Router();
var { connectiondb } = require('../config-db');
const bcrypt = require('bcrypt')
const saltRounds = 13

router.post('/register', async function(req, res, next) {
  try {
    bcrypt.hash(req.body.password, saltRounds)
    .then( async hash => {
      req.body.password = hash;
      var email = req.body.email;
      var password = req.body.password;
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      
      await connectiondb.query(`INSERT INTO Users(first_name, last_name, email, password, role) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', 'standard')`, (err, rows, fields) => {
        if (err) throw err
        console.log(rows)
      })
    })
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
