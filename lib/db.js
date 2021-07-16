const fs = require('fs');
const data = fs.readFileSync(__dirname+'/database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

var db = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    database : conf.database,
    port : conf.port
  });
db.connect();

module.exports = db;