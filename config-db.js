const mysql = require('mysql')

const config = {
  host: 'db-mysql-fra1-28661-do-user-13453579-0.b.db.ondigitalocean.com',
  port: 25060,
  user: 'doadmin',
  password: 'AVNS_MvmVacPj0PWNbgrP1yD',
  database: 'organizezdb'
}

const connectiondb = mysql.createConnection(config);
connectiondb.connect(function(err) {
  if (err) throw err;
});

module.exports = { mysql, connectiondb } ;