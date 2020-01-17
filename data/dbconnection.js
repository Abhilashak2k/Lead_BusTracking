const mysql = require('mysql');

exports.poolDB = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "root",
    password: "",
    database: "bustracking"
});

exports.mysql = mysql;

