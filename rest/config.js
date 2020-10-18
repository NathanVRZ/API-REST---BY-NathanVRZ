const mysql = require('mysql');

var pool = mysql.createPool({
    "user" : "Balas",
    "password" : "wellbalas123",
    "database" : "wellbalas",
    "host" : "localhost",
    "port": 3306

});

exports.pool = pool;