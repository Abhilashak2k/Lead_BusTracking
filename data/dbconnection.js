const mysql = require('mysql');

poolDB = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "root",
    password: "",
    database: "bustracking"
});

exports.poolDB = poolDB;

if(poolDB){
  console.log("DB connected!!");
}
