var express = require('express');
const app = express();
var path = require('path')
var bodyparser = require('body-parser')
var mysql = require('mysql2');
app.set('view engine' , 'hbs');
app.set('views',path.join(__dirname ,'view' ));

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

var con= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    database : 'bank'
})

app.get("/" , (req,res)=>{
        res.render('home')
})

app.get("/allusers", (req,res)=>{
    con.connect(function(err){
        if(err) throw err;
        console.log("Connected succesfully!");

        var sql = `select * from account`;

        con.query(sql , function(err,result){
            if(err) throw err;
            console.log(result)
           
            res.render('allusers', {'result' : result})
        })
    })
})

app.post("/createuser" , (req,res)=>{
    let accno = req.body.accno;
    let customer = req.body.name;
    let balance = req.body.balance;

    con.connect(function(err){
        if(err) throw err;
        console.log("Connected succesfully!");

        var sql = `insert into account values(${accno} , '${customer}' , ${balance})`;

        con.query(sql , function(err){
            if(err) throw err;
           
        })
    })

    res.redirect("/allusers")
})


app.post("/deposit" , (req,res)=>{
    let accno = req.body.acn;
    let amount = req.body.amt;

    con.connect(function(err){
        if(err) throw err;
        console.log("connected");

        var sql = `update account set balance = balance + ${amount} where accno = ${accno}`;

        con.query(sql , function(err){
            if(err) throw err;
            console.log("deposite succesfull");
            // console.log(result);
        })

        var sql2 = `select * from account where accno = ${accno}`
        con.query(sql2, function(err, result){
            if(err) throw err
            console.log(result);
            res.render("deposite", { account: result[0] });
        })
    })

    
})

app.post("/withdrawl" , (req,res)=>{
    let accno = req.body.acn2;
    let amount = req.body.amt2;

    con.connect(function(err){
        if(err) throw err;
        console.log("connected");

        var sql = `update account set balance = balance - ${amount} where accno = ${accno}`;

        con.query(sql , function(err){
            if(err) throw err;
            console.log("withdrawl succesfull");
            // console.log(result);
        })

        var sql2 = `select * from account where accno = ${accno}`
        con.query(sql2, function(err, result){
            if(err) throw err
            console.log(result);
            res.render("deposite", { account: result[0] });
        })
    })
})


app.listen(3000);

