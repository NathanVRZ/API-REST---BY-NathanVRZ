const mysql = require('mysql');

var pool = mysql.createPool({
    "user" : "",
    "password" : "",
    "database" : "",
    "host" : "",
    "port": ,

    "JWT_KEY": ""
});

exports.pool = pool;
