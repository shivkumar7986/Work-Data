var mysql = require('mysql2');

var con =  mysql.createConnection({
    host :  'localhost',
    user : 'root',
    password : 'root',
    database : 'icici'
})

con.connect(function(err){
    if(err) throw err;

    console.log('connected to the mysql server');

    var sql = `SELECT * FROM bank`
    con.query(sql , function(err , result){
        if(err) throw err;
        console.log(result)
    })
})