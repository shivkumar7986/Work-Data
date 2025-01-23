const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const { read } = require('fs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
})

con.connect((err) => {
    if (err) throw err;
    console.log('connected succesfully');
})


// FOR SHOWING ALL PRODUCTS
app.get('/shop', (req, res) => {
    var category = [];
    var subcategory = [];
    var products = [];
    con.query('select * from category',  (err, result) => {
        if (err) throw err;
        category =  result;
        console.log(category);

        con.query('select * from subcategory', (err, result) => {
            if (err) throw err;
            subcategory = result;
            console.log(subcategory);

            con.query('select * from product', (err, result) => {
                if (err) throw err;
                products = result;
                console.log(product);

                var cat = [];
                for (let i in category) {
                    //  console.log(cat[i]);
                    var scategory = [];
                    for (let j in subcategory) {
                        console.log(subcategory[j]);

                        if (category[i].ct_id == subcategory[j].ct_id) {
                            var product = [];
                            for (let k in products) {
                                if (subcategory[j].s_id == products[k].s_id) {
                                    product.push({ "name": products[k].p_name, "price": products[k].p_price })
                                }
                            }

                            scategory.push({ "subcategory": subcategory[j].s_name, "product": product })
                        }
                    }
                    cat.push({ "category": category[i].ct_name, "subcategoris": scategory })
                }
                // console.log(cat);

                res.send(cat)
            })
        })
    })


});


// FOR SHOWING ALL CATEGORIES
app.get('/category', (req, res) => {

    var sql = `select  * from category`;
    let allCategories = con.query(sql, (err, dt) => {
        if (err) throw err;
        var allCat = [];
        for (let i in dt) {
            allCat.push({ "category": dt[i].ct_name })
        }
        console.log(allCat);
        res.send(allCat)
    })
})

app.get('/product', (req, res) => {

    var sql = `select  * from product`;
    let allCategories = con.query(sql, (err, dt) => {
        if (err) throw err;
        var allPro = [];
        for (let i in dt) {
            allPro.push({ "product_id": dt[i].p_id , "product_name": dt[i].p_name , "product_price":dt[i].p_price}  )
        }
        console.log(allPro);
        res.send(allPro)
    })
})

app.get('/delete/:id', (req,res)=>{
    let pid = req.params.id;
    var sql = `delete from product where p_id = ${pid}`;

    const deletedProduct = con.query(sql, (err, dt)=>{
        if(err) throw err;
        console.log(dt);
        res.redirect('/product')
    })
})

app.get('/limitedproduct', (req,res)=>{
    let limit = parseInt(req.query.limit) || 10 ;
    console.log(limit);
     const sql = `select * from product limit ?`
     
     const allproduct = con.query(sql,[limit] ,(err,dt)=>{
        if(err) throw err;
        res.send(dt);
     })
     
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})