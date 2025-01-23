var mysql = require('mysql2')

var con = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'root',
    database : 'home'
})



//CREATING TABLE ------->

// con.connect((err)=>{
//     if(err) throw err;
//     console.log("connection created succesfully!");

//     var sql = `create table students(id int(30) , name varchar(30) , marks int(30)`

//     con.query(sql , function(err){
//         if(err) throw err;
//         console.log("  table created succesfully!")
//     })
// })

//INSERTING CONTENT IN  TABLE ------->

// con.connect((err)=>{
//     if(err) throw err;
//     console.log("connection created succesfully!");

//     var sql = `insert into students values(1 , 'sahil' , 250),
//                                           (2 , 'nitin' , 200),
//                                           (3 , 'shiv' , 300),
//                                           (4 , 'nishant' , 280)`

//     con.query(sql , function(err){
//         if(err) throw err;
//         console.log("  data inserted succesfully!")
//     })
// })