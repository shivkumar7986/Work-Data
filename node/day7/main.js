var express = require('express');
const app = express() ; 
const path = require('path');
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const { ifError } = require('assert');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.set('view engine' , 'hbs');
app.set('views' , path.join(__dirname , 'view'));

var con =  mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'root',
    database : 'store'
})

con.connect(function(err){
    if(err) throw err;
    console.log("conection succesfull!")
})


app.get("/" , (req,res)=>{

    let sql = 'select * from products'
    con.query(sql, function(err, result){
        if(err) throw err;
        console.log(result)
        res.render('storedata' , {"result" :result})
    })
    
    
});

app.get("/addproduct", (req,res)=>{
   
    res.render('store')

})

app.post("/storingproducts" , (req,res)=>{
    let pid = req.body.pid;
    let product = req.body.prod;
    let price = req.body.rs;
    let time = req.body.tm
    
    var sql = `INSERT INTO products  VALUES ('${pid}', '${product}', '${price}', '${time}')` ; 

    con.query(sql, function(err ){
        if(err) throw err;

        console.log("product added succesfull!")
        res.redirect('/addproduct')
    })
})

app.get("/deleteproduct/:id" , function(req,res){
    let pid = req.params.id;
    let sql3 = `delete from products where id = ${pid}`;
     console.log(sql3)
     con.query(sql3, function(err ){
        if(err) throw err;

        console.log("product del succesfull!")
        res.redirect('/')
    })
})

app.get("/editproducts/:id" , function(req,res){
    let pid = req.params.id;
    let sql3 = `select * from products where id = ${pid}`;
     
     con.query(sql3, function(err,result ){
        if(err) throw err;
        console.log(result)
       
        res.render('editproducts', {"result":result})
    })
    
})
app.post("/updateproducts", function(req, res) {
    let product = req.body.t1;
    let price = req.body.t2;
    let date = req.body.t3;
    let id = req.body.myid;

    let sql = `UPDATE products SET products = '${product}', price = ${price}, date = '${date}' WHERE id = ${id}`;

    console.log(sql);
    
    // Execute the SQL query
    con.query(sql, function(err) {
        if (err) throw err;
        console.log('Product updated successfully!');
        res.redirect('/');
    });
});



app.listen(4000)
