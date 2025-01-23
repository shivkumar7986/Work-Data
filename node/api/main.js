 const bodyParser = require('body-parser');
const express = require('express');
 const app = express()
 const mysql = require('mysql2') 
const bodypaser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const con=  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'store'
 })

 con.connect(()=>{
    console.log('connected to databse');
 })

 const PORT = 4000

 app.get('/' , (req,res)=>{
    let sql = `select * from products`

    con.query(sql , (err, dt)=>{
        if(err) throw err;
        res.send(dt)
    })
    
 })

 app.post('/' , (req,res)=>{
    
    let sql = 'insert into products values()';
    con.query(sql, (err ,dt)=>{
        if(err) throw err;
        res.send(dt)
    })
 })

 app.listen(PORT , ()=>{
    console.log(`app is running a t post ${PORT}`);
 })