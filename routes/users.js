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
      
      await connectiondb.query(`SELECT * FROM Users WHERE email = '${email}'`, async (err, rows, fields) => {
        if (err) throw err
        if(rows.length === 0) {
          await connectiondb.query(`INSERT INTO Users(first_name, last_name, email, password, role) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', 'standard')`, (err, rows, fields) => {
            if (err) throw err
            let idUser = "" + rows.insertId;
            res.send(idUser);
          })
        } else {
          res.send("duplicate");
        }
      })
    })
  } catch (error) {
    console.log(error);
  }
});

// router.post('/register', async function(req, res, next) {
//   try {
//     bcrypt.hash(req.body.password, saltRounds)
//     .then( async hash => {
//       req.body.password = hash;
//       var email = req.body.email;
//       var password = req.body.password;
//       var firstName = req.body.firstName;
//       var lastName = req.body.lastName;
      
//       await connectiondb.query(`INSERT INTO Users(first_name, last_name, email, password, role) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', 'standard')`, (err, rows, fields) => {
//         if (err) throw err
//         console.log(rows)
//       })
//     })
//   } catch (error) {
//     console.log(error);
//   }
// });


router.post('/login', async function(req, res, next) {
  let response = {};
  try {
    var email = req.body.email;
    var password = req.body.password;
    await connectiondb.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, rows, fields) => {
      if (err) throw err
      if(rows.length == 0) {
        response.status = "unfound";
        res.send(response);
      } else {
        console.log(password)
        bcrypt.compare(password, rows[0].password)
        .then(comparationResult => {
          console.log(comparationResult)
          if(comparationResult) {
            response.status = "success";
            response.idUser = rows[0].id_user;
            res.send(response);
          } else {
            response.status = "mismatch";
            res.send(response);
          }
         })
      }
    })
  } catch (error) {
    console.log(error);
  }
});

router.get('/getUser/:idUser', async function(req, res, next) {
    let user = {};
    var idUser = req.params.idUser;
    await connectiondb.query(`SELECT first_name FROM Users WHERE id_user = '${idUser}'`, (err, rows, fields) => {
      if (err) throw err
      user = rows;
      res.send(user);
    })
});

router.get('/getAllUsers/:iteration', async function(req, res, next) {
  let users = [];
  let iteration = req.params.iteration;
  await connectiondb.query(`SELECT id_user, first_name, last_name, email, role FROM Users LIMIT 15 OFFSET ${iteration}`, (err, rows, fields) => {
    if (err) throw err
    console.log(rows)
    users = rows;
    res.send(users);
  })
});

router.get('/getUsersNumber', async function(req, res, next) {
  let usersNumber = {};
  await connectiondb.query(`SELECT count(*) as users_number FROM Users;`, (err, rows, fields) => {
    if (err) throw err
    console.log(rows)
    usersNumber = rows;
    res.send(usersNumber);
  })
});

module.exports = router;
