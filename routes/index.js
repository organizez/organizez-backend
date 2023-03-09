var express = require('express');
var router = express.Router();
const sendContactFormEmail = require('../emailsTemplates/contactFormEmail');


router.post('/contact-form-email', async function(req, res, next) {
  var email = req.body.email;
  var details = req.body.details;
  sendContactFormEmail.contactFormEmail(email, details);
  res.send("succes");
});


module.exports = router;
