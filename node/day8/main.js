const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql2');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));



var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'clients'
});

con.connect(function(err){
    if(err) throw err;
    console.log("connected succesfully!!!!")
});

app.get("/" , (req,res)=>{
    
    var sql = `select * from cdt`;
    con.query(sql , (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.render('home' , {"a":result})
    })
})

app.get('/adddata', (req,res)=>{
    res.render('adddata')

})

app.post("/addingdata" , (req,res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let designation = req.body.desig;

    var sql = `INSERT INTO cdt VALUES (${id}, '${name}', '${address}','${phone}','${designation}')`;

    con.query(sql, (err , result)=>{
        if(err) throw err;
        console.log('data inserted succesfully!!!!!!');
        console.log(sql);
        res.redirect("/adddata")
    })
})

app.get("/deletedata/:id", (req,res)=>{
    let pid = req.params.id;
    var sql = `DELETE FROM cdt WHERE id = ${pid}`;
    con.query(sql, (err)=>{
        if(err) throw err;
        console.log("data deleted succesfully!!!")
        res.redirect("/")
    })
})

app.get("/editdata/:id" , (req,res)=>{
    let pid = req.params.id;
    var sql = `select * from cdt where id = ${pid} `
    con.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.render('editdata', {"a":result})
    })
})

app.post("/updatedata" , (req , res)=>{
    let name = req.body.t1;
    let address = req.body.t2;
    let phone = req.body.t3;
    let desig = req.body.t4;
    let id = req.body.myid;

    let sql = `UPDATE cdt SET name = '${name}', address = '${address}', phone_no = '${phone}' , designation = '${desig}' WHERE id = ${id}`;

    con.query(sql, (err)=>{
        if(err) throw err;
        res.redirect("/")
    })
})

app.listen(3000)